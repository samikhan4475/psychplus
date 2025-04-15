import { RefObject, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { getUserSettings } from '@/actions'
import { SelectOptionType } from '@/types'
import { sanitizeFormData } from '@/utils'

const useAutoTextSuggestions = (ref: RefObject<HTMLDivElement>) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<SelectOptionType[]>([])
  const [offset, setOffset] = useState<{ x?: number; y?: number }>()

  const fetchOptions = useCallback(async (namePartial?: string) => {
    setLoading(true)
    setSuggestions([])
    const res = await getUserSettings(
      sanitizeFormData({
        isIncludeMetadataResourceChangeControl: true,
        isIncludeMetadataResourceIds: true,
        isIncludeMetadataResourceStatus: true,
        isHierarchicalQuery: true,
        settingStatusCode: 'Active',
        categoryCodes: ['Application'],
        categoryValue: 'AutoText',
        namePartial,
      }),
      1,
      20,
    )
    if (res.state === 'error') {
      toast.error(res.error)
    } else {
      const options = res.data.map((item) => ({
        label: item.name,
        value: item.content,
      }))
      setSuggestions(options)
    }
    setLoading(false)
  }, [])

  const handleInsetSuggestion = (value: string, callback?: () => void) => {
    const sel = window.getSelection()
    if (!sel || !ref.current || !sel.rangeCount) return
    const range = sel.getRangeAt(0)
    const mentionRange = range.cloneRange()
    const text = range.startContainer.textContent ?? ''
    const offset = range.startOffset
    const beforeCursor = text.slice(0, offset)
    const match = /@[^@]*$/.exec(beforeCursor)
    if (!match) return
    const start = offset - match[0].length
    mentionRange.setStart(range.startContainer, start)
    mentionRange.setEnd(range.startContainer, offset)
    mentionRange.deleteContents()
    const insertedNode = document.createTextNode(value + ' ')
    mentionRange.insertNode(insertedNode)
    sel.removeAllRanges()
    const newRange = document.createRange()
    newRange.setStartAfter(insertedNode)
    newRange.collapse(true)
    sel.addRange(newRange)
    setShowSuggestions(false)
    callback?.()
  }

  const handleTrackSuggestions = useDebouncedCallback(() => {
    const sel = window.getSelection()
    if (!sel || !sel.anchorNode) return
    let text = ''
    const anchorNode = sel.anchorNode
    const anchorOffset = sel.anchorOffset
    if (anchorNode.nodeType === Node.TEXT_NODE) {
      text = anchorNode.textContent?.slice(0, anchorOffset) ?? ''
    } else {
      const range = sel.getRangeAt(0).cloneRange()
      range.setStart(anchorNode, 0)
      text = range.toString()
    }
    const match = /(?<![@\S])@([^\s@]*)(?!@)/.exec(text)
    if (match) {
      const query = match[1].trim()
      setShowSuggestions(true)
      fetchOptions(query)
      const fullMatch = match[0]
      const matchLength = fullMatch.length
      try {
        const range = sel.getRangeAt(0).cloneRange()
        if (
          anchorNode.nodeType === Node.TEXT_NODE &&
          anchorOffset >= matchLength
        ) {
          range.setStart(anchorNode, anchorOffset - matchLength)
          range.setEnd(anchorNode, anchorOffset)
          const rect = range.getBoundingClientRect()
          const parent = ref.current
          const parentRect = parent?.getBoundingClientRect()
          if (rect && parentRect && parent) {
            const y = rect.top - parentRect.top
            const x = rect.left - parentRect.left
            setOffset({
              x,
              y: y,
            })
          }
        } else {
          range.collapse(false)
          const rect = range.getBoundingClientRect()
          const parent = ref.current
          const parentRect = parent?.getBoundingClientRect()
          if (rect && parentRect && parent) {
            const y = rect.top - parentRect.top
            const x = rect.left - parentRect.left
            setOffset({
              x,
              y: parent.clientHeight - y,
            })
          }
        }
      } catch (err) {
        toast.error('Error handling mention range:' + err)
      }
    } else {
      setShowSuggestions(false)
    }
  }, 700)

  return {
    handleTrackSuggestions,
    handleInsetSuggestion,
    suggestions,
    offset,
    loading,
    showSuggestions,
  }
}

export { useAutoTextSuggestions }
