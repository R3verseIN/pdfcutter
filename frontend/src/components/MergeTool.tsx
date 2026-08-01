import { useState } from 'react';
import { SelectPDFs, SelectOutputFile, MergePDFs } from '../../wailsjs/go/main/App';

export default function MergeTool() {
    const [files, setFiles] = useState<string[]>([]);
    const [outFile, setOutFile] = useState<string>('');
    const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectFiles = async () => {
        const selected = await SelectPDFs(true);
        if (selected && selected.length > 0) {
            setFiles(prev => [...prev, ...selected]);
            setMessage(null);
        }
    };

    const handleSelectOut = async () => {
        const file = await SelectOutputFile();
        if (file) {
            setOutFile(file);
            setMessage(null);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setMessage({ type: 'error', text: 'Please select at least two PDF files to merge.' });
            return;
        }
        if (!outFile) {
            setMessage({ type: 'error', text: 'Please select an output file destination.' });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            const err = await MergePDFs(files, outFile);
            if (err) {
                setMessage({ type: 'error', text: err });
            } else {
                setMessage({ type: 'success', text: 'PDFs successfully merged!' });
                setFiles([]);
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
            <h2 className="tool-title">Merge PDFs</h2>
            <p className="tool-description">Combine multiple PDFs into a single unified document.</p>
            
            <div className="file-drop-area" onClick={handleSelectFiles}>
                <div className="file-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 7H16M8 11H16M8 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="file-text">Select PDF Files</div>
                <div className="file-subtext">Click to browse and add files</div>
            </div>

            {files.length > 0 && (
                <div className="selected-files">
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Files to Merge (in order):</label>
                    {files.map((file, i) => (
                        <div key={i} className="file-item">
                            <span className="file-item-name">{file}</span>
                            <button className="button secondary" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => handleRemoveFile(i)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="form-group" style={{ marginTop: '24px' }}>
                <label>Save Merged File As</label>
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
                <button className="button" onClick={handleMerge} disabled={loading || files.length < 2 || !outFile}>
                    {loading ? 'Merging...' : 'Merge PDFs'}
                </button>
            </div>
        </div>
    );
}
