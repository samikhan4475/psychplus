import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import { ClaimUpdateSchemaType } from '@/ui/revenue-cycle/claim-detail-tab/schema'

interface FormCheckboxProps {
  label: string
  fieldName: keyof ClaimUpdateSchemaType
}

const FormCheckbox = ({ label, fieldName }: FormCheckboxProps) => {
  const { control } = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <Text className="text-[11.5px] font-[600]">
        <Flex gap="2">
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={Boolean(field.value)}
                onCheckedChange={(checked) => field.onChange(!!checked)}
                highContrast
                className="cursor-pointer"
              />
            )}
          />
          {label}
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export { FormCheckbox }
