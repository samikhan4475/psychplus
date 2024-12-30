import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { zipCodeSchema } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
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
  code: string
  displayName: string
}

const ZipCodeSearchForm = () => {
  const { zipCode, setZipCode, state, setState, setStateCode } = useStore(
    (state) => ({
      zipCode: state.zipCode,
      setZipCode: state.setZipCode,
      state: state.state,
      setState: state.setState,
      setStateCode: state.setStateCode,
    }),
  )

  const [zipStates, setZipStates] = useState<StateListType[]>([])

  const getZipCodeInfoApi = async (zipCode: string | undefined) => {
    setZipStates([])
    if (zipCode?.trim().length === 5) {
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
    getZipCodeInfoApi(form.watch('zipCode'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.watch('zipCode')])

  useEffect(() => {
    if (
      zipStates.length > 0 &&
      !zipStates.some((zipState) => zipState.displayName === state)
    ) {
      form.setValue('state', zipStates[0].displayName)
      setState(zipStates[0].displayName)
      setStateCode(zipStates[0].code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipStates])

  const onSubmit = (data: SchemaType) => {
    setZipCode(data.zipCode)
    if (zipStates.length > 0) {
      form.setValue('state', zipStates[0].displayName)
      setState(zipStates[0].displayName)
      setStateCode(zipStates[0].code)
    }
    form.reset(form.getValues())
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
                setStateCode(
                  zipStates.find((state) => state.displayName === value)
                    ?.code || '',
                )
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
