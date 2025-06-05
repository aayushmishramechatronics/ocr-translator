"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, X } from "lucide-react"

interface DragDropZoneProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  className?: string
}

export function DragDropZone({ onFileSelect, selectedFile, className = "" }: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find((file) => file.type.startsWith("image/"))

      if (imageFile) {
        onFileSelect(imageFile)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const clearFile = useCallback(() => {
    onFileSelect(null as any)
  }, [onFileSelect])

  return (
    <div
      className={`drag-zone rounded-lg p-6 text-center transition-all duration-300 ${
        isDragOver ? "drag-over" : ""
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
              alt="Selected"
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 p-1 rounded-full glass-button text-white hover:bg-red-500/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-white/80">{selectedFile.name}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Upload className="w-12 h-12 mx-auto text-white/60" />
          <div>
            <p className="text-lg font-medium text-white mb-2">Drop your image here</p>
            <p className="text-sm text-white/70 mb-4">or click to browse</p>
            <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-input" />
            <label
              htmlFor="file-input"
              className="inline-block px-4 py-2 glass-button rounded-lg cursor-pointer text-white font-medium"
            >
              Choose File
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
