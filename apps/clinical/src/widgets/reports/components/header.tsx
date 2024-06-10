import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { Loader } from 'lucide-react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { CODE_NOT_SET, CodeSetIndex } from '@psychplus/codeset'
import { FormTableSelect } from '@psychplus/form'
import type { Parameter } from '@psychplus/reports'
import { generateReport } from '@psychplus/reports/api.client'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { useToast } from '@/providers'
import { useStore } from '../store'

// import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
// import { ChevronDownIcon } from '@radix-ui/react-icons'

interface HeaderProps {
  title: string
  parameters: Parameter[]
  onGenerate: (arg: string) => void
  isAdhocAllowed: boolean
}

const schema = z.object({
  reportTemplateParameters: z.array(
    z.object({
      id: z.string(),
      resourceStatus: z.string(),
      reportTemplateId: z.string(),
      reportParameterCode: z.string(),
      displayName: z.string().optional().default(''),
      value: z.string().optional().default(''),
    }),
  ),
})

type SchemaType = z.infer<typeof schema>

const Header = ({
  title,
  parameters,
  onGenerate,
  isAdhocAllowed,
  children,
}: React.PropsWithChildren<HeaderProps>) => {
  const parameterCodeSets = useStore((state) => state.parameterCodeSets)
  const codeSetIndex = useStore((state) => state.codeSetIndex)
  const [isGenerating, setIsGenerating] = useState<boolean>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      reportTemplateParameters: parameters,
    },
  })
  const { fields } = useFieldArray({
    control: form.control,
    name: 'reportTemplateParameters',
  })
  const { toast } = useToast()

  useEffect(() => {
    form.reset({ reportTemplateParameters: parameters })
  }, [parameters, form])

  const computeOptions = (codeSetIndex: CodeSetIndex, code: string) =>
    codeSetIndex[code]
      ?.filter((code) => code.code !== CODE_NOT_SET)
      ?.map((code) => ({
        value: code.code,
        label: code.display,
      })) ?? []

  const isSelectField = (code: string) =>
    !!parameterCodeSets
      .find((parameter) => parameter.code === code)
      ?.codeAttributes.find((attribute) => attribute.name === 'Selection')

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    try {
      const body =
        data.reportTemplateParameters
          ?.filter((param) => param.resourceStatus === 'Active')
          ?.map((param) => ({
            id: param.id,
            runValue: param.value ?? '',
          })) ?? []
      setIsGenerating(true)
      const report = await generateReport(
        data.reportTemplateParameters[0].reportTemplateId,
        body,
      )
      onGenerate(report)
      toast({
        title: 'Report generated successfully',
        type: 'success',
      })
    } catch (err) {
      console.log(err)
      alert((err as Error).message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Flex
        justify="between"
        align="center"
        className="mb-1 bg-[#FFF] px-2 py-1"
      >
        <Text className="text-[16px] font-[510] text-[#080A07]">{title}</Text>
        {children}
      </Flex>
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex
          direction="row"
          align="center"
          className="flex-wrap bg-[#FFF] px-2 py-2 gap-2"
        >
          {fields?.map((field, i) => {
            if (field.resourceStatus !== 'Active') return null
            return isSelectField(field.reportParameterCode) ? (
              <Flex key={field.id} className='gap-x-1' align="center">
                <Text as="span" className="text-[12px] font-[510]">
                  {field.displayName}
                </Text>
                <FormTableSelect
                  {...form.register(`reportTemplateParameters.${i}.value`)}
                  placeholder="Select"
                  buttonClassName="h-6"
                  value={form.watch(`reportTemplateParameters.${i}.value`)}
                  options={computeOptions(
                    codeSetIndex,
                    field.reportParameterCode,
                  )}
                />
              </Flex>
            ) : (
              <Flex key={field.id} className='gap-x-1' align="center">
                <Text as="span" className="text-[12px] font-[510]">
                  {field.displayName}
                </Text>
                <TextField.Input
                  className="h-6 py-0"
                  type={
                    field.reportParameterCode === 'DateOfBirth' ? 'date' : ''
                  }
                  {...form.register(`reportTemplateParameters.${i}.value`)}
                  placeholder={field.displayName}
                />
              </Flex>
            )
          })}
          <Button
            className="max-w-11 h-6 text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
            variant="outline"
            type="button"
            onClick={() => form.reset()}
          >
            Clear
          </Button>
          <Flex align="center" className="md:gap-x-[1px] lg:gap-x-[0.5px]">
            <Button
              type="submit"
              className={`h-6 bg-[#194595] text-[#FFF] ${
                isAdhocAllowed && 'cursor-pointer'
              }`}
              disabled={!isAdhocAllowed}
            >
              {isGenerating && (
                <Loader className="animate-spin p-1 text-accent-3" />
              )}
              Run Report
            </Button>
            {/* TODO: The code below and its corresponding imports will be included in future when backend work is completed */}

            {/* <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="h-6 rounded-l-[0px] bg-[#194595]">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>Run in the background</DropdownMenu.Item>
                <DropdownMenu.Item>Schedule Report</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root> */}
          </Flex>
        </Flex>
      </FormContainer>
    </>
  )
}

export { Header }
