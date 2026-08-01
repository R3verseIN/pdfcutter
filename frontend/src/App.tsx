import { useState } from 'react';
import './index.css';
import SplitTool from './components/SplitTool';
import MergeTool from './components/MergeTool';

function App() {
    const [activeTool, setActiveTool] = useState('split');

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    PDF Studio
                </div>
                <button 
                    className={`nav-item ${activeTool === 'split' ? 'active' : ''}`} 
                    onClick={() => setActiveTool('split')}
                >
                    Split PDF
                </button>
                <button 
                    className={`nav-item ${activeTool === 'merge' ? 'active' : ''}`} 
                    onClick={() => setActiveTool('merge')}
                >
                    Merge PDFs
                </button>
            </aside>
            <main className="main-content">
                <div className="glass-panel" style={{ padding: '40px', minHeight: '100%', borderRadius: '24px' }}>
                    {activeTool === 'split' && <SplitTool />}
                    {activeTool === 'merge' && <MergeTool />}
                </div>
            </main>
        </div>
    )
}

export default App
