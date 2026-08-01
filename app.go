package main

import (
	"context"
	"strings"

	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SelectPDFs(multiple bool) []string {
	if multiple {
		files, _ := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{
			Title: "Select PDFs",
			Filters: []runtime.FileFilter{
				{DisplayName: "PDF Files", Pattern: "*.pdf"},
			},
		})
		return files
	} else {
		file, _ := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
			Title: "Select PDF",
			Filters: []runtime.FileFilter{
				{DisplayName: "PDF Files", Pattern: "*.pdf"},
			},
		})
		if file == "" {
			return []string{}
		}
		return []string{file}
	}
}

func (a *App) SelectDirectory() string {
	dir, _ := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Output Directory",
	})
	return dir
}

func (a *App) SelectOutputFile() string {
	file, _ := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Save Output PDF",
		DefaultFilename: "output.pdf",
		Filters: []runtime.FileFilter{
			{DisplayName: "PDF Files", Pattern: "*.pdf"},
		},
	})
	return file
}

func (a *App) SplitPDF(inFile string, outDir string) string {
	err := api.SplitFile(inFile, outDir, 1, nil)
	if err != nil {
		return err.Error()
	}
	return ""
}

func (a *App) TrimPDF(inFile string, pages string, outFile string) string {
	var selectedPages []string
	var err error
	
	if strings.TrimSpace(pages) != "" {
		selectedPages, err = api.ParsePageSelection(pages)
		if err != nil {
			return "Invalid page selection: " + err.Error()
		}
	}
	
	err = api.TrimFile(inFile, outFile, selectedPages, nil)
	if err != nil {
		return err.Error()
	}
	return ""
}

func (a *App) MergePDFs(inFiles []string, outFile string) string {
	err := api.MergeCreateFile(inFiles, outFile, false, nil)
	if err != nil {
		return err.Error()
	}
	return ""
}
