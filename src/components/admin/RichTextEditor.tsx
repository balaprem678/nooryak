'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { HexColorPicker } from 'react-colorful';
import {
    Bold, Italic, Underline, List, ListOrdered,
    Heading1, Heading2, AlignLeft, AlignCenter,
    AlignRight, Eraser, Link as LinkIcon,
    Code, Type, Palette, MoreHorizontal, MousePointer2
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    error?: string;
}

const PRESET_COLORS = ['#ff7a18', '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'];

export default function RichTextEditor({ value, onChange, placeholder, error }: RichTextEditorProps) {
    const [editMode, setEditMode] = useState<'visual' | 'html'>('visual');
    const [fontSize, setFontSize] = useState<string>('16');
    const [fontSizeInput, setFontSizeInput] = useState<string>('16');
    const [currentColor, setCurrentColor] = useState<string>('#ffffff');
    
    const editorRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const savedSelection = useRef<Range | null>(null);

    // Sync content and selection listeners
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
                savedSelection.current = range.cloneRange();
                updateToolbarState();
            }
        }
    };

    const updateToolbarState = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const node = selection.anchorNode;
        if (!node) return;

        const parentElement = node.nodeType === 1 ? (node as HTMLElement) : node.parentElement;
        if (parentElement && editorRef.current?.contains(parentElement)) {
            const style = window.getComputedStyle(parentElement);
            
            // Sync Color
            const color = style.color;
            if (color) {
                // Convert rgb(r, g, b) to hex
                const rgb = color.match(/\d+/g);
                if (rgb && rgb.length >= 3) {
                    const hex = "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
                    setCurrentColor(hex);
                }
            }

            // Sync Font Size
            const size = style.fontSize;
            if (size.endsWith('px')) {
                const pxValue = Math.round(parseFloat(size)).toString();
                setFontSize(pxValue);
                setFontSizeInput(pxValue);
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
        const numSize = parseInt(size);
        if (isNaN(numSize) || numSize < 8 || numSize > 72) return;

        if (editMode === 'visual' && editorRef.current) {
            editorRef.current.focus();
            restoreSelection();
            
            document.execCommand('styleWithCSS', false, 'true');
            document.execCommand('fontSize', false, '7');
            
            const fonts = editorRef.current.querySelectorAll('span[style*="font-size: xxx-large"], span[style*="font-size: -webkit-xxx-large"]');
            fonts.forEach(font => {
                (font as HTMLElement).style.fontSize = `${numSize}px`;
            });
            
            handleVisualChange();
            saveSelection();
        }
    };

    const handleColorChange = (color: string) => {
        setCurrentColor(color);
        execCommand('foreColor', color);
    };

    return (
        <div className={`rich-text-editor flex flex-col border rounded-3xl overflow-hidden bg-[#050505] ${error ? 'border-red-500' : 'border-[#222]'} shadow-2xl min-h-[600px] transition-all duration-300`}>
            {/* Toolbar - Redesigned to match image */}
            <div className="toolbar bg-[#0a0a0a] border-b border-[#222] p-3 flex flex-wrap items-center gap-3">
                
                {/* Visual/Source Toggle */}
                <button
                    type="button"
                    onClick={() => setEditMode(editMode === 'visual' ? 'html' : 'visual')}
                    className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all text-[11px] font-black border tracking-tighter ${editMode === 'html' ? 'bg-[#ff7a18] text-white border-[#ff7a18] shadow-[0_0_15px_rgba(255,122,24,0.3)]' : 'bg-[#111] text-gray-400 hover:text-white border-[#333]'}`}
                >
                    <Code className="w-4 h-4" />
                    {editMode === 'html' ? 'SOURCE' : 'VISUAL'}
                </button>

                <div className="w-px h-8 bg-[#222] mx-1" />

                {/* Formatting Group */}
                <div className="flex items-center bg-[#111] border border-[#222] rounded-2xl p-1 shadow-sm px-2 gap-1">
                    <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('underline')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="Underline"><Underline className="w-4 h-4" /></button>
                </div>

                {/* Central Font Size Display - Redesigned to match Image 1 */}
                <div className="flex items-center bg-[#111] border border-[#222] rounded-2xl px-4 py-2 gap-3 min-w-[140px] justify-between group focus-within:border-[#ff7a18] transition-all duration-200">
                    <Type className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
                    <input
                        type="text"
                        value={fontSizeInput}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setFontSizeInput(val);
                        }}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                applyFontSize(fontSizeInput);
                                editorRef.current?.focus();
                            }
                        }}
                        onBlur={() => {
                            const num = parseInt(fontSizeInput);
                            if (!isNaN(num)) {
                                const clamped = Math.min(72, Math.max(8, num)).toString();
                                setFontSizeInput(clamped);
                                applyFontSize(clamped);
                            } else {
                                setFontSizeInput(fontSize);
                            }
                        }}
                        className="w-10 bg-transparent text-lg font-black text-white text-center outline-none selection:bg-[#ff7a18]"
                    />
                    <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">PX</span>
                </div>

                {/* Color Swatch Bar - Redesigned to match Image 1 */}
                <div className="flex items-center bg-[#111] border border-[#222] rounded-2xl p-1 shadow-sm px-3 gap-3">
                    {/* Advanced Color Picker Trigger */}
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button type="button" className="p-1 hover:bg-[#222] rounded-full text-gray-600 hover:text-white transition-all">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content 
                                className="z-[9999] bg-[#1a1a1a] border border-[#333] p-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200" 
                                sideOffset={10}
                                onPointerDown={(e) => e.stopPropagation()}
                                onInteractOutside={(e) => e.preventDefault()}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-6 mb-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Color Picker</span>
                                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentColor }} />
                                    </div>
                                    <HexColorPicker color={currentColor} onChange={handleColorChange} />
                                    <div className="text-center font-mono text-[10px] text-gray-500 bg-[#000] p-1.5 rounded-lg border border-[#222]">
                                        {currentColor.toUpperCase()}
                                    </div>
                                </div>
                                <Popover.Arrow className="fill-[#1a1a1a]" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>

                    <div className="w-px h-5 bg-[#222]" />

                    {/* Circular Preset Colors */}
                    <div className="flex gap-2">
                        {PRESET_COLORS.map((col, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleColorChange(col)}
                                className={`w-5 h-5 rounded-full border border-black/30 hover:scale-125 transition-all duration-200 shadow-lg ${currentColor === col ? 'ring-2 ring-offset-2 ring-offset-[#111] ring-[#ff7a18]' : ''}`}
                                style={{ backgroundColor: col }}
                            />
                        ))}
                    </div>
                </div>

                {/* Additional Formatting Group */}
                <div className="flex items-center bg-[#111] border border-[#222] rounded-2xl p-1 shadow-sm px-2 gap-1">
                    <button type="button" onClick={() => {
                        const url = prompt('Enter link URL:');
                        if (url) execCommand('createLink', url);
                    }} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="Link"><LinkIcon className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('formatBlock', 'h2')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="H1"><span className="text-xs font-black">H1</span></button>
                    <button type="button" onClick={() => execCommand('formatBlock', 'h3')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="H2"><span className="text-xs font-black">H2</span></button>
                    <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors" title="List"><List className="w-4 h-4" /></button>
                </div>

                {/* Alignment & Cleanup Group */}
                <div className="flex items-center bg-[#111] border border-[#222] rounded-2xl p-1 shadow-sm px-2 gap-1">
                    <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors"><AlignLeft className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 hover:bg-[#222] text-gray-500 hover:text-white transition-colors"><AlignCenter className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCommand('removeFormat')} className="p-2 hover:bg-[#ff3d001a] text-red-500 hover:text-red-400 transition-colors" title="Clear Formatting"><Eraser className="w-4 h-4" /></button>
                </div>
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
                        className="w-full h-full min-h-[500px] p-8 bg-[#0a0a0a] text-white outline-none overflow-y-auto prose max-w-none scrollbar-thin scrollbar-thumb-[#222]"
                    />
                ) : (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full min-h-[500px] p-8 bg-[#050505] text-[#00ff9d] font-mono text-sm outline-none resize-none border-none selection:bg-[#ff7a182a]"
                        placeholder="Enter HTML source code..."
                    />
                )}
            </div>

            {/* Status Bar */}
            <div className="bg-[#0a0a0a] border-t border-[#222] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${editMode === 'visual' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-[#ff7a18] shadow-[0_0_12px_rgba(255,122,24,0.4)]'} transition-all duration-300`} />
                    <span className="text-[10px] text-gray-600 uppercase font-black tracking-[0.2em] select-none">
                        {editMode === 'visual' ? 'Visual / WYSIWYG Editor' : 'HTML Source Editor'}
                    </span>
                </div>
                {value && (
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                            {value.replace(/<[^>]*>/g, '').length} words
                        </span>
                        <div className="w-px h-3 bg-[#222]" />
                        <span className="text-[10px] text-[#ff7a18] font-black uppercase tracking-widest">
                            {value.length} codes
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
