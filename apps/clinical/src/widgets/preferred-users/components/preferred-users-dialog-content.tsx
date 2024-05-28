import { useState, useEffect } from 'react'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { UploadIcon } from '@radix-ui/react-icons'
import {UploadImageIcon} from '../../../components/icons';
import { preferedUserUpload } from '../api'

const PreferredUsersDialogContent = () => {
  const [uploadedFile, setUploadedFile] = useState('Drag the file here or browse for the file upload');
  const [file, setFile] = useState(null);
  const [paramID, setParamID] = useState<string | null>(null);
  
  const setUploadedFileName = (e:any) => {
    const fullPath = e.target.value;
    const parts = fullPath.split("\\");
    const fileName = parts[parts.length - 1];
    
    setUploadedFile(fileName);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    if (idParam) {
      setParamID(idParam);
    }
  }, []);

  const onProceed = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);

    preferedUserUpload({
      partnerId: paramID,
      file: formData
    })
      .then(() => {
        console.log('Proceeded')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <Flex align="center" justify="center" className="h-[calc(100%-20px)] relative">
      <Box className="w-80 relative overflow-hidden">
        <Text className="text-[20px] mb-[20px] text-[#151B4A] font-[400]">Let’s collect your User Date</Text>
        <Flex 
          align="center" justify="center" direction="column"
          className="border border-[#BEBEBE] border-dashed w-full h-[257px] rounded-[20px] px-[40px] mb-[19px] mt-[20px]"
        >
          <UploadImageIcon />

          <Text align="center" className="text-[14px] text-[#151B4A] mt-[14px] block w-full">
            {uploadedFile}
          </Text>

          <input 
            type="file" 
            onChange={setUploadedFileName}
            className="absolute w-full h-full z-10 cursor-pointer opacity-0" />
        </Flex>

        <Flex align="center" justify="center" className="cursor-pointer">
          <UploadIcon width="16px" />
          <Text className="font-bold text-[16px] text-black">Upload</Text>
        </Flex>
      </Box>

      <Flex align="center" justify="end" className="absolute bottom-0 left-0 right-0" gap="3">
        <Dialog.Close>
          <Button variant="outline" className="cursor-pointer border-[#9E9898]" >
            Cancel
          </Button>
        </Dialog.Close>

        <Button color="indigo" highContrast className="cursor-pointer" onClick={onProceed}>
          Proceed
        </Button>
      </Flex>
    </Flex>
  )
}

export { PreferredUsersDialogContent }
