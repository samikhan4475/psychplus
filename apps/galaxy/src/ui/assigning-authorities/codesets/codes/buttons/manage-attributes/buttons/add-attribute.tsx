'use client'

import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '@/ui/assigning-authorities/store'
import { SchemaType } from '../manage-attributes-form'

const AddAttributeButton = () => {
  const { selectedCode, setSelectedCode } = useStore()
  const form = useFormContext<SchemaType>()

  if (!selectedCode) return

  return (
    <Flex justify="end" align="center">
      <Button
        variant="ghost"
        color="gray"
        type="button"
        disabled={form.watch('id') === 'new'}
        onClick={() => {
          setSelectedCode({
            ...selectedCode,
            codeAttributes: [
              { id: 'new', name: '', content: '', codeId: '' },
              ...(selectedCode?.codeAttributes ?? []),
            ],
          })

          form.reset({ id: 'new' })
          setTimeout(() => form.setFocus('name'), 0)
        }}
      >
        <PlusCircledIcon color="black" />
        <Text className="text-black">Add Attribute</Text>
      </Button>
    </Flex>
  )
}
export { AddAttributeButton }
