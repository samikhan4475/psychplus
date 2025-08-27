import { ReactNode } from 'react'

export type ToggleOption = {
  value: string
  label: string
  icon?: ReactNode
}

export interface PillToggleGroupProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  itemClassName?: string
}

export interface SyncedPillToggleGroupProps {
  value: string
  onChange: (value: string) => void
  options: ToggleOption[]
  className?: string
  itemClassName?: string
  delay?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 // delay on seconds
}
