import { DateValue, today } from '@internationalized/date'
import { Service, SharedCode } from '@/types'
import { ProviderType, ServiceType } from '../types'

const calculateAge = (date?: string | Date) => {
  const today = new Date()
  const birthDate = new Date(date ?? '')
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() - birthDate.getMonth() < 0 ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
      ? 1
      : 0)

  return age
}

interface TimeInterval {
  label: string
  value: string
}

function generateTimeIntervals(): TimeInterval[] {
  const intervals: TimeInterval[] = []
  let time = '00.00'

  for (let r = 0; r < 100; r++) {
    const formattedTime = time.replace('.', ':')
    intervals.push({ label: formattedTime, value: formattedTime })

    if (time === '23.40') {
      break
    }

    time = (parseFloat(time) + parseFloat('0.20')).toFixed(2)

    if (time.includes('.60')) {
      const [hours] = time.split('.')
      const newHours = parseInt(hours) + 1
      time = (newHours < 10 ? '0' : '') + newHours + '.00'
    } else if (parseInt(time) < 10) {
      time = '0' + time
    }
  }

  return intervals
}

const isDatePriorTo30Days = (date: DateValue) => {
  const currentDate = today('UTC')
  const date30DaysAgo = currentDate.subtract({ days: 30 })
  const isPrior30Days = date.compare(date30DaysAgo) <= 0
  return isPrior30Days
}

const transformProviderTypes = (codes: SharedCode[], service: Service) => {
  return codes
    .filter((providerType) => {
      switch (providerType.value as ProviderType) {
        case ProviderType.Psychiatrist:
          return [
            ServiceType.AssistedLivingFacility,
            ServiceType.CouplesFamilyTherapy,
            ServiceType.Ect,
            ServiceType.EmergencyRoom,
            ServiceType.GroupTherapy,
            ServiceType.InpatientBehaviorHealthResidential,
            ServiceType.InpatientMedical,
            ServiceType.InpatientPsych,
            ServiceType.InpatientRehab,
            ServiceType.InpatientSubstanceUseResidential,
            ServiceType.IntensiveOutpatient,
            ServiceType.IntermediateCareFacility,
            ServiceType.NursingFacility,
            ServiceType.PartialHospital,
            ServiceType.Psychiatry,
            ServiceType.SkilledNursingFacility,
            ServiceType.Spravato,
            ServiceType.Therapy,
            ServiceType.Tms,
            ServiceType.UDS,
          ].includes(service.serviceOffered as ServiceType)
        case ProviderType.Therapist:
          return [
            ServiceType.AssistedLivingFacility,
            ServiceType.CouplesFamilyTherapy,
            ServiceType.EmergencyRoom,
            ServiceType.GroupTherapy,
            ServiceType.InpatientBehaviorHealthResidential,
            ServiceType.InpatientMedical,
            ServiceType.InpatientPsych,
            ServiceType.InpatientRehab,
            ServiceType.InpatientSubstanceUseResidential,
            ServiceType.IntensiveOutpatient,
            ServiceType.IntermediateCareFacility,
            ServiceType.NursingFacility,
            ServiceType.PartialHospital,
            ServiceType.SkilledNursingFacility,
            ServiceType.Therapy,
          ].includes(service.serviceOffered as ServiceType)
        case ProviderType.Bcba:
          return service.serviceOffered === ServiceType.Aba
        case ProviderType.InternalMedicine:
        case ProviderType.FamilyMedicine:
          return [
            ServiceType.PartialHospital,
            ServiceType.IntensiveOutpatient,
            ServiceType.EmergencyRoom,
            ServiceType.InpatientPsych,
            ServiceType.InpatientMedical,
            ServiceType.InpatientRehab,
            ServiceType.InpatientSubstanceUseResidential,
            ServiceType.InpatientBehaviorHealthResidential,
            ServiceType.AssistedLivingFacility,
            ServiceType.NursingFacility,
            ServiceType.SkilledNursingFacility,
            ServiceType.IntermediateCareFacility,
            ServiceType.UDS,
          ].includes(service.serviceOffered as ServiceType)
        case ProviderType.Anesthesiology:
        case ProviderType.NotSet:
        case ProviderType.Pmnr:
          return false
        default:
          return false
      }
    })
    .map((code) => ({
      label: code.display,
      value: code.value,
    }))
}

export {
  calculateAge,
  generateTimeIntervals,
  isDatePriorTo30Days,
  transformProviderTypes,
}
