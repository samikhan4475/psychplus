import React, { useRef } from 'react'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useReactToPrint } from 'react-to-print'
import { printStyle } from '../constants'
import { LabOrder } from '../types'

const SpecimenLabelPrinting = ({
  labTest,
}: {
  labTest: LabOrder | null | undefined
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => printStyle,
  })
  if (!labTest) {
    return <Text>No lab test data available</Text>
  }
  const { patient, labOrderDate, labOrderNumber } = labTest

  if (!labOrderDate) {
    return <Text>No labOrderDate available</Text>
  }
  if (
    patient &&
    patient.legalName &&
    patient?.legalName.firstName &&
    patient.legalName?.lastName
  ) {
    const { firstName, lastName } = patient.legalName
    return (
      <Box>
        <Box ref={componentRef}>
          <Text size="4" weight="medium" className="specimen-label">
            Specimen Label Print
          </Text>
          <Box className=" grid grid-cols-1 grid-rows-3 gap-1">
            <Text size="2" weight="medium" className="text-value">
              {firstName && lastName ? `${firstName}, ${lastName}` : ' -'}
            </Text>
            <Flex align="center" gap="1">
              <Text size="1" weight="light" className="text-label">
                Client#:
              </Text>
              <Text size="2" weight="medium" className="text-value">
                10695237
              </Text>
            </Flex>
            <Flex align="center" gap="1">
              <Text size="1" weight="light" className="text-label">
                Lab Ref:
              </Text>
              <Text size="2" weight="medium" className="text-value">
                {labOrderNumber ? labOrderNumber : ' -'}
              </Text>
            </Flex>
          </Box>
        </Box>
        <Flex justify="end">
          <Button
            onClick={handlePrint}
            className="page-break mt-2 h-[22px] rounded-2 bg-[#151B4A] px-4 py-2 text-2 font-regular text-[white]"
          >
            Print
          </Button>
        </Flex>
      </Box>
    )
  }
  return null
}

export { SpecimenLabelPrinting }
