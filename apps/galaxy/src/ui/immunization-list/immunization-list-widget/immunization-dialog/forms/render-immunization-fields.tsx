'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ImmunizationTypeEnum } from '../../types'
import {
  AdministatedDropdown,
  CompletionStatusField,
  CvxCodeField,
  CvxDescriptionField,
  DatetimeAdministeredField,
  DoseField,
  ExpiryDField,
  FundingSourceField,
  InformationCodeField,
  LotNumberField,
  ManufactureCodeField,
  ManufactureDescField,
  NdcCodeField,
  OrderingProviderField,
  ReasonCodeField,
  RouteField,
  SiteField,
  UnitField,
  VaccineField,
} from './index'

interface Props {
  entryType: ImmunizationTypeEnum | keyof typeof ImmunizationTypeEnum
}

const RenderImmunizationFields = ({ entryType }: Props) => {
  if (
    entryType === ImmunizationTypeEnum.Refusal ||
    entryType === ImmunizationTypeEnum.Historical
  ) {
    return (
      <Flex className="bg-whiteA-12 mt-2 w-[530px]" gap="2" direction="column">
        <Flex gap="1" className="w-full">
          <Box className="w-1/2">
            <CvxCodeField />
          </Box>
          <Box className="w-1/2">
            <CvxDescriptionField />
          </Box>
        </Flex>
        <Flex gap="1" className="w-full">
          <Box className="w-1/2">
            {entryType === ImmunizationTypeEnum.Historical ? (
              <InformationCodeField />
            ) : (
              <ReasonCodeField />
            )}
          </Box>
          <Box className="w-1/2">
            <DatetimeAdministeredField />
          </Box>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex className="bg-whiteA-12 mt-2 w-[530px]" gap="2" direction="column">
      <Flex gap="1" className="w-full">
        <Box className="w-1/2">
          <CvxCodeField />
        </Box>
        <Box className="w-1/2">
          <CvxDescriptionField />
        </Box>
      </Flex>
      <Flex align="end" gap="2">
        <Box className="w-1/2">
          <ManufactureCodeField />
        </Box>
        <Box className="w-1/2">
          <ManufactureDescField />
        </Box>
      </Flex>
      <Flex gap="2">
        <Box className="w-1/4">
          <DoseField />
        </Box>
        <Box className="w-1/4">
          <UnitField />
        </Box>
        <Box className="w-1/4">
          <NdcCodeField />
        </Box>
        <Box className="w-1/4">
          <LotNumberField />
        </Box>
      </Flex>
      <Flex gap="2">
        <Box className="w-1/2">
          <VaccineField />
        </Box>
        <Box className="w-1/4">
          <ExpiryDField />
        </Box>
        <Box className="w-1/4">
          <FundingSourceField />
        </Box>
      </Flex>
      <Flex gap="2">
        <Box className="w-1/2">
          <OrderingProviderField />
        </Box>
        <Box className="w-1/2">
          <AdministatedDropdown />
        </Box>
      </Flex>
      <Flex gap="2">
        <Box className="w-1/2">
          <CompletionStatusField />
        </Box>
        <Box className="w-1/2">
          <DatetimeAdministeredField />
        </Box>
      </Flex>
      <Flex gap="2">
        <Box className="w-1/2">
          <RouteField />
        </Box>
        <Box className="w-1/2">
          <SiteField />
        </Box>
      </Flex>
    </Flex>
  )
}

export default RenderImmunizationFields
