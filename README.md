<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/aayushmishramechatronics/ocr-translator">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ocr-translator</h3>

  <p align="center">
    This website is an API based Image-to-Text Converter and Translator Website.
    Extract Text from Images and Translate it into any Language of your Convenience. 
    Designed and Developed by Aayush Mishra.
    <br />
    <a href="https://github.com/aayushmishramechatronics/ocr-translator"><strong>Explore the Repository »</strong></a>
    <br />
    <br />
    <a href="https://image-text-extractor-seven.vercel.app/">View Demo</a>
    &middot;
    <a href="https://github.com/aayushmishramechatronics/ocr-translator/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/aayushmishramechatronics/ocr-translator/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

📸 **Text Extraction from Images**
Upload any image from your device's gallery or file system and extract the embedded text using powerful Optical Character Recognition (OCR) technology. 
This is especially useful for scanned documents, printed materials, signs, or handwritten notes.

🌐 **Multilingual Translation Support**
Translate the extracted text into multiple Indian languages such as:

1. Kannada
2. Tamil
3. Marathi
4. Telugu
5. Hindi
and many more!
This feature helps bridge language barriers and ensures content is accessible to diverse users.

✂️ Crop and 🖱️ Drag & Drop Support

1. Crop Tool: Easily select the exact portion of the image from which you want to extract text, reducing noise and improving accuracy.
2. Drag & Drop: A smooth, intuitive drag-and-drop interface allows for quick and hassle-free image uploads—no need to browse through folders.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
## Frontend :- 
* [![Next.js][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![Tailwind CSS][Tailwind]][Tailwind-url]

## Backend :- 
* [![Google Cloud Vision API][VisionAPI]][VisionAPI-url]
* [![Google Cloud Translation API v2][TranslateAPI]][TranslateAPI-url]
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation
## 1. Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd ocr-translator
npm install
\`\`\`

## 2. Google Cloud Setup

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

## 3. Run the Application

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
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This website can be used for:

1. **Upload Image**: Drag and drop or click to select an image containing text
2. **Crop (Optional)**: Use the crop tool to focus on specific text areas
3. **Select Language**: Choose your target translation language
4. **Extract Text**: Click "Extract Text" to run OCR
5. **Translate**: Click "Translate" to get the translation

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Multi-Image Upload Support : Allow users to upload and process multiple images in a single session.
- [ ] Handwritten Text Recognition : Improve OCR to support handwritten notes and cursive writing with higher accuracy.
- [ ] Real-time Camera Capture : Enable direct image capture from webcam/mobile camera for faster text extraction.
- [ ] History & Recent Activity Log : Maintain a local log of previously extracted and translated texts for quick reference.
    - [ ] Download & Copy Options : Add buttons to download extracted/translated text or copy it to clipboard with one click.

see the [open issues](https://github.com/aayushmishramechatronics/ocr-translator/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureBranch`)
3. Commit your Changes (`git commit -m 'Add Changes'`)
4. Push to the Branch (`git push origin feature/PushtoBranch`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Aayush Mishra - [X](https://x.com/AayushMish33852) - aayushmishra1105@gmail.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/aayushmishramechatronics/ocr-translator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Google Cloud Vision API](https://cloud.google.com/vision) - for powerful OCR capabilities
* [Google Cloud Translation API v2](https://cloud.google.com/translate/docs/advanced) - for accurate multilingual text translation
* [Tailwind CSS](https://tailwindcss.com/) - for utility-first modern styling
* [React Icons](https://react-icons.github.io/react-icons/search) - for easily adding icons in React
* [Image Shields](https://shields.io/) - for creating README badges

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/.svg?style=for-the-badge
[forks-url]: https://github.com/aayushmishramechatronics/ocr-translator/network/members
[stars-shield]: https://img.shields.io/github/stars/aayushmishramechatronics/ocr-translator.svg?style=for-the-badge
[stars-url]: https://github.com/aayushmishramechatronics/ocr-translator/stargazers
[issues-shield]: https://img.shields.io/github/issues/aayushmishramechatronics/ocr-translator.svg?style=for-the-badge
[issues-url]: https://github.com/aayushmishramechatronics/ocr-translator/issues
[license-shield]: https://img.shields.io/github/license/aayushmishramechatronics/ocr-translator.svg?style=for-the-badge
[license-url]: https://github.com/aayushmishramechatronics/ocr-translator/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/aayush-anil-mishra/
[product-screenshot]: images/screenshots.png
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[VisionAPI]: https://img.shields.io/badge/Cloud%20Vision%20API-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white
[VisionAPI-url]: https://cloud.google.com/vision
[TranslateAPI]: https://img.shields.io/badge/Translation%20API-v2-34A853?style=for-the-badge&logo=googletranslate&logoColor=white
[TranslateAPI-url]: https://cloud.google.com/translate/docs/advanced
