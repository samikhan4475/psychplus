import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { GroupSelectSection, TextInput, YesNoSelect } from '@/components'
import { ERROR_ID } from '../constants'
import { MseGroupDetailSection } from '../history/mse-details/mse-group-detail-section'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { SelectedIndicator } from '../select-indicotor'

const SiHiSection = ({
  result,
  label,
  field,
}: {
  result?: MseWidgetSchemaType
  label: string
  field: keyof MseWidgetSchemaType
}) => {
  const form = useFormContext<MseWidgetSchemaType>()

  const isYes = result
    ? (result?.[field] as string)
    : (form.watch(field) as string)

  const unDisclosedField = `${label.toLowerCase()}UnDisclosed`
  const unDisclosedFieldValue = form.watch(
    unDisclosedField as keyof MseWidgetSchemaType,
  )

  return (
    <Flex align="center" gap="2">
      <YesNoSelect
        label={label}
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
          <Flex gap="1" className="bg-pp-focus-bg-2 rounded-1">
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
              <GroupSelectSection
                label="Plan"
                field={unDisclosedField}
                options={[
                  {
                    label: 'Undisclosed',
                    value: unDisclosedField,
                  },
                ]}
                errorField={ERROR_ID}
              />
            )}
            {unDisclosedFieldValue?.length ? (
              <TextInput
                className="pl-0"
                field={`${label.toLowerCase()}OtherDetails`}
                autoFocus
                placeHolder="Add text"
              />
            ) : null}
          </Flex>
        </>
      )}
    </Flex>
  )
}

export { SiHiSection }
