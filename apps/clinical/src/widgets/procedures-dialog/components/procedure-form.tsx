import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSubmitButton, FormTextInput, validate } from '@psychplus/form'
import { Procedure } from '@psychplus/procedures'
import {
  createProcedure,
  updateProcedure,
} from '@psychplus/procedures/api.client'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useToast } from '@psychplus/ui/toast-provider'
import { useStore } from '@/widgets/procedures-list/store/combine'
import { IcdSnomedSearchDropdown } from '.'

const schema = z.object({
  procedureDate: validate.anyString,
  procedureCode: validate.requiredString,
  symptomCodesetUsed: validate.anyString,
  comments: validate.anyString,
  targetSiteCode: validate.requiredString,
  targetSiteDescription: validate.requiredString,
  procedureCodeDescription: validate.requiredString,
})

export type SchemaType = z.infer<typeof schema>

type procedureFormProps = {
  data?: Procedure
  isEdit?: boolean
  closeDialog: () => void
}

const ProcedureForm = ({ data, isEdit, closeDialog }: procedureFormProps) => {
  const DATE_FORMAT = 'yyyy-MM-dd'
  const { patientId, noteId, procedures, setProcedures } = useStore()

  const { toast } = useToast()

  const toggleGroupItemClasses =
    'font-bold text-3 data-[state=on]:bg-[#dce8ff] data-[state=on]:font-regular'

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      procedureCode: data?.procedureCode ?? '',
      procedureCodeDescription: data?.procedureCodeDescription ?? '',
      targetSiteCode: data?.targetSiteCode ?? '',
      targetSiteDescription: data?.targetSiteDescription ?? '',
      comments: data?.comments ?? '',
      symptomCodesetUsed: data?.symptomCodesetUsed ?? 'CPT',
      procedureDate: data?.procedureDate
        ? format(new Date(data?.procedureDate), DATE_FORMAT)
        : format(new Date(), DATE_FORMAT),
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()

    const payload = {
      ...formData,
      patientId: patientId,
      noteId: noteId,
      ...(isEdit && { id: data?.id }),
    }

    try {
      if (isEdit) {
        const res = await updateProcedure(payload)
        const updatedProcedures = procedures.map((problem: { id?: string }) =>
          problem.id === data?.id ? res : problem,
        )

        setProcedures(flattenProcedure(updatedProcedures))
        toast({ type: 'success', title: 'Updated' })
      } else {
        const res = await createProcedure(payload)
        setProcedures([...procedures, res])
        toast({ type: 'success', title: 'Created' })
      }
      closeDialog()
    } catch (err: any) {
      toast({ type: 'error', title: err.message })
    }
  }

  const flattenProcedure = (problems: (Procedure | Procedure[])[]) => {
    return problems.flatMap((problem) =>
      Array.isArray(problem) ? problem : [problem],
    )
  }

  return (
    <Toast.Provider>
      <Box className=" rounded-4 border border-gray-7">
        <Box className="rounded-md rounded-t-4 bg-[#F3F4F6]">
          <Flex className="items-center justify-between p-2">
            <Text>Procedure Search</Text>
            <ToggleGroup.Root
              type="single"
              defaultValue={data?.symptomCodesetUsed || 'CPT'}
              className="rounded-4 border border-gray-7"
              onValueChange={(value) => {
                form.setValue('symptomCodesetUsed', value)
                form.setValue('procedureCode', '')
                form.setValue('procedureCodeDescription', '')
              }}
            >
              <Flex>
                <ToggleGroup.Item
                  value="CPT"
                  className={toggleGroupItemClasses + ' h-[30px] w-[100px]'}
                >
                  <Text>CPT</Text>
                </ToggleGroup.Item>
                <Box className="border-r border-gray-7"></Box>
                <ToggleGroup.Item
                  value="Snomed"
                  className={
                    toggleGroupItemClasses + ' h-[30px] w-[100px] rounded-tr-4'
                  }
                >
                  <Text>Snomed</Text>
                </ToggleGroup.Item>
              </Flex>
            </ToggleGroup.Root>
          </Flex>
        </Box>
        <Box className="p-2">
          <Text>Code</Text>
          <IcdSnomedSearchDropdown form={form} />
        </Box>
      </Box>

      <FormContainer onSubmit={onSubmit} form={form}>
        <Box className=" rounded-4 border border-gray-7" mt="2">
          <Box className="rounded-md rounded-t-4 bg-[#F3F4F6]">
            <Box className="p-2">
              <Text>Procedure Details</Text>
            </Box>
          </Box>
          <Box className="p-2">
            <Box className="mt-4 grid grid-cols-6 gap-4 font-light">
              <Box className="col-span-2">
                <FormTextInput
                  className="border border-[lightgray] bg-[white]"
                  readOnly
                  placeholder="XXXXXX"
                  label={'Code'}
                  value={form.watch('procedureCode')}
                  {...form.register('procedureCode')}
                />
              </Box>
              <Box className="col-span-4">
                <FormTextInput
                  className="border border-[lightgray] bg-[white]"
                  readOnly
                  placeholder="Select Reason"
                  label={'Description'}
                  value={form.watch('procedureCodeDescription')}
                  {...form.register('procedureCodeDescription')}
                />
              </Box>
              <Box className="col-span-2">
                <FormTextInput
                  placeholder="XXXXXX"
                  label={'Target Site Code'}
                  value={form.watch('targetSiteCode')}
                  {...form.register('targetSiteCode')}
                />
              </Box>
              <Box className="col-span-4">
                <FormTextInput
                  placeholder="Description"
                  label={'Target Site Description'}
                  value={form.watch('targetSiteDescription')}
                  {...form.register('targetSiteDescription')}
                />
              </Box>
              <Box className="col-span-2">
                <FormTextInput
                  type="date"
                  label="Date"
                  max="9999-12-31"
                  value={
                    form.watch('procedureDate') ??
                    format(new Date(), DATE_FORMAT)
                  }
                  data-testid="expiration-date"
                  {...form.register('procedureDate')}
                  className="mr-4"
                />
              </Box>
              <Box className="col-span-4">
                <FormTextInput
                  type="comments"
                  label="Comments"
                  placeholder="Comments"
                  value={form.watch('comments')}
                  {...form.register('comments')}
                  className="mr-4"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { ProcedureForm }
