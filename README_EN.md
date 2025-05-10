# Image to CSS | 图片转CSS

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/styled--components-5.x-DB7093?style=flat-square&logo=styled-components" alt="styled-components" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License" />
</div>

<p align="center">A powerful online image processing toolkit that supports image to CSS conversion, image editing and format conversion</p>

English | [简体中文](./README.md)

## 🌟 Features

- **Image to CSS**: Convert images to pure CSS code using box-shadow properties
- **Image to Base64**: Convert images to Base64 encoding for easy embedding in web pages
- **Image Editor**: Provides various filters and preset effects
  - Adjust brightness, contrast, saturation and other parameters
  - Apply multiple filter effects
  - Preset styles: black and white, vintage, cool tone, etc.
- **Format Converter**: Support conversion between multiple image formats
  - Support JPEG, PNG, WEBP, GIF, BMP and other formats
  - Adjustable quality and size
  - Display compression effect and file size comparison

## 📸 Showcase

### Image to CSS
![Image to CSS Example](https://cdn.kingdomofown.cn/images/img-to-css-preview.png)

### Image Editor
![Image Editor Example](https://cdn.kingdomofown.cn/images/img-editor-preview.png)

### Format Converter
![Format Converter Example](https://cdn.kingdomofown.cn/images/format-converter-preview.png)

## 🚀 Quick Start

### Online Demo

Visit [https://tools.kingdomofown.cn/img-to-css](https://tools.kingdomofown.cn/img-to-css) to experience all features immediately.

### Local Installation

1. Clone the repository
```bash
git clone https://github.com/Chujie-cre/img-to-css.git
cd img-to-css
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## 💻 Tech Stack

- **Frontend Framework**: React
- **Routing**: React Router
- **Styling**: styled-components
- **Libraries**:
  - canvas-image-utils - Image processing
  - tinycolor2 - Color processing
  - lodash - Utility functions

## 🔧 Project Structure

```
img-to-css/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── EditorNavButton.jsx - Image tool navigation buttons
│   │   ├── Features.jsx - Feature introduction module
│   │   ├── FormatConverter.jsx - Format conversion component
│   │   └── ImageEditor.jsx - Image editor component
│   ├── app.jsx - Main application component
│   └── index.js - Entry file
└── package.json
```

## 🔍 Detailed Features

### Image to CSS

Convert images to pure CSS code, creating pixel-level image copies through box-shadow properties. Ideal for creating CSS art works that don't rely on image resources.

### Image Editor

Provides various image editing functions, including:

- Basic adjustments: brightness, contrast, saturation and grayscale
- Effects: blur, hue rotation, sepia and invert
- Preset effects: black and white, vintage style, warm tone, cool tone and dramatic effect
- Support for downloading edited images

### Format Converter

Supports conversion between multiple image formats with the following features:

- Format support: JPEG, PNG, WEBP, GIF and BMP
- Advanced options: quality adjustment and size adjustment
- File size comparison: displays file size comparison before and after conversion
- Intuitive compression rate statistics

## 📝 TODO

- [ ] Add more image editing features (crop, rotate, etc.)
- [ ] Support batch processing of multiple images
- [ ] Add more preset effects
- [ ] Support more image formats

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 👏 Acknowledgements

- [Chujie](https://king.kingdomofown.cn) - Project development and design
- All contributors of the open source libraries used

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://kingdomofown.cn">Kingdom of Own</a></sub>
</div> 