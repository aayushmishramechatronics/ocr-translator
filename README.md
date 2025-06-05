# OCR Text Translator

A beautiful web application that extracts text from images using Google Vision OCR and translates it to any language using Google Translate API. Features a stunning glassmorphism UI with Van Gogh's Starry Night background.

## Features

- 🖼️ **Image Upload**: Drag & drop or click to upload images
- ✂️ **Image Cropping**: Interactive cropping tool with zoom controls
- 🔍 **OCR Text Extraction**: Powered by Google Vision API
- 🌍 **Multi-language Translation**: Support for 20+ languages
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- ✨ **Glassmorphism UI**: Beautiful glass-like design elements
- 🎨 **Stunning Background**: Van Gogh's Starry Night artwork

## Setup Instructions

### 1. Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd ocr-translator
npm install
\`\`\`

### 2. Google Cloud Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs**
   - Enable **Cloud Vision API**
   - Enable **Cloud Translation API**

3. **Create API Key**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - **Important**: Restrict the API key to only Vision and Translation APIs for security

4. **Set Up Environment Variables**
   \`\`\`bash
   # Copy the template file
   cp .env.local.template .env.local
   
   # Edit .env.local and add your API key
   GOOGLE_CLOUD_API_KEY=your-actual-api-key-here
   \`\`\`

### 3. Run the Application

\`\`\`bash
# Development mode
npm run dev

# Production build
npm run build
npm start
\`\`\`

Visit `http://localhost:3000` to use the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_CLOUD_API_KEY` | Google Cloud API key with Vision and Translation API access | Yes |

## Security Notes

- ⚠️ **Never commit your `.env.local` file** to version control
- 🔒 **Restrict your API key** to only the required APIs and domains
- 🔄 **Rotate your API keys** regularly
- 📊 **Monitor API usage** in Google Cloud Console

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub (without `.env.local`)
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `GOOGLE_CLOUD_API_KEY` with your API key

### Other Platforms

For other hosting platforms, make sure to:
1. Set the `GOOGLE_CLOUD_API_KEY` environment variable
2. Ensure the platform supports Node.js and Next.js

## Usage

1. **Upload Image**: Drag and drop or click to select an image containing text
2. **Crop (Optional)**: Use the crop tool to focus on specific text areas
3. **Select Language**: Choose your target translation language
4. **Extract Text**: Click "Extract Text" to run OCR
5. **Translate**: Click "Translate" to get the translation

## Supported Languages

English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese (Simplified), Arabic, Hindi, Thai, Vietnamese, Dutch, Swedish, Danish, Norwegian, Finnish, Polish

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Make sure your `.env.local` file exists and contains the API key
   - Restart the development server after adding environment variables

2. **"Vision API error" or "Translate API error"**
   - Check that both APIs are enabled in Google Cloud Console
   - Verify your API key has access to both services
   - Check your API quotas and billing

3. **No text extracted from image**
   - Try cropping the image to focus on text areas
   - Ensure the image has clear, readable text
   - Try images with higher contrast

### Getting Help

- Check the browser console for detailed error messages
- Verify your Google Cloud setup and API key restrictions
- Ensure your APIs are enabled and have sufficient quota

## License

MIT License - feel free to use this project for personal or commercial purposes.
