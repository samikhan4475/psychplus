'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { formatDateTime } from '@/utils'
import {
  CardiovascularCvsBlock,
  CentralNervousSystemCnsBlock,
  ChestBlock,
  CranialNervesExamBlock,
  GastrointestinalGiBlock,
  GeneralBlock,
  GenitourinaryGuBlock,
  GynecologicalGynBlock,
  HeentBlock,
  LungsBlock,
  LymphNodesBlock,
  NeckBlock,
  NutritionBlock,
  PeMusculoskeletalBlock,
  PsychiatricBlock,
  SkinBlock,
} from '../../blocks'
import { useStore } from '../store'
import { transformIn } from './data'

interface PhysicalExamDetailsProps {
  patientId: string
}
const PhysicalExamDetails = ({ patientId }: PhysicalExamDetailsProps) => {
  const { selectedRow } = useStore((store) => ({
    selectedRow: store.selectedRow,
  }))

  const result = transformIn(selectedRow?.data)
  if (!selectedRow) {
    return (
      <Flex className="h-full w-full" justify="center" align="center">
        <Text size="2" weight="bold">
          No row selected
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className="h-full w-full pr-2" scrollbars="vertical">
      <Text size="4" weight="bold">
        Physical Exam
      </Text>
      <GeneralBlock isDetails={true} result={result} />
      <SkinBlock isDetails={true} result={result} />
      <HeentBlock isDetails={true} result={result} />
      <NeckBlock isDetails={true} result={result} />
      <LymphNodesBlock isDetails={true} result={result} />
      <ChestBlock isDetails={true} result={result} />
      <CardiovascularCvsBlock isDetails={true} result={result} />
      <LungsBlock isDetails={true} result={result} />
      <GastrointestinalGiBlock isDetails={true} result={result} />
      <GynecologicalGynBlock isDetails={true} result={result} />
      <GenitourinaryGuBlock isDetails={true} result={result} />
      <CentralNervousSystemCnsBlock isDetails={true} result={result} />
      <PeMusculoskeletalBlock isDetails={true} result={result} />
      <NutritionBlock isDetails={true} result={result} />
      <PsychiatricBlock isDetails={true} result={result} />
      <CranialNervesExamBlock isDetails={true} result={result} />
    </ScrollArea>
  )
}

export { PhysicalExamDetails }
