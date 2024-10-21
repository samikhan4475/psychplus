import { FormFieldContainer, FormFieldLabel, SelectableChipDetails, SelectableChipDetailsProps } from '@/components'
import { Flex, Text } from '@radix-ui/themes'

const settingsFieldsBlock: SelectableChipDetailsProps[] = [
  { label: 'Pw', type: 'text', field: 'ectSettingBlock.pw', showIndicator: false, placeHolder: '00.00' },
  { label: 'Frequency', type: 'text', field: 'ectSettingBlock.frequency', showIndicator: false },
  { label: 'Duration', type: 'text', field: 'ectSettingBlock.duration', showIndicator: false },
  { label: 'Current', type: 'text', field: 'ectSettingBlock.current', showIndicator: false },
];

const SettingsBlock = () => {
  return (
    <FormFieldContainer className="w-auto flex flex-row gap-2">
      <FormFieldLabel className='text-[12px]' required>
        Settings
      </FormFieldLabel>
      {settingsFieldsBlock.map(({ label, type, field, placeHolder }) => (
        <SelectableChipDetails
          key={field}
          label={label}
          type={type}
          field={field}
          showIndicator={false}
          placeHolder={placeHolder}
        />
      ))}
    </FormFieldContainer>
  );
}

export { SettingsBlock }
