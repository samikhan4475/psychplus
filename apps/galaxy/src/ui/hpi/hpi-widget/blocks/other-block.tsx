import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError } from '@/components'
import { HpiWidgetSchemaType } from '../hpi-widget-schema'

const OtherBlock = () => {
  const form = useFormContext<HpiWidgetSchemaType>()
  return (
    <>
      <Flex align="start" gap="2" width="100%">
        <BlockLabel>Other</BlockLabel>
        <TextField.Root
          size="1"
          className="max-w-96 w-full"
          {...form.register('hpiOther')}
        />
      </Flex>
      <FormFieldError name="hpiOther" />
    </>
  )
}

export { OtherBlock }
