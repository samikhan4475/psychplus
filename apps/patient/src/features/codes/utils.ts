import { getNoteDetails } from '../note/actions'
import { NoteSectionName } from '../note/constants'
import { NoteSectionItem } from '../note/types'
import { CodesWidgetSchemaType } from './codes-schema'
import { transformIn, transformOut } from './data'
import { CodesWidgetItem } from './types'

const manageCodes = async (
  patientId: string,
  widgetAllCptCodes: CodesWidgetItem[],
  selectedCodes: CodesWidgetItem[],
): Promise<NoteSectionItem[]> => {
  const codesData = await fetchCodes(patientId)
  widgetAllCptCodes.forEach(({ key, code }) => {
    codesData[key] = codesData[key].filter(
      (existingCode) => existingCode !== code,
    )
  })
  selectedCodes.forEach(({ key, code }) => {
    codesData[key].push(code)
  })

  return transformOut(patientId)(codesData)
}

const fetchCodes = async (patientId: string) => {
  const codesResult = await getNoteDetails({
    patientId: Number(patientId),
    sectionName: [NoteSectionName.NoteSectionCodes],
    isWithAppointmentNull: true,
  })

  if (codesResult.state === 'error') {
    throw new Error('Something went wrong. Please try again.')
  }

  return transformInAppointmentCodes(codesResult.data)
}

const transformInAppointmentCodes = (
  codesResultData: NoteSectionItem[],
): CodesWidgetSchemaType => {
  return transformIn([...codesResultData.filter(({ appId }) => !appId)])
}

export { manageCodes }
