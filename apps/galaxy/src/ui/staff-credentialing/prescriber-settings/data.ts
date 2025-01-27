import { State } from '@/types'
import {
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
): PrescriberDataResponse[] =>
  states.map((state) =>
    columns.reduce<PrescriberDataResponse>(
      (acc, col) => {
        const matching = data.find(
          (d) => d.name === `${state.stateCode}_${col}`,
        )

        acc[col as PrescriberKeys] = matching
          ? `${matching.content}_${matching.id}`
          : `No`
        return acc
      },
      {
        stateCode: state.stateCode,
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
    ),
  )

export { transformIn }
