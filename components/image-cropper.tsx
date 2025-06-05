"use client"

import type React from "react"

import { useCallback, useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Crop, ZoomIn, ZoomOut } from "lucide-react"

interface ImageCropperProps {
  imageFile: File
  onCropComplete: (croppedFile: File) => void
  onCancel: () => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function ImageCropper({ imageFile, onCropComplete, onCancel }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [cropArea, setCropArea] = useState<CropArea>({ x: 50, y: 50, width: 200, height: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImage(img)
      // Set initial crop area to center of image
      const initialSize = Math.min(img.width, img.height) * 0.6
      setCropArea({
        x: (img.width - initialSize) / 2,
        y: (img.height - initialSize) / 2,
        width: initialSize,
        height: initialSize,
      })
    }
    img.src = URL.createObjectURL(imageFile)

    return () => {
      URL.revokeObjectURL(img.src)
    }
  }, [imageFile])

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || !image) return

    // Set canvas size
    const maxWidth = 400
    const maxHeight = 300
    const aspectRatio = image.width / image.height

    let canvasWidth = maxWidth
    let canvasHeight = maxWidth / aspectRatio

    if (canvasHeight > maxHeight) {
      canvasHeight = maxHeight
      canvasWidth = maxHeight * aspectRatio
    }

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw image
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)

    // Draw crop overlay
    const scaleX = canvasWidth / image.width
    const scaleY = canvasHeight / image.height

    const cropX = cropArea.x * scaleX
    const cropY = cropArea.y * scaleY
    const cropWidth = cropArea.width * scaleX
    const cropHeight = cropArea.height * scaleY

    // Draw dark overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Clear crop area
    ctx.clearRect(cropX, cropY, cropWidth, cropHeight)

    // Draw crop border
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight)

    // Draw corner handles
    const handleSize = 8
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(cropX - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize)
    ctx.fillRect(cropX + cropWidth - handleSize / 2, cropY - handleSize / 2, handleSize, handleSize)
    ctx.fillRect(cropX - handleSize / 2, cropY + cropHeight - handleSize / 2, handleSize, handleSize)
    ctx.fillRect(cropX + cropWidth - handleSize / 2, cropY + cropHeight - handleSize / 2, handleSize, handleSize)
  }, [image, cropArea])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas || !image) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setIsDragging(true)
      setDragStart({ x, y })
    },
    [image],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !image) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const deltaX = x - dragStart.x
      const deltaY = y - dragStart.y

      const scaleX = image.width / canvas.width
      const scaleY = image.height / canvas.height

      setCropArea((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(image.width - prev.width, prev.x + deltaX * scaleX)),
        y: Math.max(0, Math.min(image.height - prev.height, prev.y + deltaY * scaleY)),
      }))

      setDragStart({ x, y })
    },
    [isDragging, dragStart, image],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleCrop = useCallback(async () => {
    if (!image) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = cropArea.width
    canvas.height = cropArea.height

    ctx.drawImage(image, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, cropArea.width, cropArea.height)

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], `cropped_${imageFile.name}`, {
          type: imageFile.type,
        })
        onCropComplete(croppedFile)
      }
    }, imageFile.type)
  }, [image, cropArea, imageFile, onCropComplete])

  const adjustCropSize = useCallback(
    (delta: number) => {
      setCropArea((prev) => {
        const newWidth = Math.max(50, Math.min(image?.width || 0, prev.width + delta))
        const newHeight = Math.max(50, Math.min(image?.height || 0, prev.height + delta))
        return {
          ...prev,
          width: newWidth,
          height: newHeight,
          x: Math.max(0, Math.min((image?.width || 0) - newWidth, prev.x)),
          y: Math.max(0, Math.min((image?.height || 0) - newHeight, prev.y)),
        }
      })
    },
    [image],
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center crop-overlay">
      <div className="glass-card rounded-lg p-6 max-w-lg w-full mx-4">
        <h3 className="text-lg font-semibold text-white mb-4">Crop Image</h3>

        <div className="mb-4">
          <canvas
            ref={canvasRef}
            className="w-full border border-white/20 rounded cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => adjustCropSize(-20)}
            size="sm"
            className="glass-button text-white border-white/20"
            variant="outline"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => adjustCropSize(20)}
            size="sm"
            className="glass-button text-white border-white/20"
            variant="outline"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={onCancel} variant="outline" className="flex-1 glass-button text-white border-white/20">
            Cancel
          </Button>
          <Button onClick={handleCrop} className="flex-1 glass-button text-white">
            <Crop className="w-4 h-4 mr-2" />
            Apply Crop
          </Button>
        </div>
      </div>
    </div>
  )
}
