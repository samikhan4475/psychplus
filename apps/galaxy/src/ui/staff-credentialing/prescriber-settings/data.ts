import { getCodeAttributeBoolean } from '@/hooks'
import { SharedCode, State } from '@/types'
import { Staff } from '@/ui/staff-management/types'
import {
  GetLicensesResponse,
  LicenseType,
  PrescriberDataResponse,
  PrescriberKeys,
  PrescriberSettingResponse,
} from '../types'

const columns = [
  'Prescriber',
  'New',
  'Refill',
  'Change',
  'Cancel',
  'PharmacyRXRequest',
  'PharmacyRXResponseDenied',
  'Controls',
  'C2',
]
const transformIn = (
  data: PrescriberSettingResponse[],
  states: State[],
  stateCodes: SharedCode[],
  licenses: GetLicensesResponse[],
  staff: Staff,
): PrescriberDataResponse[] => {
  const licenseMap = Object.fromEntries(
    licenses.map((license) => [
      `${license.licenseType}_${license.stateCode}`,
      license,
    ]),
  )
  const stateCodeMap = Object.fromEntries(
    stateCodes.map((stateCode) => [stateCode.value, stateCode]),
  )

  return states.map((state) => {
    const stateCode = stateCodeMap[state.stateCode] || {}
    const hasLicense =
      licenseMap[`${LicenseType.DEA}_${stateCode.value}`] ||
      licenseMap[`${LicenseType.CDS}_${stateCode.value}`]

    return columns.reduce<PrescriberDataResponse>(
      (acc, col) => {
        if (col === 'Controls') {
          acc[col as PrescriberKeys] = hasLicense ? 'Yes' : 'No'
        } else if (col === 'C2') {
          const { honors = '' } = staff?.legalName || {}
          const isYes =
            hasLicense &&
            (['MD', 'DO'].includes(honors) ||
              (['NP', 'PA'].includes(honors) &&
                stateCode.attributes?.some(
                  (attr) =>
                    attr?.name === `C2_${honors}` && attr?.value === 'true',
                )))
          acc[col as PrescriberKeys] = isYes ? 'Yes' : 'No'
        } else {
          const matching = data.find(
            (d) => d.name === `${stateCode.value}_${col}`,
          )
          acc[col as PrescriberKeys] = matching
            ? `${matching.content}_${matching.id}`
            : 'No'
        }
        return acc
      },
      {
        stateCode: stateCode.value,
        stateName: state.stateName,
        Prescriber: '',
        New: '',
        Refill: '',
        Change: '',
        Cancel: '',
        PharmacyRXRequest: '',
        PharmacyRXResponseDenied: '',
        Controls: '',
        C2: '',
      },
    )
  })
}

export { transformIn }
