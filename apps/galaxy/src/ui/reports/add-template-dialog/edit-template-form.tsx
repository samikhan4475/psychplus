import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, LoadingPlaceholder } from '@/components'
import { editTemplateAction } from '../actions'
import { useStore } from '../store'
import { handleUploadReport } from '../utils'
import { editTemplateSchema, EditTemplateSchemaType } from './schema'
import { TemplateFormFields } from './template-form'

interface EditTemplateFormProps {
  defaultValues?: EditTemplateSchemaType
  onClose?: () => void
}

const EditTemplateForm = ({
  defaultValues,
  onClose,
}: EditTemplateFormProps) => {
  const [loading, setLoading] = useState(false)

  const sortedParameters = defaultValues?.parameters?.sort((a, b) => {
    return (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  })

  const form = useForm<EditTemplateSchemaType>({
    resolver: zodResolver(editTemplateSchema),
    defaultValues: {
      ...defaultValues,
      parameters: sortedParameters,
    },
    mode: 'onChange',
  })

  const fetchTemplates = useStore((state) => state.fetchTemplates)
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate)

  const onSubmit: SubmitHandler<EditTemplateSchemaType> = async (data) => {
    setLoading(true)

    const { definitionPayloadUrl, ...payload } = data
    const editTemplateResponse = await editTemplateAction({
      templateId: defaultValues?.id || '',
      data: payload,
    })

    if (defaultValues?.id && definitionPayloadUrl) {
      const uploadSuccess = await handleUploadReport(
        definitionPayloadUrl,
        defaultValues.id,
        definitionPayloadUrl !== defaultValues.definitionPayloadUrl,
      )
      if (!uploadSuccess) {
        setLoading(false)
        return
      }
    }

    if (editTemplateResponse.state === 'success') {
      fetchTemplates()
      setSelectedTemplate(null)
      if (onClose) onClose()
    } else {
      toast.error(
        editTemplateResponse.error ??
          'There was a problem saving your changes. Please try again.',
      )
    }

    setLoading(false)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="relative">
      {loading ? (
        <>
          <Flex
            height="100%"
            align="center"
            justify="center"
            width="100%"
            className="bg-pp-gray-4 absolute  z-10 bg-opacity-30"
          >
            <LoadingPlaceholder />
          </Flex>
          <TemplateFormFields />
        </>
      ) : (
        <TemplateFormFields />
      )}
    </FormContainer>
  )
}

export { EditTemplateForm }
