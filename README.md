# PDF Studio

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/r3versein)

A native desktop application for processing PDF files locally, built using Go and Wails. 

## Features

- **Extract Pages:** Extract specific page ranges (e.g., `1-2`, `4-5`) into separate PDF files.
- **Split PDF:** Split a PDF document into individual single-page files.
- **Merge PDFs:** Combine multiple PDF documents into a single file.
- **Local Processing:** All operations run locally using `pdfcpu` (no cloud processing).
- **Cross-Platform:** Available for Windows, macOS, and Linux.

## Installation

### Binaries
Pre-compiled binaries for Windows, macOS, and Linux are available on the [Releases](../../releases) page.

### Build from Source

Prerequisites:
- [Go 1.21+](https://golang.org/doc/install)
- [Wails CLI](https://wails.io/docs/gettingstarted/installation)

```bash
git clone https://github.com/r3versein/pdfcutter.git
cd pdfcutter
wails build
```

*Linux users: Requires `libwebkit2gtk-4.1-dev` (or `4.0-dev`). Build with `wails build -tags webkit2_41` on newer Ubuntu/Debian releases.*

## Tech Stack
- Backend: Go, [pdfcpu](https://pdfcpu.io/)
- Frontend: React, TypeScript, Vite
- Framework: [Wails v2](https://wails.io/)
