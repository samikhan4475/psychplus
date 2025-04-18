import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { ClinicScheduleStatus } from '@/ui/clinic-schedule/clinic-time-tab/constants'
import { isPrescriber } from '@/utils'
import { useStore } from '../../../clinic-time-tab/store'
import { SchemaType } from '../schema'

const options = [
  {
    label: 'Error',
    value: ClinicScheduleStatus.Error,
  },
  {
    label: 'Pending',
    value: ClinicScheduleStatus.Pending,
  },
  {
    label: 'Inactive',
    value: ClinicScheduleStatus.Inactive,
  },
  {
    label: 'Active',
    value: ClinicScheduleStatus.Active,
    disabled: true,
  },
]

const StatusSelect = () => {
  const { staff } = useStore((store) => ({
    staff: store.staff,
  }))
  const { formState } = useFormContext<SchemaType>()
  const isProvider = isPrescriber(staff)
  const isInitialPending =
    formState.defaultValues?.status === ClinicScheduleStatus.Pending

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Status
      </FormFieldLabel>
      <SelectInput
        buttonClassName="w-full h-6"
        field="status"
        options={options}
        defaultValue={ClinicScheduleStatus.Pending}
        disabled={isProvider || isInitialPending}
      />
      <FormFieldError name="status" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
