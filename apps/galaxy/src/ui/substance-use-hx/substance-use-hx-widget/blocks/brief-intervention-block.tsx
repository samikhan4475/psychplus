import { useEffect } from 'react'
import { Flex, Text, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'

interface BriefInterventionDetailProps {
  label: string
  defaultValue: string
}

const FORM_KEY = 'briefInterventionDetail'
const BriefInterventionDetail = ({
  label,
  defaultValue,
}: BriefInterventionDetailProps) => {
  const form = useFormContext()
  const error = form.getFieldState(FORM_KEY, form.formState).error

  useEffect(() => {
    if (!form.watch(FORM_KEY)) {
      form.setValue(FORM_KEY, defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex align="center">
      <BlockLabel name={FORM_KEY} required>
        {label}
      </BlockLabel>

      <TextArea
        size="1"
        className="w-[800px] flex-grow"
        {...form.register(FORM_KEY)}
      />

      {error ? (
        <Text className="pl-1 text-[12px] text-tomato-11">{error.message}</Text>
      ) : null}
    </Flex>
  )
}

export { BriefInterventionDetail }
