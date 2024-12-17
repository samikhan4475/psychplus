import { cache } from 'react'
import { isHospitalCareVisit } from '@/utils'
import {
  ECTBlock,
  InjectionBlock,
  InteractiveComplexityBlock,
  TherapyBlock,
  TherapyPsychoAnalysisBlock,
} from './add-on-widget/blocks'

interface Block {
  component: React.ComponentType<{ isChecked?: boolean }>
  id: string
}

const blocks: Block[] = [
  {
    id: 'InjectionBlock',
    component: InjectionBlock,
  },
  {
    id: 'TherapyPsychoAnalysisBlock',
    component: TherapyPsychoAnalysisBlock,
  },
  {
    id: 'InteractiveComplexityBlock',
    component: InteractiveComplexityBlock,
  },
  {
    id: 'ECTBlock',
    component: ECTBlock,
  },
  {
    id: 'TherapyBlock',
    component: TherapyBlock,
  },
]

const visitTypeToBlocks: Record<string, string[]> = {
  Outpatient: ['InjectionBlock', 'TherapyPsychoAnalysisBlock'],
  EdVisit: ['InjectionBlock', 'TherapyPsychoAnalysisBlock'],
  TransitionalCare: ['InjectionBlock', 'TherapyPsychoAnalysisBlock'],
  'HospitalCare/Initial': [
    'InjectionBlock',
    'TherapyPsychoAnalysisBlock',
    'ECTBlock',
  ],
  'HospitalCare/Subsequent': [
    'InjectionBlock',
    'TherapyPsychoAnalysisBlock',
    'ECTBlock',
  ],
  'HospitalCare/Discharge': ['InjectionBlock', 'TherapyPsychoAnalysisBlock'],
  'HospitalCare/Initial/Discharge': [
    'InjectionBlock',
    'TherapyPsychoAnalysisBlock',
  ],
  IndividualPsychotherapy: ['InteractiveComplexityBlock'],
  FamilyPsychotherapy: ['InteractiveComplexityBlock'],
  Spravato: ['TherapyBlock'],
}

const getBlocksByVisitType = (visitType: string, visitSequence: string) => {
  if (isHospitalCareVisit(visitType)) {
    visitType = `${visitType}/${visitSequence}`
  }

  const blockIds = visitTypeToBlocks[visitType]

  if (!blockIds) {
    return []
  }

  const blockForVisitType = blockIds
    .map((id) => {
      const block = blocks.find((block) => block.id === id)
      if (
        block?.id === 'TherapyPsychoAnalysisBlock' &&
        ['Outpatient', 'EdVisit', 'TransitionalCare'].includes(visitType)
      ) {
        return {
          ...block,
          isChecked: true,
        }
      }

      return block
    })
    .filter(Boolean)

  return blockForVisitType
}

const getCachedBlocksByVisitType = cache(getBlocksByVisitType)

export { visitTypeToBlocks, getCachedBlocksByVisitType }
