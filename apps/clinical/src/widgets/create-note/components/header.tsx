import { useRouter } from 'next/navigation'
import { UploadIcon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import { PrinterIcon, SaveIcon, SignIcon } from '@/components/icons'

const secondaryButtonClasses =
  '[box-shadow:inset_0_0_0.4px_1px_#DDDDE3] text-[12px] h-6 text-[#000000]'

const Header = () => {
  const router = useRouter()

  return (
    <Flex
      justify="between"
      align="center"
      className="px-2 py-1 border-b border-[#dfe3ed]"
    >
      <Flex className="gap-x-[11px]" align="center">
        <IconButton
          onClick={() => router.back()}
          className={cn(secondaryButtonClasses, '[box-shadow:none]')}
          variant="outline"
        >
          <ChevronLeft width={24} height={24} />
        </IconButton>
        <Text className="text-[20px] font-[600]">Create Note</Text>
      </Flex>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <Button className={secondaryButtonClasses} variant="outline">
          <PrinterIcon />
          Print
        </Button>
        <Button className={secondaryButtonClasses} variant="outline">
          clear
        </Button>
        <Button className={secondaryButtonClasses} variant="outline">
          <UploadIcon />
          Upload
        </Button>
        <Button className={secondaryButtonClasses} variant="outline">
          <SaveIcon fill="black" />
          Save
        </Button>
        <Button className="h-6 bg-[#151B4A] text-[12px] text-[#FFF]">
          <SignIcon />
          Sign
        </Button>
      </Flex>
    </Flex>
  )
}

export { Header }
