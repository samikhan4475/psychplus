import { ClipboardEvent, FormEvent } from 'react'
import { decodeHtmlToText } from '@/utils'

const handleBeforeInput =
  (maxLength?: number) => (e: FormEvent<HTMLDivElement>) => {
    const contentLength =
      decodeHtmlToText(e.currentTarget.innerHTML)?.length || 0
    if (maxLength && contentLength >= maxLength) e.preventDefault()
  }

const handlePaste =
  (element?: HTMLDivElement | null, maxLength?: number) =>
  (e: ClipboardEvent<HTMLDivElement>) => {
    if (!maxLength || !element) return
    e.preventDefault()
    const pasted = e.clipboardData.getData('text/plain')
    const content = element.textContent ?? ''
    const sel = window.getSelection()
    const selected = sel?.toString() ?? ''
    const maxInsert = maxLength - (content.length - selected.length)
    if (maxInsert <= 0) return
    const text = pasted.slice(0, maxInsert)
    document.execCommand('insertText', false, text)
  }

export { handleBeforeInput, handlePaste }
