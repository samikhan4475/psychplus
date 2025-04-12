import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, LoadingPlaceholder } from '@/components'
import { ActionResult } from '@/types'
import { addTemplateAction, editTemplateAction } from '../actions'
import { useStore } from '../store'
import { Template } from '../types'
import { handleUploadReport } from '../utils'
import {
  addTemplateSchema,
  AddTemplateSchemaType,
  EditTemplateSchemaType,
} from './schema'
import { TemplateFormFields } from './template-form'

interface AddTemplateFormProps {
  onClose?: () => void
}

const AddTemplateForm = ({ onClose }: AddTemplateFormProps) => {
  const [loading, setLoading] = useState(false)
  const [templateData, setTemplateData] =
    useState<EditTemplateSchemaType | null>(null)

  const form = useForm<AddTemplateSchemaType>({
    resolver: zodResolver(addTemplateSchema),
    defaultValues: {
      displayName: '',
      shortName: '',
      reportCategoryCode: '',
      parameters: [],
      isAdhocAllowed: false,
      permittedRoles: [],
    },
    mode: 'onChange',
  })

  const fetchTemplates = useStore((state) => state.fetchTemplates)
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate)

  const onSubmit: SubmitHandler<AddTemplateSchemaType> = async (data) => {
    setLoading(true)

    const { definitionPayloadUrl, ...payload } = data

    let response: ActionResult<Template> | null = null
    if (!templateData) {
      response = await addTemplateAction(payload)
    } else {
      const updatedTemplateData = updateExistingTemplateData(
        templateData,
        payload,
      )
      setTemplateData(updatedTemplateData)

      response = await editTemplateAction({
        templateId: templateData.id || '',
        data: updatedTemplateData,
      })
    }

    if (response.state === 'success') {
      setTemplateData(response.data)
      const uploadSuccess = await handleUploadReport(
        definitionPayloadUrl,
        response.data?.id ?? '',
        true,
      )
      if (!uploadSuccess) {
        setLoading(false)
        return
      }
      toast.success('Template updated successfully!')
      fetchTemplates()
      setSelectedTemplate(null)
      if (onClose) onClose()
    } else {
      toast.error(
        response.error ??
          'There was a problem saving your changes. Please try again.',
      )
    }
    setLoading(false)
  }

  function updateExistingTemplateData(
    original: EditTemplateSchemaType,
    updated: Partial<AddTemplateSchemaType>,
  ): EditTemplateSchemaType {
    return {
      ...original,
      ...updated,
      parameters: updated.parameters
        ? updated.parameters.map((param, i) => {
            const updatedParam = {
              ...param,
              reportTemplateId: original.parameters?.[0]?.reportTemplateId,
            }

            if (!param.id && original.parameters?.[i]?.id) {
              updatedParam.id = original.parameters?.[i]?.id
            }

            return updatedParam
          })
        : original.parameters,
      permittedRoles: updated.permittedRoles ?? original.permittedRoles,
    }
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
            className="bg-pp-gray-4 absolute z-10 bg-opacity-30"
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

export { AddTemplateForm }
