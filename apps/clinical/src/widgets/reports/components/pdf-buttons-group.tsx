import { Button, Flex } from '@radix-ui/themes'
import { PrinterIcon } from '@/components/icons'
// import { UploadIcon } from '@radix-ui/react-icons'
// import { ExcelIcon } from '@/components/icons/excel-icon'

const buttonStyles =
  'h-6 text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC] text-[12px]'

const PdfButtonsGroup = ({handlePrint}: {handlePrint: () => void}) => {
  return (
    <Flex className="w-full gap-x-2 bg-[#FFF] px-2 py-2" justify="end">
      <Button variant="outline" className={buttonStyles} onClick={handlePrint}>
        <PrinterIcon />
        Print
      </Button>
      {/* TODO: The code below and its corresponding imports will be included in future when backend work is completed */}

      {/* <Button variant="outline" className={buttonStyles}>
        <ExcelIcon />
        Import Excel
      </Button>
      <Button variant="outline" className={buttonStyles}>
        <UploadIcon />
        Export
      </Button> */}
    </Flex>
  )
}

export default PdfButtonsGroup
