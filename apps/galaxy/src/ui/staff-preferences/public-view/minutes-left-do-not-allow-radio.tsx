import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const MinutesLeftDoNotAllowRadio = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'MinutesLeftDoNotAllowStaffToBookOptions',
    valueKey: 'MinutesLeftDoNotAllowStaffToBookValue',
  })

  return (
    <FormFieldContainer className="w-full flex-row rounded-1 px-2 py-1">
      <RadioGroup
        className="ml-2 flex-1 border-none !bg-transparent"
        field="staffBookingCutoffMinsBeforeVisit"
        defaultValue={
          watch('staffBookingCutoffMinsBeforeVisit') ?? defaultValue
        }
        onValueChange={(val) =>
          setValue('staffBookingCutoffMinsBeforeVisit', val)
        }
        options={options}
        wrapperClassName="flex-1"
        disabled={!isAdminView}
      />
    </FormFieldContainer>
  )
}

export { MinutesLeftDoNotAllowRadio }
