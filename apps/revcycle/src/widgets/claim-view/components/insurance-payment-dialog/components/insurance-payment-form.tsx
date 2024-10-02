import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormSelect, validate } from '@psychplus/form'
import { TextArea } from '@psychplus/ui/text-area'
import {
  createInsurancePayment,
  createInsurancePaymentAttachments,
  getInsurancePayers,
  updateInsurancePayment,
} from '../../../api.client'
import { useStore } from '../../../store'
import { PdfFileIconSvg } from '../../../svg'
import {
  InsurancePayment,
  InsurancePaymentRecordPayload,
  PaymentAttachments,
} from '../../../types'
import PatientSearch from '../../submission-table/patient-search'
import DateFieldLabel from './date-field'
import TextFieldLabel from './text-field'

const schema = z.object({
  id: validate.anyString,
  insuranceName: validate.anyString.optional(),
  paymentMethod: validate.requiredString,
  checkNumber: validate.anyString.optional(),
  amount: validate.numberOnly,
  comments: validate.anyString.optional(),
  checkDate: validate.requiredString,
  receivedDate: validate.requiredString,
  depositDate: validate.requiredString,
})
type SchemaType = z.infer<typeof schema>

const InsurancePaymentForm = ({
  data,
  isEdit = false,
}: {
  isEdit?: boolean
  data?: InsurancePayment | null
}) => {
  const {
    setInsurancePaymentEditData,
    setInsurancePaymentRefetchData,
    setInsurancePaymentModalOpen,
    paymentMethodCodeSets,
    practiceList,
  } = useStore((state) => ({
    setInsurancePaymentEditData: state.setInsurancePaymentEditData,
    setInsurancePaymentRefetchData: state.setInsurancePaymentRefetchData,
    setInsurancePaymentModalOpen: state.setInsurancePaymentModalOpen,
    paymentMethodCodeSets: state.paymentMethodCodeSets,
    practiceList: state.practiceList,
  }))
  const [fileNamesList, setFileNamesList] = useState<PaymentAttachments[]>(
    data?.paymentAttachments || [],
  )
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [checkDate, setCheckDate] = useState<Date | undefined>()
  const [receivedDate, setReceivedDate] = useState<Date | undefined>()
  const [depositDate, setDepositDate] = useState<Date | undefined>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id || '',
      insuranceName: data?.insuranceName || '',
      paymentMethod: data?.paymentMethod || '',
      amount: data?.amount || '',
      checkNumber: data?.checkNumber || '',
      comments: data?.comments || '',
      checkDate: data?.checkDate ? new Date(data.checkDate).toISOString() : '',
      receivedDate: data?.receivedDate
        ? new Date(data.receivedDate).toISOString()
        : '',
      depositDate: data?.depositDate
        ? new Date(data.depositDate).toISOString()
        : '',
    } as SchemaType,
  })

  useEffect(() => {
    if (checkDate) {
      form.setValue('checkDate', checkDate.toISOString())
    }
    if (receivedDate) {
      form.setValue('receivedDate', receivedDate.toISOString())
    }
    if (depositDate) {
      form.setValue('depositDate', depositDate.toISOString())
    }
  }, [checkDate, receivedDate, depositDate])

  const onSubmit: SubmitHandler<SchemaType> = async (formData: {
    [key: string]: any
  }) => {
    if (fileNamesList.length === 0) {
      alert('Please upload at least one file')
      return
    }

    const formDataObj = new FormData()
    Array.from(fileNamesList).forEach((item) => {
      if (item.file) formDataObj.append('files', item.file)
    })

    const attachmentFiles: PaymentAttachments[] = []
    if (data?.id) {
      Array.from(fileNamesList).forEach((item) => {
        if (!item.isNewUpload) attachmentFiles.push(item)
      })
    }

    const reqPayload: InsurancePaymentRecordPayload = {
      insuranceName: formData.insuranceName,
      paymentMethod: formData.paymentMethod,
      checkNumber: formData.checkNumber,
      amount: formData.amount,
      comments: formData.comments,
      checkDate: formData.checkDate,
      receivedDate: formData.receivedDate,
      depositDate: formData.depositDate,
      paymentAttachments: attachmentFiles,
      practiceId: practiceList[0]?.id ?? '', // We are using first practice as default
    }

    if (data?.id) {
      reqPayload.id = data.id
    }

    try {
      const response =
        isEdit && data && data.id
          ? await updateInsurancePayment(reqPayload, data?.id)
          : await createInsurancePayment(reqPayload)

      if (response) {
        if (
          fileNamesList.length > 0 &&
          formDataObj.getAll('files').length > 0
        ) {
          await createInsurancePaymentAttachments(formDataObj, response.id)
        }

        setInsurancePaymentEditData(null)
        setInsurancePaymentModalOpen(false)
        setFileNamesList([])
        form.reset()
        alert('Record has been saved successfully')
      }
    } catch (error) {
      let message = ''
      if (typeof error === 'string') {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      } else {
        message = JSON.stringify(error)
      }
      alert(`ERROR: ${message}`)
    } finally {
      setInsurancePaymentRefetchData(true)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const setUploadedFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setFileNamesList((prevFiles) => [
        ...prevFiles,
        {
          id: `${prevFiles.length + 1}`,
          fileName: file.name,
          isNewUpload: true,
          file: file,
        },
      ])
    }
  }

  const onRemoveFile = (id: number | string) => {
    setFileNamesList((prevFiles) =>
      prevFiles.filter((file) => {
        if (file.isNewUpload) {
          return file.id !== id
        } else {
          if (file.id === id) {
            file.recordStatus = 'Deleted'
          }
          return true
        }
      }),
    )
  }

  const onInsuranceSelect = (id: string, value: string) => {
    form.setValue('insuranceName', value)
  }

  const getRecords = async (searchSearch: string) => {
    try {
      const response = await getInsurancePayers(searchSearch)

      const mappedResults = response.map((record) => ({
        id: String(record.id),
        fullName: record.name,
      }))

      return mappedResults
    } catch (error) {
      return []
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" className="rounded border border-[#F3F3F3]">
        <Flex gap="4" mb="4" className="bg-[#EEF2F6] p-1">
          <Text as="label" size="2" weight="bold">
            Insurance Details
          </Text>
        </Flex>

        <Box className="p-1">
          <Grid columns="2" gap="4" className="col-span-1">
            <Box className="col-span-1 flex-1">
              <Text>Insurance Name</Text>
              <PatientSearch
                onPatientSelect={onInsuranceSelect}
                reset={false}
                getRecords={getRecords}
                editValue={form.watch('insuranceName')}
                placeholder="Search"
              />
            </Box>
            <Box className="col-span-1 flex-1">
              <FormSelect
                label="Payment Method"
                size="2"
                placeholder=""
                options={paymentMethodCodeSets}
                {...form.register('paymentMethod')}
                required={true}
              />
            </Box>
          </Grid>

          <Grid columns="2" gap="4" className="col-span-1">
            <Box className="col-span-1 flex-1">
              <TextFieldLabel
                error={form.formState?.errors?.checkNumber?.message}
                type="text"
                label="Check Number"
                disabled={!isEdit}
                register={form.register('checkNumber')}
                placeholder="123456"
              />
            </Box>
            <Box className="col-span-1 flex-1">
              <TextFieldLabel
                error={form.formState?.errors?.amount?.message}
                type="text"
                label="Amount"
                disabled={!isEdit}
                register={form.register('amount')}
                required={true}
                placeholder="123456700"
              />
            </Box>
          </Grid>

          <Grid columns="3" gap="4" className="col-span-1">
            <Box className="mt-[8px] flex flex-col items-start">
              <DateFieldLabel
                label="Check Date"
                error={form.formState?.errors?.checkDate?.message}
                date={
                  checkDate
                    ? checkDate
                    : data?.checkDate && new Date(data?.checkDate)
                }
                setDate={setCheckDate}
              />
            </Box>
            <Box className="mt-[8px] flex flex-col items-start">
              <DateFieldLabel
                label="Received Date"
                error={form.formState?.errors?.receivedDate?.message}
                date={
                  receivedDate
                    ? receivedDate
                    : data?.receivedDate && new Date(data?.receivedDate)
                }
                setDate={setReceivedDate}
              />
            </Box>
            <Box className="mt-[8px] flex flex-col items-start">
              <DateFieldLabel
                label="Deposit Date"
                error={form.formState?.errors?.depositDate?.message}
                date={
                  depositDate
                    ? depositDate
                    : data?.depositDate && new Date(data?.depositDate)
                }
                setDate={setDepositDate}
              />
            </Box>
          </Grid>

          <Grid columns="1" gap="4" className="col-span-1">
            <Box className="col-span-1 flex-1">
              <Text size="1" className="font-bold">
                Comments
              </Text>
              <Box>
                <TextArea size="3" {...form.register('comments')} />
              </Box>
            </Box>
          </Grid>
        </Box>
      </Flex>

      <Flex direction="column" className="rounded border border-[#F3F3F3]">
        <Flex gap="4" mb="4" className="bg-[#EEF2F6] p-1">
          <Text as="label" size="2" weight="bold">
            Attachments
          </Text>

          <input
            type="file"
            name="documents"
            id="uploader"
            ref={fileInputRef}
            onChange={setUploadedFileName}
            className="hidden"
            accept=".pdf"
          />

          <Button
            onClick={handleButtonClick}
            className="cursor-pointer bg-transparent text-[#000]"
            size="1"
            type="button"
          >
            <UploadIcon className="text-[#a4a7b0]" />
            Upload
          </Button>
        </Flex>

        <Box className="flex flex-wrap p-1">
          {fileNamesList.map((file) => {
            if (file.recordStatus === 'Deleted') {
              return null
            }

            return (
              <Box
                className="mt-0 w-full p-1 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3"
                key={file.id}
              >
                <Box className="rounded flex items-center justify-between border border-[#9E9898CC] p-1">
                  <span className="mr-1">
                    <PdfFileIconSvg />
                  </span>
                  <span className="text-gray-800 flex-1 truncate font-medium">
                    {file.fileName}
                  </span>
                  <Button
                    type="button"
                    className="rounded border-gray-300 hover:bg-gray-100 ml-2 border bg-[#fff] p-1 text-[#000]"
                    onClick={() => onRemoveFile(file.id)}
                  >
                    <Cross2Icon className="h-4 w-4" />
                  </Button>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Flex>

      <Flex gap="3" justify="end" mt="3">
        <Button
          size="3"
          type="submit"
          className=" cursor-pointer rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
        >
          Save
        </Button>
      </Flex>
    </Form>
  )
}

export { InsurancePaymentForm, type SchemaType }
