import { useState } from 'react';
import { SelectPDFs, SelectDirectory, SplitPDF, TrimPDF } from '../../wailsjs/go/main/App';

export default function SplitTool() {
    const [file, setFile] = useState<string>('');
    const [mode, setMode] = useState<'split' | 'extract'>('extract');
    const [pages, setPages] = useState<string>('');
    const [outDest, setOutDest] = useState<string>('');
    const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectFile = async () => {
        const files = await SelectPDFs(false);
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
            
            // Auto-set the output directory to the same directory as the input file
            const dir = selectedFile.substring(0, selectedFile.lastIndexOf('/'));
            setOutDest(dir);
            setMessage(null);
        }
    };

    const handleSelectDest = async () => {
        const dest = await SelectDirectory();
        if (dest) {
            setOutDest(dest);
            setMessage(null);
        }
    };

    const handleExecute = async () => {
        if (!file || !outDest) {
            setMessage({ type: 'error', text: 'Please select a PDF file and an output directory.' });
            return;
        }

        if (mode === 'extract' && !pages) {
            setMessage({ type: 'error', text: 'Please specify which pages to extract.' });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            let err = '';
            if (mode === 'split') {
                err = await SplitPDF(file, outDest);
            } else {
                err = await TrimPDF(file, pages, outDest);
            }

            if (err) {
                setMessage({ type: 'error', text: err });
            } else {
                setMessage({ type: 'success', text: mode === 'split' ? 'PDF successfully split into single pages!' : 'Pages successfully extracted!' });
                setFile('');
                setOutDest('');
            }
        } catch (e: any) {
            setMessage({ type: 'error', text: e.toString() });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-container">
            <h2 className="tool-title">Split / Extract PDF</h2>
            <p className="tool-description">Extract specific pages to a new PDF or split the entire document into single pages.</p>
            
            <div className={`file-drop-area ${file ? 'active' : ''}`} onClick={handleSelectFile}>
                <div className="file-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="file-text">{file ? 'File Selected' : 'Select PDF File'}</div>
                <div className="file-subtext">{file || 'Click to browse'}</div>
            </div>

            <div className="form-group">
                <label>Mode</label>
                <select value={mode} onChange={(e) => {
                    setMode(e.target.value as 'split' | 'extract');
                }}>
                    <option value="extract">Extract Specific Pages (e.g. 1-5)</option>
                    <option value="split">Split all pages into separate files</option>
                </select>
            </div>

            {mode === 'extract' && (
                <div className="form-group">
                    <label>Pages to Extract (Use commas to extract multiple separate ranges!)</label>
                    <input 
                        type="text" 
                        value={pages} 
                        onChange={(e) => setPages(e.target.value)} 
                        placeholder="e.g. 1-2, 4-5" 
                    />
                </div>
            )}

            <div className="form-group">
                <label>Output Directory</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input type="text" readOnly value={outDest} placeholder="Auto-generated folder path..." />
                    <button className="button secondary" onClick={handleSelectDest}>Change</button>
                </div>
            </div>

            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div style={{ marginTop: '32px', textAlign: 'right' }}>
                <button className="button" onClick={handleExecute} disabled={loading || !file || !outDest}>
                    {loading ? 'Processing...' : mode === 'split' ? 'Split PDF' : 'Extract Pages'}
                </button>
            </div>
        </div>
    );
}
