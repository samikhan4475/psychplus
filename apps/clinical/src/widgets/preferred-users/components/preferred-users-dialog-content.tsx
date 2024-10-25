import { useEffect, useState } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { UploadImageIcon } from '../../../components/icons'
import { preferedUserUpload } from '../api'

const PreferredUsersDialogContent = () => {
  const [uploadedFile, setUploadedFile] = useState(
    'Drag the file here or browse for the file upload',
  )
  const [file, setFile] = useState(null)
  const [paramID, setParamID] = useState<string | null>(null)

  const setUploadedFileName = (e: any) => {
    const fullPath = e.target.value
    const parts = fullPath.split('\\')
    const fileName = parts[parts.length - 1]

    setUploadedFile(fileName)
    setFile(e.target.files[0])
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')
    if (idParam) {
      setParamID(idParam)
    }
  }, [])

  const onProceed = async () => {
    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('excelFile', file)

    preferedUserUpload({
      partnerId: paramID,
      file: formData,
    })
      .then(() => {
        console.log('Proceeded')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <Flex
      align="center"
      justify="center"
      className="relative h-[calc(100%-20px)]"
    >
      <Box className="relative w-80 overflow-hidden">
        <Text className="mb-[20px] text-[20px] font-[400] text-[#151B4A]">
          Let’s collect your User Date
        </Text>
        <Flex
          align="center"
          justify="center"
          direction="column"
          className="mb-[19px] mt-[20px] h-[257px] w-full rounded-[20px] border border-dashed border-[#BEBEBE] px-[40px]"
        >
          <UploadImageIcon />

          <Text
            align="center"
            className="mt-[14px] block w-full text-[14px] text-[#151B4A]"
          >
            {uploadedFile}
          </Text>

          <input
            type="file"
            onChange={setUploadedFileName}
            className="absolute z-10 h-full w-full cursor-pointer opacity-0"
          />
        </Flex>

        <Flex align="center" justify="center" className="cursor-pointer">
          <UploadIcon width="16px" />
          <Text className="text-black text-[16px] font-bold">Upload</Text>
        </Flex>
      </Box>

      <Flex
        align="center"
        justify="end"
        className="absolute bottom-0 left-0 right-0"
        gap="3"
      >
        <Dialog.Close>
          <Button variant="outline" className="cursor-pointer border-[#9E9898]">
            Cancel
          </Button>
        </Dialog.Close>

        <Button
          color="indigo"
          highContrast
          className="cursor-pointer"
          onClick={onProceed}
        >
          Proceed
        </Button>
      </Flex>
    </Flex>
  )
}

export { PreferredUsersDialogContent }
