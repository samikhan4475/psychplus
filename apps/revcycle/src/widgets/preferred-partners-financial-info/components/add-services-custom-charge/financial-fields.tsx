'use client'

import React from 'react'
import { Box, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { SchemaType } from './add-services-custom-charge-form'

interface FinancialFieldsProps {
  name: string
}

const FinancialFields = ({
  name,
  children,
}: React.PropsWithChildren<FinancialFieldsProps>) => {
  return (
    <>
      <Box className="col-span-1 flex-1">
        <Text>{name}</Text>
      </Box>
      <Box className="flex-3 col-span-3 justify-end">
        <Grid columns="3" gap="2" className="col-span-1">
          <Flex className="col-span-1 flex-1">
            <Text className="pr-[5px] pt-[5px] text-[#194595]">Due PT</Text>
            <Box className="justify-end">
              <TextField.Root
                disabled={true}
                type="text"
                placeholder="$0.00"
                size="1"
                required={false}
                className="h-[30px] w-[60px] text-[14px]"
              />
            </Box>
          </Flex>
          {children}
        </Grid>
      </Box>
    </>
  )
}

export { FinancialFields }
