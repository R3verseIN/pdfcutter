import { useState } from 'react';
import { SelectPDFs, SelectOutputFile, CropPDF } from '../../wailsjs/go/main/App';

export default function CropTool() {
    const [file, setFile] = useState<string>('');
    const [outFile, setOutFile] = useState<string>('');
    const [pages, setPages] = useState<string>('');
    const [margins, setMargins] = useState<string>('0 0 0 0'); // Top, Right, Bottom, Left? Or just string for pdfcpu
    const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectFile = async () => {
        const files = await SelectPDFs(false);
        if (files && files.length > 0) {
            setFile(files[0]);
            setMessage(null);
        }
    };

    const handleSelectOut = async () => {
        const out = await SelectOutputFile();
        if (out) {
            setOutFile(out);
            setMessage(null);
        }
    };

    const handleCrop = async () => {
        if (!file || !outFile) {
            setMessage({ type: 'error', text: 'Please select an input and output file.' });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            // margins string format for pdfcpu is usually like "0.5 0.5" or similar.
            const err = await CropPDF(file, pages, margins, outFile);
            if (err) {
                setMessage({ type: 'error', text: err });
            } else {
                setMessage({ type: 'success', text: 'PDF successfully cropped!' });
                setFile('');
                setOutFile('');
            }
        } catch (e: any) {
            setMessage({ type: 'error', text: e.toString() });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-container">
            <h2 className="tool-title">Crop PDF</h2>
            <p className="tool-description">Trim the margins of your PDF pages.</p>
            
            <div className={`file-drop-area ${file ? 'active' : ''}`} onClick={handleSelectFile}>
                <div className="file-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="file-text">{file ? 'File Selected' : 'Select PDF File'}</div>
                <div className="file-subtext">{file || 'Click to browse'}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                    <label>Pages to Crop (e.g., 1-5, 8, 11-13) - Leave empty for all</label>
                    <input 
                        type="text" 
                        value={pages} 
                        onChange={(e) => setPages(e.target.value)} 
                        placeholder="e.g. 1-3, 5" 
                    />
                </div>
                <div className="form-group">
                    <label>Margins (points, e.g. "10 10 10 10")</label>
                    <input 
                        type="text" 
                        value={margins} 
                        onChange={(e) => setMargins(e.target.value)} 
                        placeholder="Top Right Bottom Left or Single value" 
                    />
                    <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>Format: top right bottom left or just one number for all</small>
                </div>
            </div>

            <div className="form-group" style={{ marginTop: '24px' }}>
                <label>Save Cropped File As</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input type="text" readOnly value={outFile} placeholder="output.pdf..." />
                    <button className="button secondary" onClick={handleSelectOut}>Browse</button>
                </div>
            </div>

            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div style={{ marginTop: '32px', textAlign: 'right' }}>
                <button className="button" onClick={handleCrop} disabled={loading || !file || !outFile}>
                    {loading ? 'Cropping...' : 'Crop PDF'}
                </button>
            </div>
        </div>
    );
}
