import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { ParametersTable } from './parameters-table'
import { UploadButton } from '@psychplus/ui/upload-button'
import { TemplateTitle } from './template-title'
import { TemplateCode } from './template-code'
import { CategorySelector } from './category-selector'
import { DistributionGroupSelector } from './distribution-group-selector'
import { PermissionSelector } from './permission-selector'
import { ReportPermissionToggle } from './report-permission-toggle'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EVENT_TEMPLATE_CREATED, EventType } from '@psychplus/widgets/events'
import { createTemplate, uploadTemplateFile } from '@psychplus/reports/api.client'
import { validate } from '@psychplus/form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  displayName: validate.requiredString,
  reportCategoryCode: validate.requiredString,
  shortName: validate.requiredString,
  reportTemplateParameters: z.array(
    z.object({
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

const AddTemplateForm = () => {
  const { publish } = usePubsub()
  const [uploadedFile, setUploadedFile] = useState<File | undefined>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: '',
      shortName: '',
      reportCategoryCode: '',
      reportTemplateParameters: [],
      isAdhocAllowed: true,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const orderedParameters = data.reportTemplateParameters.map((parameter, i) => ({
      ...parameter,
      displayOrder: i,
    }))

    const response = {
      resourceStatus: 'Active',
      shortName: data.shortName,
      reportTemplateParameters: orderedParameters,
      displayName: data.displayName,
      reportCategoryCode: data.reportCategoryCode,
      isAdhocAllowed: data.isAdhocAllowed,
    }
    createTemplate(response)
      .then((res) => {
        publish(EVENT_TEMPLATE_CREATED)
        if (uploadedFile && res.id) {
          uploadTemplateFile(uploadedFile, res.id)
        }
      })
      .then(() => {
        publish(`${ADD_TEMPLATE_WIDGET}:${EventType.Closed}`)
      })
      .catch((err) => alert(err.message))
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className="gap-x-3.5">
        <Box className="w-[50%]">
          <TemplateTitle />
        </Box>
        <Box className="w-[25%]">
          <TemplateCode />
        </Box>
        <Box className="w-[25%]">
          <CategorySelector />
        </Box>
      </Flex>
      <ParametersTable />
      <DistributionGroupSelector />
      <PermissionSelector />
      <Flex className="w-full gap-x-3 text-[12px] mt-2">
        <Flex
          className="w-[37%] rounded-[4px] bg-[#F0F4FF] px-2 py-1.5 font-[510]"
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
          <ReportPermissionToggle />
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

export { AddTemplateForm, type SchemaType }
