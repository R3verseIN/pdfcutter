import { useState } from 'react';
import './index.css';
import { BrowserOpenURL } from '../wailsjs/runtime/runtime';
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
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); BrowserOpenURL("https://github.com/r3versein"); }}
                    style={{ position: 'absolute', top: '32px', right: '40px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 500 }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    title="View on GitHub"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.49C9.339 21.582 9.52 21.272 9.52 21.006C9.52 20.768 9.511 20.147 9.506 19.324C6.726 19.928 6.14 17.984 6.14 17.984C5.685 16.829 5.029 16.521 5.029 16.521C4.122 15.901 5.097 15.913 5.097 15.913C6.1 15.984 6.627 16.942 6.627 16.942C7.517 18.467 8.959 18.026 9.538 17.771C9.629 17.112 9.896 16.671 10.191 16.423C7.973 16.171 5.64 15.314 5.64 11.472C5.64 10.377 6.031 9.482 6.68 8.784C6.576 8.531 6.233 7.509 6.78 6.115C6.78 6.115 7.629 5.843 9.497 7.108C10.304 6.883 11.161 6.771 12.01 6.767C12.859 6.771 13.716 6.883 14.524 7.108C16.391 5.843 17.239 6.115 17.239 6.115C17.787 7.509 17.444 8.531 17.34 8.784C17.99 9.482 18.379 10.377 18.379 11.472C18.379 15.326 16.042 16.167 13.818 16.413C14.187 16.732 14.516 17.365 14.516 18.341C14.516 19.742 14.503 20.871 14.503 21.006C14.503 21.275 14.682 21.587 15.188 21.488C19.16 20.163 22 16.417 22 12C22 6.477 17.523 2 12 2Z"/>
                    </svg>
                    <span>@r3versein</span>
                </a>
                <div className="glass-panel" style={{ padding: '40px', minHeight: '100%', borderRadius: '24px' }}>
                    {activeTool === 'split' && <SplitTool />}
                    {activeTool === 'merge' && <MergeTool />}
                </div>
            </main>
        </div>
    )
}

export default App
