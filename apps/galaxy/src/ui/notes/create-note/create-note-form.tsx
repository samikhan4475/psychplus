'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { createNoteSchema } from '.'

const schema = createNoteSchema

type SchemaType = z.infer<typeof schema>

const CreateNoteForm = ({ children }: React.PropsWithChildren) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      date: undefined,
      time: undefined,
      visitType: '',
      visitTitle: '',
      provider: '',
      cosigner: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // do something with data
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" className="flex-1 gap-[2px] overflow-auto p-1">
        {children}
      </Flex>
    </FormContainer>
  )
}

export { CreateNoteForm }
