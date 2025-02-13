import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TextInput, YesNoSelect } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { SelectedIndicator } from '../select-indicotor'
import { UnDisclosedBlock } from './undisclosed-block'

const sectionOptions = {
  SI: {
    title: 'Suicidal Ideation',
    field: 'siUnDisclosed',
  },
  HI: {
    title: 'Homicidal Ideation',
    field: 'hiUnDisclosed',
  },
}

const SiHiSection = ({
  result,
  label,
  field,
}: {
  result?: MseWidgetSchemaType
  label: 'SI' | 'HI'
  field: keyof MseWidgetSchemaType
}) => {
  const form = useFormContext<MseWidgetSchemaType>()
  const { field: unDisclosedField, title } = sectionOptions[label]
  const isYes = result
    ? (result?.[field] as string)
    : (form.watch(field) as string)

  return (
    <Flex align="center" gap="2">
      <YesNoSelect
        label={title}
        field={field}
        options={[
          { label: 'No', value: 'no' },
          { label: 'Yes', value: 'yes' },
        ]}
        disabled={!!result}
        defaultValue={result ? (result?.[field] as string) : undefined}
        resetOnSameValue={true}
        errorField={ERROR_ID}
      />
      {isYes === 'yes' && (
        <>
          <SelectedIndicator />
          {result ? (
            <MseGroupDetailSection
              label="Plan"
              field={unDisclosedField}
              options={[
                {
                  label: 'Undisclosed',
                  value: unDisclosedField,
                },
              ]}
              result={result}
            />
          ) : (
            <UnDisclosedBlock
              label="Plan"
              field={unDisclosedField}
              options={[
                { label: 'Disclosed', value: '' },
                { label: 'Undisclosed', value: unDisclosedField },
              ]}
              disabled={!!result}
              resetOnSameValue={true}
              errorField={ERROR_ID}
            />
          )}

          <TextInput
            className="pl-0"
            field={`${label.toLowerCase()}OtherDetails`}
            autoFocus
            placeHolder="Add text"
          />
        </>
      )}
    </Flex>
  )
}

export { SiHiSection }
