import { format, setMinutes } from 'date-fns'
import { HealthConcern, HealthProblem } from '@psychplus/health-concerns'

const DATE_FORMAT = 'yyyy-MM-dd'

const setFormDefaultValues = (data?: HealthConcern) => {
  return {
    symptomCode: data?.symptomCode || '',
    symptomCodeDescription: data?.symptomCodeDescription || '',
    notes: data?.notes || '',
    symptomCodesetUsed: data?.symptomCodesetUsed || 'ICD',
    healthConcernTime: data?.healthConcernDate
      ? format(new Date(data?.healthConcernDate), 'hh:mm a')
      : format(setMinutes(new Date(), 0), 'hh:mm a'),
    healthConcernDate: data?.healthConcernDate
      ? format(new Date(data?.healthConcernDate), DATE_FORMAT)
      : format(new Date(), DATE_FORMAT),
  }
}

const mapPayload = (
  formData: any,
  patientId: number,
  noteId: number,
  healthProblems: HealthProblem[],
  isEdit?: boolean,
  patientsHealthConcernId?: string,
): HealthConcern => {
  const patientHealthObservations = healthProblems.map((problem) => ({
    symptomCode: problem.symptomCode,
    symptomCodesetUsed: problem.symptomCodesetUsed,
    moduleType: 'Problem',
    patientsHealthProblemId: problem.patientsHealthProblemId || problem.id,
    ...(isEdit && {
      patientsHealthConcernId: patientsHealthConcernId,
      id: problem.id,
    }),
  }))

  const payload = {
    ...formData,
    patientId,
    noteId,
    patientHealthObservations,
  }

  return payload
}

const cleanPayload = (obj: any) => {
  const clean: any = (data: any) => {
    if (Array.isArray(data)) {
      return data.filter((item: any) => {
        if (typeof item === 'object' && !Array.isArray(item)) {
          return (
            Object.keys(item).length > 0 ||
            Object.values(item).some((val) => val !== '')
          )
        } else if (Array.isArray(item)) {
          return clean(item).length > 0
        }
        return item !== ''
      })
    } else if (typeof data === 'object') {
      const cleanedData: any = {}
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          const cleanedValue = clean(value)
          if (
            Object.keys(cleanedValue).length > 0 ||
            Object.values(cleanedValue).some((val) => val !== '')
          ) {
            cleanedData[key] = cleanedValue
          }
        } else if (Array.isArray(value)) {
          const cleanedValue = clean(value)
          if (cleanedValue.length > 0) {
            cleanedData[key] = cleanedValue
          }
        } else if (
          value !== '' &&
          !(key === 'id' || key === 'patientsHealthConcernId')
        ) {
          cleanedData[key] = value
        }
      })
      return cleanedData
    }
    return data
  }

  const cleanedPayload = clean(obj)

  delete cleanedPayload['healthConcernTime']

  return cleanedPayload
}

export { setFormDefaultValues, cleanPayload, mapPayload }
