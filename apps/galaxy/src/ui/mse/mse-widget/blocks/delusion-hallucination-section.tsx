import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  MultiSelectField,
  MultiSelectOption,
  YesNoSelect,
} from '@/components'
import { ChipList } from '@/components/chip-list'
import { ERROR_ID } from '../constants'
import { MseWidgetSchemaType } from '../mse-widget-schema'
import { SelectedIndicator } from '../select-indicotor'

const DelusionHallucinationSection = ({
  result,
  label,
  yesNoField,
  multiSelectField,
  multiSelectOptions,
}: {
  result?: MseWidgetSchemaType
  label: string
  yesNoField: keyof MseWidgetSchemaType
  multiSelectField: keyof MseWidgetSchemaType
  multiSelectOptions: MultiSelectOption[]
}) => {
  const form = useFormContext<MseWidgetSchemaType>()

  const defaultValue = result
    ? (result?.[yesNoField] as string)
    : (form.watch(yesNoField) as string)

  const chipDate = result
    ? result?.[multiSelectField]
    : form.watch(multiSelectField)
  return (
    <>
      <YesNoSelect
        label={label}
        field={yesNoField}
        options={[
          { label: 'No', value: 'no' },
          { label: 'Yes', value: 'yes' },
        ]}
        disabled={!!result}
        defaultValue={defaultValue}
        resetOnSameValue={true}
        errorField={ERROR_ID}
      />
      {defaultValue === 'yes' && (
        <>
          <SelectedIndicator />

          <Flex position="relative" align="center">
            <Flex
              align="center"
              className="bg-pp-focus-bg-2 rounded-1 pl-1"
              gap="1"
            >
              <BlockLabel>{'Types'}</BlockLabel>
              <MultiSelectField
                onChange={(vals) =>
                  form.setValue(multiSelectField, vals, {
                    shouldDirty: true,
                  })
                }
                options={multiSelectOptions}
                defaultValues={chipDate as string[]}
                hideSelectedCount={true}
                disabled={!!result}
              />
            </Flex>
          </Flex>
          <ChipList
            data={chipDate as string[]}
            field={multiSelectField}
            chipClassName="self-center"
            options={multiSelectOptions ?? []}
            isDisable={!!result}
          />
        </>
      )}
    </>
  )
}

export { DelusionHallucinationSection }
