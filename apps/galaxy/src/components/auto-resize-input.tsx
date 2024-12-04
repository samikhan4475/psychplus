'use client'

import { Box, BoxProps } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'

type AutoResizeInputProps = Omit<
  BoxProps,
  'contentEditable' | 'suppressContentEditableWarning'
> & {
  field: string
  resize?: 'horizontal' | 'both'
}

const AutoResizeInput = ({
  field,
  spellCheck = false,
  className,
  resize = 'both',
  ...props
}: AutoResizeInputProps) => {
  const form = useFormContext()

  return (
    <Box
      onBlur={({ currentTarget: { textContent } }) => {
        form.setValue(field, textContent ?? '', { shouldValidate: true })
      }}
      contentEditable
      spellCheck={spellCheck}
      suppressContentEditableWarning
      className={cn(
        'border-pp-gray-8 min-w-48 max-h-52 max-w-2xl overflow-y-auto overflow-x-hidden  rounded-1 border border-solid px-1 py-[1px] text-1 outline-offset-1 outline-accent-8 focus:outline-2',
        {
          'whitespace-nowrap': resize === 'horizontal',
        },
        className,
      )}
      {...props}
    >
      {form.watch(field)}
    </Box>
  )
}

export { AutoResizeInput }
