import { useShallow } from 'zustand/react/shallow'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const AdmittingProviderSelect = () => {
  const { providers } = useStore(
    useShallow((state) => ({
      providers: state.providers,
    })),
  )
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Admitting Provider</FormFieldLabel>
      <SelectInput
        field="admittingProviderStaffId"
        placeholder="Select"
        loading={providers?.loading}
        options={providers?.data ?? []}
        buttonClassName="w-[120px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelect }
