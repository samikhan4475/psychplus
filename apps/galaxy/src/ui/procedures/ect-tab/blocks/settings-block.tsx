import {
  FormFieldContainer,
  FormFieldLabel,
  SelectableChipDetails,
  SelectableChipDetailsProps,
} from '@/components'

const settingsFieldsBlock: SelectableChipDetailsProps[] = [
  {
    label: 'Pw',
    type: 'number',
    field: 'ectSettingBlockPw',
    showIndicator: false,
    placeHolder: '00.00',
    format: '##.##',
  },
  {
    label: 'Frequency',
    type: 'number',
    field: 'ectSettingBlockFrequency',
    showIndicator: false,
    placeHolder: '000',
    format: '###',
  },
  {
    label: 'Duration',
    type: 'number',
    field: 'ectSettingBlockDuration',
    showIndicator: false,
    placeHolder: '0',
    format: '#',
  },
  {
    label: 'Current',
    type: 'number',
    field: 'ectSettingBlockCurrent',
    showIndicator: false,
    placeHolder: '000',
    format: '###',
  },
]

const SettingsBlock = () => {
  return (
    <FormFieldContainer className="flex w-auto flex-row gap-2">
      <FormFieldLabel className="text-[12px]" required>
        Settings
      </FormFieldLabel>
      {settingsFieldsBlock.map(
        ({ label, type, field, placeHolder, format }) => (
          <SelectableChipDetails
            key={field}
            label={label}
            type={type}
            field={field}
            showIndicator={false}
            placeHolder={placeHolder}
            format={format}
          />
        ),
      )}
    </FormFieldContainer>
  )
}

export { SettingsBlock }
