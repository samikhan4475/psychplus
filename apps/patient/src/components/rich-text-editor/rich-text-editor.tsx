'use client'

import { Box } from '@radix-ui/themes'
import 'quill/dist/quill.snow.css'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  height?: string
  placeholder: string
  readOnly?: boolean
  style?: React.CSSProperties
  maxLength?: number
  baseStyes?: React.CSSProperties
  maxLengthStyles?: React.CSSProperties
}

interface QuillInstance {
  on: (event: string, handler: () => void) => void
  off: (event: string, handler: () => void) => void
  clipboard: {
    dangerouslyPasteHTML: (html: string) => void
  }
  enable: (enabled?: boolean) => void
  getSelection: () => { index: number; length: number } | null
  setSelection: (index: number, length?: number) => void
  getText: () => string
  getLength: () => number
}

const RichTextEditor: React.FC<Props> = ({
  value,
  onChange,
  height = '400px',
  placeholder = 'Enter text here',
  readOnly = false,
  style = {},
  baseStyes = {},
  maxLength,
  maxLengthStyles = {},
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<QuillInstance | null>(null)
  const onChangeRef = useRef(onChange)
  const isInitializedRef = useRef(false)
  const lastValidContentRef = useRef('')
  const [characterCount, setCharacterCount] = useState(0)
  const lastCursorPositionRef = useRef<{ index: number; length: number } | null>(null)

  // Update the onChange ref when it changes
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    const initQuill = async () => {
      if (editorRef.current && !quillRef.current && !isInitializedRef.current) {
        isInitializedRef.current = true

        const Quill = (await import('quill')).default

        const quill = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          },
          placeholder: placeholder,
        })

        // Store cursor position before any changes
        quill.on('selection-change', () => {
          const selection = quill.getSelection()
          if (selection) {
            lastCursorPositionRef.current = selection
          }
        })

        // Add custom paste handler to truncate content
        if (maxLength) {
          quill.on('paste', (e: ClipboardEvent) => {
            const clipboardData = e.clipboardData
            if (clipboardData) {
              const text = clipboardData.getData('text/plain')
              const currentText = quill.getText().slice(0, -1) // Remove the newline character
              const combinedLength = currentText.length + text.length
              
              if (combinedLength > maxLength) {
                e.preventDefault()
                const availableSpace = maxLength - currentText.length
                if (availableSpace > 0) {
                  const truncatedText = text.substring(0, availableSpace)
                  quill.clipboard.dangerouslyPasteHTML(truncatedText)
                }
              }
            }
          })
        }

        const handler = () => {
          const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || ''
          const textContent = quill.getText().slice(0, -1) // Remove the newline character
          
          // Convert empty Quill content to empty string
          const isEmptyContent = html === '<p><br></p>' || html === '<p></p>' || html === ''
          const finalHtml = isEmptyContent ? '' : html
          
          if (maxLength) {
            setCharacterCount(textContent.length)
            
            if (textContent.length <= maxLength) {
              lastValidContentRef.current = finalHtml
              onChangeRef.current(finalHtml)
            } else {
              // Prevent further typing by restoring the last valid content
              const currentSelection = quill.getSelection()
              quill.clipboard.dangerouslyPasteHTML(lastValidContentRef.current)
              
              // Restore cursor position to the end if it was at the end, otherwise keep current position
              if (currentSelection) {
                const newLength = quill.getLength() - 1
                const targetIndex = Math.min(currentSelection.index, newLength)
                quill.setSelection(targetIndex, 0)
              }
              
              onChangeRef.current(lastValidContentRef.current)
            }
          } else {
            onChangeRef.current(finalHtml)
          }
        }

        quill.on('text-change', handler)

        // Set initial content if provided
        if (value) {
          quill.clipboard.dangerouslyPasteHTML(value)
          lastValidContentRef.current = value
          // Set initial character count
          if (maxLength) {
            const textContent = quill.getText().slice(0, -1)
            setCharacterCount(textContent.length)
          }
        }

        quillRef.current = quill
      }
    }

    initQuill()

    // Cleanup function
    return () => {
      if (quillRef.current) {
        quillRef.current = null
        isInitializedRef.current = false
      }
    }
  }, [placeholder, maxLength]) // Re-run if placeholder or maxLength changes

  // Update content when value prop changes
  useEffect(() => {
    if (quillRef.current) {
      const currentHtml = editorRef.current?.querySelector('.ql-editor')?.innerHTML || ''
      if (value !== currentHtml) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value)
        // Update character count when value changes externally
        if (maxLength) {
          const textContent = quillRef.current.getText().slice(0, -1)
          setCharacterCount(textContent.length)
        }
      }
    }
  }, [value, maxLength])

  // Toggle readOnly mode
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!readOnly)
    }
  }, [readOnly])

  const remainingCharacters = maxLength ? maxLength - characterCount : 0
  const isOverLimit = remainingCharacters <= 0

  return (
    <Box style={{ position: 'relative', ...baseStyes }}>
      <Box ref={editorRef} style={{ height, ...style }} />
      {maxLength && (
        <Box 
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '14px',
            color: isOverLimit ? '#ef4444' : '#6b7280',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 6px',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 10,
            ...maxLengthStyles
          }}
        >
          {remainingCharacters} / {maxLength}
        </Box>
      )}
    </Box>
  )
}

export { RichTextEditor }
