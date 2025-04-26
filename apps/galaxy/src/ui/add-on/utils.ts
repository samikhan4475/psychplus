import { Appointment, QuickNoteSectionItem } from '@/types'
import { isHospitalCareVisit } from '@/utils'
import {
  ECTBlock,
  InjectionBlock,
  InteractiveComplexityBlock,
  TherapyBlock,
  TherapyPsychoAnalysisBlock,
} from './add-on-widget/blocks'

interface Block {
  component: React.ComponentType<{
    isChecked?: boolean
    otherData?: QuickNoteSectionItem[]
    appointment?: Appointment
  }>
  id: string
}

const mapAppointmentDurationToData = (duration?: number) => {
  switch (duration) {
    case 20:
      return {
        therapyTimeSpent: 'timeRangeOne',
        timeRangeOne: '20',
      }
    case 40:
      return {
        therapyTimeSpent: 'timeRangeTwo',
        timeRangeTwo: '40',
      }
    case 60:
      return {
        therapyTimeSpent: 'timeRangeThree',
        timeRangeThree: '60',
      }
    default:
      return {}
  }
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

// These blocks are for Add On

const commonBlocks = ['InjectionBlock', 'TherapyPsychoAnalysisBlock']
const extendedBlocks = [...commonBlocks, 'ECTBlock']

const visitTypeToBlocks: Record<string, string[]> = {
  Outpatient: commonBlocks,
  ResidentCare: commonBlocks,
  EdVisit: commonBlocks,
  TransitionalCare: commonBlocks,
  'HospitalCare/Initial': extendedBlocks,
  'HospitalCare/Subsequent': extendedBlocks,
  'HospitalCare/Discharge': extendedBlocks,
  'HospitalCare/InitialDischarge': extendedBlocks,

  'NursingHomeCare/Initial': extendedBlocks,
  'NursingHomeCare/Subsequent': extendedBlocks,
  'NursingHomeCare/Discharge': extendedBlocks,
  'NursingHomeCare/InitialDischarge': extendedBlocks,

  'PhpCare/Initial': extendedBlocks,
  'PhpCare/Subsequent': extendedBlocks,
  'PhpCare/Discharge': extendedBlocks,
  'PhpCare/InitialDischarge': extendedBlocks,
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
        ['Outpatient', 'EdVisit', 'TransitionalCare', 'ResidentCare'].includes(
          visitType,
        )
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

const getCachedBlocksByVisitType = getBlocksByVisitType

export {
  mapAppointmentDurationToData,
  visitTypeToBlocks,
  getCachedBlocksByVisitType,
}
