import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { getProvidersOptionsAction } from '@/actions'
import {
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
  TextInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { sanitizeFormData } from '@/utils'
import { addServiceUnitAction, updateServiceUnitAction } from './actions'
import { GROUP_STATUSES } from './constants'
import { useStore } from './store'
import { ServiceUnit } from './types'

interface FormProps {
  data?: ServiceUnit
  onCloseModal: (open: boolean) => void
}

const schema = z.object({
  id: z.string().optional(),
  unit: z.string().min(1, { message: 'Name is required' }),
  coSignerId: z.string().optional(),
  defaultPractice: z.string().optional(),
  resourceStatus: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>
const AddNewUnitForm = ({ data, onCloseModal }: FormProps) => {
  const { id, locationId } = useParams<{ id: string; locationId: string }>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id ?? '',
      unit: data?.unit ?? '',
      coSignerId: data?.coSignerId?.toString() ?? '',
      defaultPractice: data?.defaultPractice ?? '',
      resourceStatus: data?.resourceStatus ?? 'Active',
    },
  })
  const { search, page } = useStore((state) => ({
    search: state.search,
    page: state.page,
  }))

  const [cosignerData, setCosignerData] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  const onSubmit = async (formData: SchemaType) => {
    const requestPayload: Partial<ServiceUnit> = {
      ...formData,
      locationId,
      serviceId: id,
    }

    const payload =
      data && data?.id
        ? {
            ...data,
            ...requestPayload,
          }
        : requestPayload

    const sanitizedPayload = sanitizeFormData(payload)

    const response =
      data && data.id
        ? await updateServiceUnitAction(
            sanitizedPayload,
            data?.locationId,
            data?.serviceId,
            data?.id,
          )
        : await addServiceUnitAction(sanitizedPayload, locationId, id)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
      search({ serviceId: id }, page, true)
    } else {
      toast.error('Unable to save record')
    }
  }

  const fetchCosignerData = useCallback(async () => {
    setLoading(true)

    const cosignerResult = await getProvidersOptionsAction()
    if (cosignerResult.state === 'success') {
      setCosignerData(cosignerResult.data)
    } else if (cosignerResult.error !== 'AbortError') {
      toast.error(cosignerResult.error ?? 'Failed to fetch cosigner data')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCosignerData()
  }, [fetchCosignerData])

  return (
    <FormContainer onSubmit={onSubmit} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="2" className="mb-2 mt-2 gap-3">
          <FormFieldContainer className="flex-1 gap-0">
            <FormFieldLabel required className="pb-[3px]">
              Unit Name/No.
            </FormFieldLabel>
            <TextInput field="unit" className="h-6 w-full" />
            <FormFieldError name="unit" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1 gap-0">
            <FormFieldLabel className="pb-[3px]">
              Default Cosigner
            </FormFieldLabel>
            <SelectInput
              options={cosignerData || []}
              size="1"
              field="coSignerId"
              defaultValue="coSignerId"
              buttonClassName="w-full h-6"
              loading={loading}
            />
            <FormFieldError name="coSignerId" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1 gap-0">
            <FormFieldLabel className="pb-[3px]">
              Default Practice
            </FormFieldLabel>
            <TextInput
              field="defaultPractice"
              className="h-6 w-full"
              disabled
            />
            <FormFieldError name="defaultPractice" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1 gap-0">
            <FormFieldLabel className="pb-[3px]">Status</FormFieldLabel>
            <SelectInput
              options={GROUP_STATUSES || []}
              size="1"
              field="resourceStatus"
              buttonClassName="w-full h-6"
            />
            <FormFieldError name="resourceStatus" />
          </FormFieldContainer>
        </Grid>
      </Box>
      <FormFieldContainer className="flex-1 gap-0">
        <Box className="mt-4 flex justify-end">
          <Button className="bg-pp-black-2 text-white" type="submit">
            <Text size="2">Save</Text>
          </Button>
        </Box>
      </FormFieldContainer>
    </FormContainer>
  )
}

export { AddNewUnitForm, type SchemaType }
