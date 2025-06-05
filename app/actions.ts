"use server"

export async function extractTextFromImage(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File
    if (!imageFile) {
      return { success: false, error: "No image file provided" }
    }

    const apiKey = process.env.GOOGLE_CLOUD_API_KEY
    if (!apiKey) {
      return { success: false, error: "Google Cloud API key not configured" }
    }

    // Convert file to base64
    const bytes = await imageFile.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    // Call Google Vision API
    const visionResponse = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 1,
              },
            ],
          },
        ],
      }),
    })

    if (!visionResponse.ok) {
      const errorData = await visionResponse.json()
      return {
        success: false,
        error: `Vision API error: ${errorData.error?.message || "Unknown error"}`,
      }
    }

    const visionData = await visionResponse.json()
    const textAnnotations = visionData.responses?.[0]?.textAnnotations

    if (!textAnnotations || textAnnotations.length === 0) {
      return { success: false, error: "No text found in the image" }
    }

    const extractedText = textAnnotations[0].description || ""

    return { success: true, text: extractedText }
  } catch (error) {
    console.error("OCR Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to extract text from image",
    }
  }
}

export async function translateText(text: string, targetLanguage: string) {
  try {
    if (!text.trim()) {
      return { success: false, error: "No text to translate" }
    }

    const apiKey = process.env.GOOGLE_CLOUD_API_KEY
    if (!apiKey) {
      return { success: false, error: "Google Cloud API key not configured" }
    }

    // Call Google Translate API
    const translateResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: "text",
      }),
    })

    if (!translateResponse.ok) {
      const errorData = await translateResponse.json()
      return {
        success: false,
        error: `Translate API error: ${errorData.error?.message || "Unknown error"}`,
      }
    }

    const translateData = await translateResponse.json()
    const translatedText = translateData.data?.translations?.[0]?.translatedText

    if (!translatedText) {
      return { success: false, error: "Translation failed" }
    }

    return {
      success: true,
      translatedText: translatedText,
    }
  } catch (error) {
    console.error("Translation Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to translate text",
    }
  }
}

export async function detectLanguage(text: string) {
  try {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY
    if (!apiKey) {
      return { success: false, error: "Google Cloud API key not configured" }
    }

    const detectResponse = await fetch(
      `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
        }),
      },
    )

    if (!detectResponse.ok) {
      const errorData = await detectResponse.json()
      return {
        success: false,
        error: `Language detection error: ${errorData.error?.message || "Unknown error"}`,
      }
    }

    const detectData = await detectResponse.json()
    const detection = detectData.data?.detections?.[0]?.[0]

    return {
      success: true,
      language: detection?.language || "unknown",
      confidence: detection?.confidence || 0,
    }
  } catch (error) {
    console.error("Language Detection Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to detect language",
    }
  }
}
