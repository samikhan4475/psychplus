import { PropsWithChildren } from 'react'
import { FormFieldContainer } from '@/components'

const FilterFieldContainer = ({ children }: PropsWithChildren) => {
  return (
    <FormFieldContainer className="flex-1 flex-row gap-[4px]">
      {children}
    </FormFieldContainer>
  )
}

export { FilterFieldContainer }