import { Flex, Text, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'

interface BriefInterventionDetailProps {
  label: string
}

const FORM_KEY = 'briefInterventionDetail'
const BriefInterventionDetail = ({ label }: BriefInterventionDetailProps) => {
  const form = useFormContext()
  const error = form.getFieldState(FORM_KEY, form.formState).error

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
