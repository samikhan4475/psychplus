import Image from 'next/image'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { CreditCardTable } from '../credit-card-table'
import { useAddCreditCard } from './hooks'

const SelectCardPopupForm = () => {
  const { setIsDialogOpen } = useAddCreditCard()

  const addNewCard = () => {
    setIsDialogOpen(true)
  }

  return (
    <>
      <Flex direction="column" gap="4" mb="4">
        <Flex gap="4" className="rounded border border-[#F3F3F3] p-1">
          <Box className="flex-1">
            <Text as="p" className="mt-3 text-[14px] font-medium">
              <Text>We accept all major Credit & Debit Cards</Text>
            </Text>
          </Box>
          <Box className="right-0 top-0">
            <Image
              src="/revcycle/images/payment-methods.png"
              width="200"
              height="36"
              alt=""
            />
          </Box>
        </Flex>
      </Flex>

      <Flex direction="column" gap="4" mb="4">
        <CreditCardTable isOutSide />
      </Flex>

      <Flex gap="3" justify="end">
        <Button size="2" className="bg-[#101D46]" onClick={addNewCard}>
          Add Card
        </Button>
      </Flex>
    </>
  )
}

export { SelectCardPopupForm }
