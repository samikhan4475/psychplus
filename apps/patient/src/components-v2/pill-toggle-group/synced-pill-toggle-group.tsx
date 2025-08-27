'use client'

import { useEffect, useRef, useState } from 'react'
import { PillToggleGroup } from './pill-toggle-group'
import { SyncedPillToggleGroupProps } from './types'

export const SyncedPillToggleGroup = ({
  value,
  onChange,
  options,
  delay = 0,
  className,
  itemClassName,
}: SyncedPillToggleGroupProps) => {
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (val: string) => {
    setLocalValue(val)
    timeoutRef.current = setTimeout(() => {
      onChange(val)
    }, delay * 1000) // convert to milli sec
  }

  return (
    <PillToggleGroup
      value={localValue}
      onChange={handleChange}
      options={options}
      className={className}
      itemClassName={itemClassName}
    />
  )
}
