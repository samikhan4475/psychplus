import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { SocialHxWidgetSchemaType } from '../social-hx-widget-schema'

const OtherBlock = () => {
  const form = useFormContext<SocialHxWidgetSchemaType>()

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
