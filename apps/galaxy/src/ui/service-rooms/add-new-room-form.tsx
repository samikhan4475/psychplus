import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
  TextInput,
} from '@/components'
import { sanitizeFormData } from '@/utils'
import { addServiceRoomAction, updateServiceRoomAction } from './actions'
import { ROOM_STATUSES } from './constants'
import { useStore } from './store'
import { ServiceRoom } from './types'

interface FormProps {
  data?: ServiceRoom
  onCloseModal: (open: boolean) => void
}

const schema = z.object({
  id: z.string().optional(),
  room: z.string().min(1, { message: 'Name is required' }),
  resourceStatus: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>
const AddNewRoomForm = ({ data, onCloseModal }: FormProps) => {
  const { id, locationId } = useParams<{ id: string; locationId: string }>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id ?? '',
      room: data?.room ?? '',
      resourceStatus: data?.resourceStatus ?? 'Active',
    },
  })
  const { search, page } = useStore((state) => ({
    search: state.search,
    page: state.page,
  }))

  const onSave = async (formData: SchemaType) => {
    const requestPayload: Partial<ServiceRoom> = {
      ...formData,
      locationId,
      serviceId: id,
    }

    const reqPayload =
      data && data?.id
        ? {
            ...data,
            ...requestPayload,
          }
        : requestPayload

    const sanitizedPayload = sanitizeFormData(reqPayload)

    const response =
      data && data.id
        ? await updateServiceRoomAction(
            sanitizedPayload,
            data?.locationId,
            data?.serviceId,
            data?.id,
          )
        : await addServiceRoomAction(sanitizedPayload, locationId, id)

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

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="2" className="mb-2 mt-2 gap-3">
          <FormFieldContainer className="flex-1 gap-0">
            <FormFieldLabel required className="pb-[3px]">
              Room Name/No.
            </FormFieldLabel>
            <TextInput field="room" className="h-6 w-full" />
            <FormFieldError name="room" />
          </FormFieldContainer>

          <FormFieldContainer className="flex-1 gap-0">
            <FormFieldLabel className="pb-[3px]">Status</FormFieldLabel>
            <SelectInput
              options={ROOM_STATUSES || []}
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

export { AddNewRoomForm, type SchemaType }
