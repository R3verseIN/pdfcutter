# PDF Studio

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/r3versein)
**Developed by [@r3versein](https://github.com/r3versein)**

PDF Studio is a lightning-fast, native desktop application built with [Wails](https://wails.io/), Go, and React. It allows you to effortlessly split, extract, and merge PDF files with a beautiful, minimalist, high-contrast user interface.

## 🚀 Features

- **Extract Pages:** Pull specific page ranges (e.g., `1-2`, `4-5`) from a PDF and save them as separate files instantly.
- **Split PDF:** Break an entire PDF document into individual single-page files.
- **Merge PDFs:** Combine multiple PDF documents into a single file with drag-and-drop simplicity.
- **Native Performance:** Powered by `pdfcpu` and Go, offering incredible speed without the bloat of Electron or large web frameworks.
- **Cross-Platform:** Fully compatible with Windows, macOS (Intel & Apple Silicon), and Linux.

---

## 📦 Installation

### Pre-compiled Binaries
You can download the latest pre-compiled binaries for Windows, macOS, and Linux directly from the **[Releases](../../releases)** page.

### Build from Source
If you want to compile and build the application yourself, you will need to install Go and the Wails CLI.

1. Install [Go](https://golang.org/doc/install)
2. Install [Wails](https://wails.io/docs/gettingstarted/installation)
3. Clone the repository and build:

```bash
git clone https://github.com/r3versein/pdfcutter.git
cd pdfcutter
wails build
```

*(Note for Linux users: Ensure you have `libwebkit2gtk-4.1-dev` or `libwebkit2gtk-4.0-dev` installed before building, or use `wails build -tags webkit2_41` if needed).*

---

## 🛠️ Built With
* [Wails v2](https://wails.io/) - Framework for building native apps using Go and Web Technologies.
* [pdfcpu](https://pdfcpu.io/) - A robust PDF processing library written in Go.
* [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/) - Frontend UI.
* GitHub Actions - Automated CI/CD cross-compilation pipeline.
