'use client'

import { FormTextInput } from '@psychplus/form'
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { SchemaType } from './components/add-claim-form'

const Diagnosis = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  return (
    <>
      <Flex align="center" gap="2">
        <FormTextInput
          type="text"
          label=""
          className="w-80"
          placeholder="ICD-10 Codes"
          data-testid="add-fee-schedule-name-input"
          {...form.register('name')}
        />
        <Box>
          <Button className="ml-2 h-[36px] bg-[#1b4594]">
            <MagnifyingGlassIcon />
          </Button>
        </Box>
      </Flex>

      <Flex align="center" justify="start" gap="2" mt="2">
        <Box className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2">
          <Flex align="center" justify="center" gap="2">
            <Text>1. F90.9 </Text>
            <Cross1Icon />
          </Flex>
        </Box>

        <Box className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2">
          <Flex align="center" justify="center" gap="2">
            <Text>2. F90.9 </Text>
            <Cross1Icon />
          </Flex>
        </Box>
        <Box className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2">
          <Flex align="center" justify="center" gap="2">
            <Text>3. F90.9 </Text>
            <Cross1Icon />
          </Flex>
        </Box>

        <Box className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2">
          <Flex align="center" justify="center" gap="2">
            <Text>4. F90.9 </Text>
            <Cross1Icon />
          </Flex>
        </Box>

        <Box className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2">
          <Flex align="center" justify="center" gap="2">
            <Text>5. F90.9 </Text>
            <Cross1Icon />
          </Flex>
        </Box>

        <Box className="rounded-[20px] border-2 border-[#acddfa] bg-[#bee4fa1a] px-2">
          <Flex align="center" justify="center" gap="2">
            <Text>6. F90.9 </Text>
            <Cross1Icon />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export { Diagnosis }

