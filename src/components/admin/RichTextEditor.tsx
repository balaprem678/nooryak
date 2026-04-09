'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    Heading1, Heading2, AlignLeft, AlignCenter,
    AlignRight, Eraser, Link as LinkIcon,
    Code, Type, ChevronDown
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    error?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, error }: RichTextEditorProps) {
    const [editMode, setEditMode] = useState<'visual' | 'html'>('visual');
    const [currentFontSize, setCurrentFontSize] = useState<string>('16');
    const [currentFontName, setCurrentFontName] = useState<string>('Arial');
    
    const editorRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const savedSelection = useRef<Range | null>(null);

    // Initial content sync
    useEffect(() => {
        if (editorRef.current && editMode === 'visual') {
            if (editorRef.current.innerHTML !== value) {
                editorRef.current.innerHTML = value || '';
            }
        }
    }, [editMode]);

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (editorRef.current?.contains(range.commonAncestorContainer)) {
                savedSelection.current = range;
            }
        }
    };

    const restoreSelection = () => {
        if (savedSelection.current) {
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(savedSelection.current);
        }
    };

    const handleVisualChange = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, val: string = '') => {
        if (editMode === 'visual') {
            editorRef.current?.focus();
            restoreSelection();
            document.execCommand(command, false, val);
            handleVisualChange();
            saveSelection();
        }
    };

    const applyFontSize = (size: string) => {
        if (editMode === 'visual' && editorRef.current) {
            editorRef.current.focus();
            restoreSelection();
            
            // execCommand fontSize uses 1-7, so we use a span for px
            document.execCommand('styleWithCSS', false, 'true');
            document.execCommand('fontSize', false, '7'); // Temporary marker
            
            const fonts = editorRef.current.querySelectorAll('span[style*="font-size: x-large"]');
            fonts.forEach(font => {
                (font as HTMLElement).style.fontSize = `${size}px`;
            });
            
            handleVisualChange();
            saveSelection();
        }
    };

    return (
        <div className={`rich-text-editor flex flex-col border rounded-xl overflow-hidden bg-[#1a1a1a] ${error ? 'border-red-500' : 'border-[#2a2a2a]'} shadow-sm min-h-[500px]`}>
            {/* Toolbar */}
            <div className="toolbar bg-[#111] border-b border-[#2a2a2a] p-2 flex flex-wrap items-center gap-1">
                {/* Mode Toggle */}
                <button
                    type="button"
                    onClick={() => setEditMode(editMode === 'visual' ? 'html' : 'visual')}
                    className={`p-2 rounded-lg flex items-center gap-1.5 transition-all text-[10px] font-bold ${editMode === 'html' ? 'bg-[#ff7a18] text-white' : 'bg-[#222] text-gray-400 hover:text-white border border-[#333]'}`}
                    title="Toggle HTML/Visual"
                >
                    <Code className="w-3.5 h-3.5" />
                    {editMode === 'html' ? 'CODE' : 'VISUAL'}
                </button>

                <div className="w-px h-6 bg-[#2a2a2a] mx-1" />

                {/* Formatting */}
                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg overflow-hidden">
                    <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="Bold"><Bold className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="Italic"><Italic className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('underline')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="Underline"><Underline className="w-4 h-4" /></button>
                </div>

                {/* Font Selection */}
                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg px-2">
                    <select
                        value={currentFontName}
                        onChange={(e) => {
                            setCurrentFontName(e.target.value);
                            execCommand('fontName', e.target.value);
                        }}
                        className="bg-transparent text-xs text-gray-400 outline-none py-1.5 cursor-pointer max-w-[80px]"
                    >
                        <option value="Arial">Arial</option>
                        <option value="Inter">Inter</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier</option>
                    </select>
                    <div className="w-px h-4 bg-[#333] mx-2" />
                    <div className="flex items-center gap-1">
                        <input
                            type="number"
                            value={currentFontSize}
                            onChange={(e) => {
                                setCurrentFontSize(e.target.value);
                                applyFontSize(e.target.value);
                            }}
                            className="w-10 bg-transparent text-xs text-center text-gray-400 outline-none p-0"
                        />
                        <span className="text-[10px] text-gray-600">px</span>
                    </div>
                </div>

                {/* Color */}
                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg p-1">
                    <input 
                        type="color" 
                        onChange={(e) => execCommand('foreColor', e.target.value)} 
                        className="w-5 h-5 cursor-pointer bg-transparent border-none p-0" 
                        title="Text Color" 
                    />
                </div>

                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg overflow-hidden">
                    <button type="button" onClick={() => {
                        const url = prompt('Enter link URL:');
                        if (url) execCommand('createLink', url);
                    }} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="Link"><LinkIcon className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg overflow-hidden">
                    <button type="button" onClick={() => execCommand('formatBlock', 'h2')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="H2"><Heading1 className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('formatBlock', 'h3')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="H3"><Heading2 className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg overflow-hidden">
                    <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white" title="List"><List className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center bg-[#222] border border-[#333] rounded-lg overflow-hidden">
                    <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white"><AlignLeft className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 hover:bg-[#333] text-gray-400 hover:text-white"><AlignCenter className="w-4 h-4" /></button>
                </div>

                <button type="button" onClick={() => execCommand('removeFormat')} className="p-2 bg-[#222] border border-[#333] rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="Clear Formatting"><Eraser className="w-4 h-4" /></button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative">
                {editMode === 'visual' ? (
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleVisualChange}
                        onMouseUp={saveSelection}
                        onKeyUp={saveSelection}
                        onBlur={saveSelection}
                        className="w-full h-full min-h-[400px] p-6 bg-[#111] text-white outline-none overflow-y-auto prose max-w-none"
                        style={{ fontFamily: currentFontName }}
                    />
                ) : (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full min-h-[400px] p-6 bg-[#050505] text-[#00ff00] font-mono text-sm outline-none resize-none border-none"
                        placeholder="Enter HTML source code..."
                    />
                )}
            </div>

            <div className="bg-[#111] border-t border-[#2a2a2a] px-3 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${editMode === 'visual' ? 'bg-green-500' : 'bg-[#ff7a18]'}`} />
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                        {editMode === 'visual' ? 'Visual / WYSIWYG Editor' : 'HTML Source Editor'}
                    </span>
                </div>
                {value && (
                    <span className="text-[10px] text-gray-600">
                        {value.length} characters
                    </span>
                )}
            </div>
        </div>
    );
}
