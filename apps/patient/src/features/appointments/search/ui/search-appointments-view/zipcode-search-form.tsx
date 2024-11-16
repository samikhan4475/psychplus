import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { cn, zipCodeSchema } from '@psychplus-v2/utils'
import { Flex, Select } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { getZipcodeInfo } from '@/actions'
import {
  FormFieldContainer,
  FormSubmitButton,
  ZipcodeInput,
} from '@/components-v2'
import { useStore } from '@/features/appointments/search/store'
import { ZipCodeStateDropdown } from './zipcode-state-dropdown'

const schema = z.object({
  zipCode: zipCodeSchema,
  state: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>
interface StateListType {
  long_name: string
  short_name: string
  types: string[]
}

const ZipCodeSearchForm = () => {
  const { zipCode, setZipCode, state, setState, setStateCode} = useStore((state) => ({
    zipCode: state.zipCode,
    setZipCode: state.setZipCode,
    state: state.state,
    setState: state.setState,
    setStateCode: state.setStateCode
  }))

  const [zipStates, setZipStates] = useState<StateListType[]>([])

  const getZipCodeInfoApi = async (zipCode: string | undefined) => {
    setZipStates([])
    if (zipCode?.length === 5) {
      const zipCodeInfo = await getZipcodeInfo(zipCode)
      if (zipCodeInfo.state === 'error') {
        return
      }
      setZipStates(zipCodeInfo.data)
    }
  }

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      zipCode,
      state,
    },
  })

  useEffect(() => {
    if (zipStates.length > 0) {
      form.setValue('state', zipStates[0].long_name)
      setState(zipStates[0].long_name)
      setStateCode(zipStates[0].short_name)
    }
  }, [setState, zipStates])

  useEffect(() => {
    getZipCodeInfoApi(form.watch('zipCode'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.watch('zipCode')])

  const onSubmit = (data: SchemaType) => {
    form.reset(form.getValues())
    setZipCode(data.zipCode)
  }

  return (
    <Flex direction="column" gap="2">
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex align="end" gap="2">
          <FormFieldContainer
            className="flex-1 flex-row"
            gap={{ initial: '2', sm: '4' }}
          >
            <ZipCodeStateDropdown
              name="state"
              value={form.watch('state') ?? ''}
              onValueChange={(value) => {
                form.setValue('state', value)
                form.trigger('state')
                setState(value)
                setStateCode(zipStates.find(state => state.long_name === value)?.short_name || "")
              }}
              options={zipStates}
            />

            <ZipcodeInput
              size={{ initial: '2' }}
              className="sm:w-[110px]"
              {...form.register('zipCode')}
              placeholder="Enter ZIP"
              value={form.watch('zipCode')}
            />
          </FormFieldContainer>
          <FormSubmitButton
            size={{ initial: '2' }}
            className="flex-1 sm:flex-initial"
          >
            Search ZIP
          </FormSubmitButton>
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { ZipCodeSearchForm }
