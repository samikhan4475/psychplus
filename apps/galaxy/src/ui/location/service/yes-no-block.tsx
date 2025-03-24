'use client'

import React from 'react'
import { TextCell } from '@/components'

interface YesNoBlockProps {
  value?: boolean
}

const YesNoBlock = ({ value }: YesNoBlockProps) => {
  if (value === undefined) return <TextCell>N/A</TextCell>
  return <TextCell>{value ? 'Yes' : 'No'}</TextCell>
}

export { YesNoBlock }
