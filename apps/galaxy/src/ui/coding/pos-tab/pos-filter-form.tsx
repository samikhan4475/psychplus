import React, { Dispatch, SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { PosList } from '../types'
import { DescriptionField } from './description-field'
import { PosCodeField } from './pos-code-field'
import { ResetButton } from './reset-button'

const schema = z.object({
  posCode: z.string().optional(),
  description: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>
interface PosFilterFormProps {
  setPosCodes: Dispatch<SetStateAction<PosList[]>>
  posCodeSet: PosList[]
}
const PosFilterForm = ({ setPosCodes, posCodeSet }: PosFilterFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      posCode: '',
      description: '',
    },
  })
  const { isDirty } = form.formState

  const onSubmit = (data: SchemaType) => {
    if (!isDirty) return
    setPosCodes(
      posCodeSet.filter(
        (posCode) =>
          posCode.code.includes(data.posCode ?? '') &&
          posCode.description
            .toLowerCase()
            .includes(data.description?.toLowerCase() ?? ''),
      ),
    )
  }

  const onClear = () => {
    form.reset()
    setPosCodes(posCodeSet)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <PosCodeField />
      <DescriptionField />
      <ResetButton onClear={onClear} />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { PosFilterForm, type SchemaType }
