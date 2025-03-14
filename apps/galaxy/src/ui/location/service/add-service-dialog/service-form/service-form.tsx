'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, Separator } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { Location } from '@/types'
import { addServiceAction } from '../../actions'
import { useStore } from '../../store'
import { transformOutService } from '../../transform'
import { getInitialValues } from '../../utils'
import { ClaimAddressBlock } from './claim-address-block'
import { CosignerSelect } from './cosigner-select'
import { CosignerTypeSelect } from './cosigner-type-select'
import { LocationInfoInput } from './location-info-input'
import { MaxBookingFrequencySelect } from './max-booking-frequency-select'
import { PlaceOfServiceInput } from './pos-input'
import { PrimaryProviderRequiredSelect } from './primary-provider-required-select'
import { QuestionBlock } from './question-block'
import { SaveButton } from './save-button'
import { schema, ServiceSchemaType } from './schema'
import { ServiceSelect } from './service-select'
import { TaxonomySelect } from './taxonomy-select'
import { TimeDependentSelect } from './time-dependent-select'
import { VisitTypeTable } from './visit-type-table'

interface ServiceFormProps {
  location: Location
  onClose: () => void
}
const ServiceForm = ({ location, onClose }: ServiceFormProps) => {
  const { cosigners = [], visitTypes = [] } = useStore((state) => ({
    fetchVisitTypes: state.fetchVisitTypes,
    visitTypes: state.visitTypes,
    cosigners: state.cosigners,
  }))
  const form = useForm<ServiceSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: getInitialValues(location),
  })

  const onSubmit: SubmitHandler<ServiceSchemaType> = async (data) => {
    const payload = transformOutService(
      cosigners,
      visitTypes,
      location.address,
      data,
    )
    const response = await addServiceAction(payload)
    if (response.state === 'error') {
      return toast.error(response?.error)
    }
    toast.success('Service added successfully!')
    onClose()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="1" gap="2">
        <Grid columns="11" gap="2">
          <LocationInfoInput location={location} />
          <ServiceSelect />
          <PlaceOfServiceInput />
        </Grid>
        <Grid columns="3" gap="2">
          <TaxonomySelect />
          <PrimaryProviderRequiredSelect />
          <TimeDependentSelect />
        </Grid>
        <Separator size="4" className="bg-pp-gray-2 mt-3 h-px w-full" />
        <QuestionBlock />
        <Separator size="4" className="bg-pp-gray-2 h-px w-full" />
        <Grid columns="3" gap="2">
          <MaxBookingFrequencySelect />
          <CosignerTypeSelect />
          <CosignerSelect options={cosigners ?? []} />
        </Grid>
        <ClaimAddressBlock address={location?.address ?? ''} />
        <VisitTypeTable visitTypes={visitTypes} />
      </Grid>
      <SaveButton />
    </FormContainer>
  )
}

export { ServiceForm }
