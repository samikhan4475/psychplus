import {
  Appointment,
  CodesWidgetItem,
  CptCodeKeys,
  QuickNoteSectionItem,
  UpdateCptCodes,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { manageCodes } from '@/utils/codes'
import { SpravatoWidgetSchemaType } from './spravato-widget-schema'
import { PrecurementMethod, spravatoCodes } from './utils'

const transformOut =
  (
    patientId: string,
    appointmentId: string,
    appointmentData: Appointment | null,
  ) =>
  async (
    schema: SpravatoWidgetSchemaType,
    _isSubmitting?: boolean,
    updateCptCodes?: UpdateCptCodes,
  ) => {
    const hasPriorActiveVistis = appointmentData?.isPatientHadAnyCheckedOutVisit

    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      let newValue = value
      if (typeof value === 'object') {
        newValue = JSON.stringify(value)
      }
      if (key !== 'newVitalSign') {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
          sectionItem: key,
          sectionItemValue: newValue as string,
        })
      }
    })
    const selectedCodes: CodesWidgetItem[] = []

    const addCodes = (codes: CodesWidgetItem[]) => {
      selectedCodes.push(...codes)
    }

    if (
      data.procurementMethod === PrecurementMethod.BUY_AND_BILL &&
      data.doseAdminstered === '56mg'
    ) {
      addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: 'G2082*1' }])
    }

    if (
      data.procurementMethod === PrecurementMethod.BUY_AND_BILL &&
      data.doseAdminstered === '84mg'
    ) {
      addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: 'G2083*1' }])
    }

    if (
      data.procurementMethod === PrecurementMethod.ONLY_BILL &&
      !hasPriorActiveVistis
    ) {
      addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99205*1' }])
    }

    if (
      data.procurementMethod === PrecurementMethod.ONLY_BILL &&
      hasPriorActiveVistis
    ) {
      addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99215*1' }])
    }

    if (data.procurementMethod === PrecurementMethod.ONLY_BILL) {
      addCodes([{ key: CptCodeKeys.MODIFIER_KEY, code: '25' }])
    }

    if (
      data.procurementMethod === PrecurementMethod.ONLY_BILL &&
      !hasPriorActiveVistis
    ) {
      addCodes([{ key: CptCodeKeys.ADD_ONS_KEY, code: '99417*3' }])
    }

    if (
      data.procurementMethod === PrecurementMethod.ONLY_BILL &&
      hasPriorActiveVistis
    ) {
      addCodes([{ key: CptCodeKeys.ADD_ONS_KEY, code: '99417*4' }])
    }
    if (updateCptCodes) {
      const updatedCodes =
        (await updateCptCodes?.(
          patientId,
          appointmentId,
          spravatoCodes,
          selectedCodes,
        )) ?? []
      result.push(...updatedCodes)
    } else {
      result.push(
        ...(await manageCodes(
          patientId,
          appointmentId,
          spravatoCodes,
          selectedCodes,
        )),
      )
    }

    return result
  }

const transformIn = (
  value: QuickNoteSectionItem[],
): SpravatoWidgetSchemaType => {
  const converToObject = [
    'plan',
    'continueWithCurrentProtocolBlock',
    'continueWithMaintainanceBlock',
    'followUpScreening',
    'vitalSigns',
  ]

  const result: any = {
    treatmentNumber: '01',
    medicationAssessment: 'true',
    benzodiazepines: 'no',
    nonBenzodiazepineSedativeHypnotic: 'no',
    psychostimulants: 'no',
    monoamineOxidaseInhibitors: 'no',
    aneurysmalVascularDisease: 'true',
    pregnancyStatus: 'true',
    adverseReactionsEducation: 'true',
    postTreatmentSafety: 'true',
    sedation: 'no',
    sedationSymptomsResolved: 'yes',
    anxiety: 'no',
    dissociation: 'no',
    dissociationSymptomsResolved: 'yes',
    dizzinessAndVertigo: 'no',
    increasedInBloodPressure: 'no',
    lethargy: 'no',
    nauseaAndVomiting: 'no',
    respiratoryChanges: 'no',
    adverseEventQuestion: 'no',
    occurrenceDuration: 'During This Treatment Session',
    eventResolution: 'yes',
    plan: ['Continue with Current Protocol'],
    continueWithCurrentProtocolBlock: {
      treatmentFrequency: '2',
      treatmentPerUnit: 'week',
    },
    continueWithMaintainanceBlock: {
      treatmentFrequency: '1',
      treatmentPerUnit: 'week',
    },
    discontinueTreatment:
      'Treatment was discontinued because the patient experienced adverse reactions, including hypertension and disorientation, which outweighed the potential benefits of continuing Spravato treatments.',
    referral:
      'The patient was referred to a behavioral health specialist for ongoing psychotherapy to address underlying issues contributing to their condition, develop effective coping strategies, and provide comprehensive mental health support.',
    followUpScreening: ['PHQ-9'],
    postTreatmentTransportation: 'Driver Service',
    othertransportation: 'The patient was transported from the clinic by ...',
    zofranAdministrated: 'no',
    dose: '4mg',
    isPatientDischarge: 'yes',
    timeForPatientReadyForDischarge: '60',
    treatmentAndObservation:
      'Patient showed positive response to Spravato treatment, well tolerated, manageable side effects. Patient remained calm throughout treatment. No suicidal ideations reported. Continued monitoring and subsequent sessions crucial for full evaluation of therapeutic response.',
    vitalSigns: [],
    newVitalSign: {
      diastolic: '',
      heartRate: '',
      pulseOximetry: '',
      respiratoryRate: '',
      systolic: '',
    },
    procurementMethod: '',
  }

  value.forEach((item) => {
    result[item.sectionItem as keyof SpravatoWidgetSchemaType] =
      converToObject.includes(item.sectionItem)
        ? JSON.parse(item.sectionItemValue)
        : item.sectionItemValue
  })

  return result as SpravatoWidgetSchemaType
}

export { transformIn, transformOut }
