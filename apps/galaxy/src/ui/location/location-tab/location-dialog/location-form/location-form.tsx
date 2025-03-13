'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, Separator } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { Location } from '@/types'
import { addLocationAction, updateLocationAction } from '../../../actions'
import { transformOutLocation } from '../../transform'
import { getInitialLocationValues } from '../../utils'
import { FaxInput } from './fax-input'
import { GMBInput } from './gmb-input'
import { LocationGeneratedName } from './location-generated-name'
import { LocationTypeRadio } from './location-type-radio'
import { NameInput } from './name-input'
import { NpiInput } from './npi-input'
import { PhoneInput } from './phone-input'
import { PrimaryAddress } from './primary-address'
import { SaveButton } from './save-button'
import { locationSchema, LocationSchemaType } from './schema'
import { StatusInput } from './status-input'
import { TestLocationInput } from './test-location-input'

interface FormDataType {
  location?: Location
  isEditable?: boolean
  onClose?: (updateLocation?: Location) => void
}
const LocationForm = ({ location, isEditable, onClose }: FormDataType) => {
  const form = useForm<LocationSchemaType>({
    resolver: zodResolver(locationSchema),
    mode: 'onChange',
    defaultValues: getInitialLocationValues(location),
  })

  const onSubmit = async (data: LocationSchemaType) => {
    const body = transformOutLocation(data)
    const response = await (isEditable && data?.id
      ? updateLocationAction(body, data?.id)
      : addLocationAction(body))

    if (response.state === 'error') {
      return toast.error(response.error)
    }

    toast.success(`Location ${isEditable ? 'updated' : 'created'} successfully`)
    onClose?.(response?.data)
    form.reset()
  }

  return (
    <FormContainer onSubmit={onSubmit} form={form}>
      <Grid columns="3" className="gap-2">
        <LocationTypeRadio />
        <NameInput />
        <NpiInput />
        <PhoneInput />
        <FaxInput />
        <StatusInput />
        <TestLocationInput />
        <LocationGeneratedName />
        <PrimaryAddress />
        <Separator
          orientation="horizontal"
          className="col-span-full mt-1 w-full"
        />
        <GMBInput />
        <SaveButton isEditable={isEditable} />
      </Grid>
    </FormContainer>
  )
}

export { LocationForm }
