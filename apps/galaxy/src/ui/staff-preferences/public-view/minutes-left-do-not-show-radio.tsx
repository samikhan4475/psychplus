import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const MinutesLeftDoNotShowRadio = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'MinutesLeftDoNotShowPublicViewOptions',
    valueKey: 'MinutesLeftDoNotShowPublicViewValue',
  })

  return (
    <FormFieldContainer className="w-full flex-row rounded-1 px-2 py-1">
      <RadioGroup
        className="!bg-white ml-2 flex-1 border-none"
        field="publicViewHideMinsBeforeVisit"
        defaultValue={watch('publicViewHideMinsBeforeVisit') ?? defaultValue}
        onValueChange={(val) => setValue('publicViewHideMinsBeforeVisit', val)}
        options={options}
        wrapperClassName="flex-1"
        disabled={!isAdminView}
      />
    </FormFieldContainer>
  )
}

export { MinutesLeftDoNotShowRadio }
