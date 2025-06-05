"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileImage, Languages, Loader2, Crop, Sparkles } from "lucide-react"
import { extractTextFromImage, translateText } from "./actions"
import { DragDropZone } from "@/components/drag-drop-zone"
import { ImageCropper } from "@/components/image-cropper"

const languages = [
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "mr", name: "Marathi" },
  { code: "ne", name: "Nepali" },
  { code: "or", name: "Odia" },
  { code: "pa", name: "Punjabi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ur", name: "Urdu" },
  { code: "as", name: "Assamese" },
  { code: "sd", name: "Sindhi" },
  { code: "sa", name: "Sanskrit" },
];

export default function OCRTranslator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetLanguage, setTargetLanguage] = useState<string>("")
  const [extractedText, setExtractedText] = useState<string>("")
  const [translatedText, setTranslatedText] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [showCropper, setShowCropper] = useState(false)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setExtractedText("")
    setTranslatedText("")
  }

  const handleCropComplete = (croppedFile: File) => {
    setSelectedFile(croppedFile)
    setShowCropper(false)
  }

  const handleExtractText = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("image", selectedFile)

      const result = await extractTextFromImage(formData)
      if (result.success) {
        setExtractedText(result.text)
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      alert("Failed to extract text from image")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTranslate = async () => {
    if (!extractedText || !targetLanguage) return

    setIsTranslating(true)
    try {
      const result = await translateText(extractedText, targetLanguage)
      if (result.success) {
        setTranslatedText(result.translatedText)
      } else {
        alert(`Translation error: ${result.error}`)
      }
    } catch (error) {
      alert("Failed to translate text")
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/background.jpeg')",
      }}
    >
      <div className="min-h-screen bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-2xl sm:text-4xl font-bold text-white">OCR Text Translator</h1>
              </div>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
                Extract Text from Images and Translate it into any Language of your Convenience.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Section */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileImage className="w-5 h-5" />
                  Upload & Process Image
                </CardTitle>
                <CardDescription className="text-white/70">
                  Drag and Drop or Select an Image Containing Text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DragDropZone onFileSelect={handleFileSelect} selectedFile={selectedFile} />

                {selectedFile && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowCropper(true)}
                      variant="outline"
                      size="sm"
                      className="glass-button text-white border-white/20"
                    >
                      <Crop className="w-4 h-4 mr-2" />
                      Crop
                    </Button>
                  </div>
                )}

                <div>
                  <Label htmlFor="target-language" className="text-white">
                    Target Language
                  </Label>
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger className="mt-1 glass-input text-white border-white/20">
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/20">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-white/10">
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleExtractText}
                    disabled={!selectedFile || isProcessing}
                    className="flex-1 glass-button text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Extracting...
                      </>
                    ) : (
                      <>
                        <FileImage className="w-4 h-4 mr-2" />
                        Extract Text
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleTranslate}
                    disabled={!extractedText || !targetLanguage || isTranslating}
                    variant="secondary"
                    className="flex-1 glass-button text-white border-white/20"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages className="w-4 h-4 mr-2" />
                        Translate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Results</CardTitle>
                <CardDescription className="text-white/70">
                  Extracted and Translated Text will Appear Here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="extracted-text" className="text-white">
                    Extracted Text
                  </Label>
                  <Textarea
                    id="extracted-text"
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    placeholder="Extracted text will appear here..."
                    className="mt-1 min-h-[120px] glass-input text-white placeholder:text-white/50 border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="translated-text" className="text-white">
                    Translated Text
                    {targetLanguage && (
                      <span className="text-white/70 ml-1">
                        ({languages.find((l) => l.code === targetLanguage)?.name})
                      </span>
                    )}
                  </Label>
                  <Textarea
                    id="translated-text"
                    value={translatedText}
                    readOnly
                    placeholder="Translated text will appear here..."
                    className="mt-1 min-h-[120px] glass-input text-white placeholder:text-white/50 border-white/20"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Setup Instructions */}
          <Card className="mt-6 glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <p>To use this app, you need to set up Google Cloud API access:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Create a Google Cloud Project</li>
                <li>Enable Cloud Vision API v2 for Image Readibility and Translation API v2 for Text Translation.</li>
                <li>Go to APIs & Services → Credentials</li>
                <li>Create an API Key and Restrict it to Vision and Translation APIs</li>
                <li>Set the GOOGLE_CLOUD_API_KEY environment variable in the .env.example as visible in the GitHub Repository</li>
              </ol>
              <p className="mt-2 text-xs">
                <strong>Note:</strong> for production, consider using service account authentication with proper IP
                restrictions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && selectedFile && (
        <ImageCropper
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  )
}
