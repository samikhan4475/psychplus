import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { Practice } from '../types'
import { defaultValues } from './default-values'
import { OrganizationSelect } from './organization-select'
import { PracticesListTable } from './practices-list-table'
import { schema, type SchemaType } from './schema'
import { SearchAddPracticeSelect } from './search-add-practice'
import { SubmitFormButton } from './submit-form-button'

interface FormProps {
  data: Practice
  onClose: (open: boolean) => void
}

const OrganizationStaffForm = ({ data, onClose }: FormProps) => {
  const { id } = useParams<{ id: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(data),
  })

  const onSave = async () => {
    onClose(false)
    search({
      staffuserId: parseInt(id),
    })
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <OrganizationSelect />
        <Box className="border-pp-gray-8 mb-2 mt-2 gap-3 rounded-[4px] border p-2">
          <SearchAddPracticeSelect />
          <PracticesListTable data={data} />
        </Box>
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { OrganizationStaffForm, type SchemaType }
