import { useRef } from 'react'
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { Box, Button, Text } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { PdfIcon } from '@/components/icons'
import { SchemaType } from './insurance-payment-form'

const Attachments = () => {
  const form = useFormContext<SchemaType>()
  const { control, register } = form
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'attachments',
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file, index) => {
        append({
          id: `${fields.length + index + 1}`,
          fileName: file.name,
          file: file,
          isNewUpload: true,
          recordStatus: 'New',
        })
      })
      // Reset the input value to allow uploading the same file again if needed
      event.target.value = ''
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onRemoveFile = (index: number) => {
    const field = fields[index]
    if (!field.isNewUpload) {
      update(index, { ...field, recordStatus: 'Deleted' })
    } else {
      remove(index)
    }
  }

  return (
    <Box className="border-pp-grey ml-1 mr-1 mt-2 rounded-[4px] border">
      <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
        <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
          Attachments
        </Text>
        <input
          type="file"
          name="attachments"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf"
          multiple
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
      </Box>
      <Box className="flex flex-wrap p-1">
        {fields.map((field, index) => {
          if (field.recordStatus === 'Deleted') {
            return null
          }

          return (
            <Box
              className="mt-0 w-full p-1 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3"
              key={field.id}
            >
              <Box className="rounded border-pp-grey flex items-center justify-between border p-1">
                <span className="mr-1">
                  <PdfIcon width="20" height="30" />
                </span>
                <span className="text-gray-400 flex-1 truncate font-medium">
                  {field.fileName}
                </span>
                <Button
                  type="button"
                  className="rounded border-pp-grey hover:bg-gray-100 bg-white text-pp-black-3 ml-2 border p-1"
                  onClick={() => onRemoveFile(index)}
                >
                  <Cross2Icon className="h-4 w-4" />
                </Button>
              </Box>
              {!field.isNewUpload && (
                <input
                  type="hidden"
                  {...register(`attachments.${index}.recordStatus`)}
                />
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export { Attachments }
