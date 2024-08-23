import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { type HpiWidgetSchemaType } from '../hpi-widget-schema'

const OtherBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()

  return (
    <Flex align="center" gap="2">
      <BlockLabel>Other</BlockLabel>
      <TextField.Root
        size="1"
        className="w-full max-w-lg"
        {...form.register('other')}
      ></TextField.Root>
    </Flex>
  )
}

export { OtherBlock }
