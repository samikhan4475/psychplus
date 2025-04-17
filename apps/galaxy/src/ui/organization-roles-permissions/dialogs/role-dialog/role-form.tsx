import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { addRoleAction } from '../../actions'
import { useStore } from '../../store'
import { DisplayNameField } from './display-name-field'
import { schema, type SchemaType } from './schema'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { SubmitFormButton } from './submit-form-button'
import { TitleField } from './title-field'

interface FormProps {
  onCloseModal: (open: boolean) => void
}

const RoleForm = ({ onCloseModal }: FormProps) => {
  const { id } = useParams<{ id: string }>()
  const search = useStore((state) => state.search)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  const onSave = async (formData: SchemaType) => {
    const response = await addRoleAction({
      ...formData,
      organizationId: id ?? '',
    })
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success('Record has been successfully saved.')
    onCloseModal(false)
    search({
      organizationId: id ?? '',
    })
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="4" className="mb-2 mt-2 gap-3">
          <TitleField />
          <StaffTypeSelect />
          <DisplayNameField />
          <StatusSelect />
        </Grid>
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { RoleForm, type SchemaType }
