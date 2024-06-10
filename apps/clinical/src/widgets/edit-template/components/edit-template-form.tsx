import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormSelect, FormSwitch, FormTextInput, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { MultiSelectDropdown } from '@psychplus/ui/multi-select-search-dropdown'
import { UploadButton } from '@psychplus/ui/upload-button'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EVENT_TEMPLATE_EDITED, EventType } from '@psychplus/widgets/events'
import { updateTemplate, uploadTemplateFile } from '@psychplus/reports/api.client'
import { useStore } from '@psychplus/reports/store'
import { Parameter, Template } from '@psychplus/reports'
import { ParametersTable } from './parameters-table'

const schema = z.object({
  displayName: validate.requiredString,
  reportCategoryCode: validate.requiredString,
  shortName: validate.requiredString,
  id: validate.requiredString,
  reportTemplateParameters: z.array(
    z.object({
      id: z.string().optional(),
      displayName: z.string(),
      reportParameterCode: z.string(),
      resourceStatus: z.string(),
      reportTemplateId: z.string().optional(),
      displayOrder: z.number().optional(),
    }),
  ).nonempty({ message: 'Add at least one parameter' }),
  isAdhocAllowed: z.boolean(),
})

type SchemaType = z.infer<typeof schema>

interface EditTemplateFormProps {
  template: Template
}

const EditTemplateForm = ({ template }: EditTemplateFormProps) => {
  const { publish } = usePubsub()
  const [uploadedFile, setUploadedFile] = useState<File | undefined>()
  const reportCategories = useStore((state) => state.reportCategories)
  const categoryOptions = reportCategories?.codes.map((code) => ({
    label: code.displayName,
    value: code.code,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: template.id,
      displayName: template.displayName,
      shortName: template.shortName,
      reportCategoryCode: template.reportCategoryCode,
      reportTemplateParameters: template.reportTemplateParameters,
      isAdhocAllowed: template.isAdhocAllowed,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const uniqueParameters = [] as Parameter[]
    data.reportTemplateParameters.forEach(param => {
      const index = uniqueParameters.findIndex(p => p.reportParameterCode === param.reportParameterCode)
      if(index >=0) {
        uniqueParameters.splice(index, 1, {...param, id: uniqueParameters[index].id})
      } else {
        uniqueParameters.push(param)
      }
    })
    const payload = {...data, reportTemplateParameters: uniqueParameters, resourceStatus: 'Active'}
    updateTemplate(payload, payload.id)
    .then((res) => {
      publish(EVENT_TEMPLATE_EDITED)
      if (uploadedFile && res.id) {
        uploadTemplateFile(uploadedFile, res.id)
      }
    })
    .then(() => {
      publish(`${EDIT_TEMPLATE_WIDGET}:${EventType.Closed}`)
    })
    .catch((err) => alert(err.message))
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className="gap-x-3.5">
        <Box className="w-[50%]">
          <FormTextInput
            label="Add Title"
            required
            {...form.register('displayName')}
            className="h-7 text-[12px]"
            placeholder="Add Template Name"
          />
        </Box>
        <Box className="w-[25%]">
          <FormTextInput
            label="Code"
            required
            {...form.register('shortName')}
            className="h-7 text-[12px]"
            placeholder="Add Code"
          />
        </Box>
        <Box className="w-[25%]">
          <FormSelect
            label="Category"
            required
            buttonClassName="h-7 text-[12px]"
            placeholder="select"
            {...form.register('reportCategoryCode')}
            options={categoryOptions}
          />
        </Box>
      </Flex>
      <ParametersTable />
      <MultiSelectDropdown
        options={[
          {
            label: 'Option1',
            value: 'Option1',
          },
          {
            label: 'Option2',
            value: 'Option2',
          },
          {
            label: 'Option3',
            value: 'Option3',
          },
          {
            label: 'Option4',
            value: 'Option4',
          },
        ]}
        label="Distribution Group"
        disabled
      />
      <MultiSelectDropdown
        options={[
          {
            label: 'Option1',
            value: 'Option1',
          },
          {
            label: 'Option2',
            value: 'Option2',
          },
          {
            label: 'Option3',
            value: 'Option3',
          },
          {
            label: 'Option4',
            value: 'Option4',
          },
        ]}
        label="Permission to View"
        disabled
      />
      <Flex className="w-full gap-x-3 text-[12px] mt-2">
        <Flex
          className="w-[37%] cursor-pointer rounded-[4px] bg-[#F0F4FF] px-2 py-1.5 font-[510]"
          align="center"
          justify="between"
        >
          Upload File
          {uploadedFile ? (
            <Flex
              className="h-6 max-w-[60%] rounded-[4px] bg-[#FFF] px-2 py-1 text-[12px] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
              gap="2"
              align="center"
            >
              <Cross2Icon
                color="red"
                className="cursor-pointer"
                onClick={() => setUploadedFile(undefined)}
              />
              <Text className="truncate">{uploadedFile.name}</Text>
            </Flex>
          ) : (
            <UploadButton
              className="h-6 bg-[#FFF] text-[12px] text-[#000000]"
              onFileChange={setUploadedFile}
            />
          )}
        </Flex>
        <Flex
          className="w-[40%] rounded-[4px] bg-[#F0F4FF] px-2 py-1.5 font-[510]"
          justify="between"
          align="center"
        >
          Allow users to Run this Report
          <FormSwitch
            color="indigo"
            highContrast
            {...form.register('isAdhocAllowed')}
          />
        </Flex>
      </Flex>
      <Button
        variant="outline"
        className="ml-auto h-8 cursor-pointer bg-[#151B4A] text-[14px] text-[#FFF]"
      >
        Save
      </Button>
    </FormContainer>
  )
}

export { EditTemplateForm, type SchemaType }
