import { useEffect } from 'react'
import { Flex, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, CheckboxCell } from '@/components'

interface BriefInterventionDetailProps {
  label: string
  defaultValue: string
}

const BriefInterventionDetail = ({
  label,
  defaultValue,
}: BriefInterventionDetailProps) => {
  const form = useFormContext()

  useEffect(() => {
    if (!form.watch('briefInterventionDetail')) {
      form.setValue('briefInterventionDetail', defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCheckedChange = (checked: boolean) => {
    form.setValue('briefIntervention', checked ? true : false)
  }

  return (
    (form.watch('alcohol') === 'yes' || form.watch('drugs') === 'yes') && (
      <Flex align="center">
        <BlockLabel name="briefIntervention" required>
          {label}
        </BlockLabel>
        <CheckboxCell
          checked={form.watch('briefIntervention')}
          onCheckedChange={handleCheckedChange}
        />
        <TextArea
          size="1"
          className="w-[800px] flex-grow"
          {...form.register('briefInterventionDetail')}
        />
      </Flex>
    )
  )
}

export { BriefInterventionDetail }
