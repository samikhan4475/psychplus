import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useStore } from '../../../clinic-time-tab/store'

const Active_Staff_Status = 'Active'

const PrimaryStateSelect = () => {
  const { states, staff } = useStore((store) => ({
    states: store.states,
    staff: store.staff,
  }))
  const allStates = useCodesetCodes(CODESETS.UsStates)
  const stateOptions =
    allStates
      .filter((state) => states?.find((el) => el.stateCode === state.value))
      .map((state) => ({
        label: state.display,
        value: state.value,
      })) ?? []

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Primary State
      </FormFieldLabel>
      <SelectInput
        buttonClassName="w-full h-6"
        field="primaryState"
        size="1"
        loading={!states}
        options={stateOptions}
        disabled={staff?.status !== Active_Staff_Status}
      />
      <FormFieldError name="primaryState" />
    </FormFieldContainer>
  )
}

export { PrimaryStateSelect }
