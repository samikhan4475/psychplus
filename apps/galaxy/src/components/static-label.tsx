'use client'

import {  TextField } from '@radix-ui/themes'
import { FormFieldContainer } from '.'
import { Label } from 'react-aria-components'

interface StaticLabelProps {
  label: string
  value: string
}

const StaticLabel = ({ label, value }: StaticLabelProps) => {

  return (
    <FormFieldContainer className='flex-row gap-2 text-[12px]'>
      {label && <Label>{label}</Label>}
      <TextField.Root
        size="1"
        value={value}
        disabled
        className={('inline-flex w-12')}
      />
    </FormFieldContainer>
  )
}

export { StaticLabel }
