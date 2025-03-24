import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { getClinicsOptionsAction } from '@/actions'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { SelectOptionType, StaffResource } from '@/types'

interface RevCycleContextType {
  staffData?: SelectOptionType[]
  error?: string
  loading?: boolean
  locationsData?: SelectOptionType[]
  posCodesData?: SelectOptionType[]
  fetchClaimOptionsData: () => void
  selectedStaffData?: StaffResource
  setSelectedStaffData: (data: StaffResource) => void
}

const RevCycleContext = createContext<RevCycleContextType | undefined>(
  undefined,
)

interface RevCycleProviderProps {
  children: React.ReactNode
}

export const RevCycleProvider = ({ children }: RevCycleProviderProps) => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce) ?? []
  const posCodes = useDeepCompareMemo(() => {
    return codes
      .map(({ display, value, attributes }) => {
        const submissionCode =
          attributes?.find((attr) => attr.name === 'SubmissionCode')?.value ??
          ''
        const formattedCode = submissionCode.padStart(2, '0')

        return {
          label: formattedCode ? `${formattedCode}-${display}` : display,
          value,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [codes])
  const [locationsData, setLocationsData] = useState<SelectOptionType[]>([])
  const [posCodesData, setPOSCodesData] = useState<SelectOptionType[]>([])
  const [selectedStaffData, setSelectedStaffData] = useState<StaffResource>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchClaimOptionsData = useCallback(async () => {
    setLoading(true)
    const [locationsResult] = await Promise.all([getClinicsOptionsAction()])
    if (locationsResult.state === 'success') {
      setLocationsData(locationsResult.data)
    } else {
      toast.error(locationsResult.error ?? 'Error fetching locations data')
    }
    setPOSCodesData(posCodes)
  }, [])

  const value = useMemo(
    () => ({
      locationsData,
      posCodesData,
      selectedStaffData,
      setSelectedStaffData,
      loading,
      fetchClaimOptionsData,
    }),
    [
      locationsData,
      posCodesData,
      selectedStaffData,
      loading,
      fetchClaimOptionsData,
    ],
  )

  return (
    <RevCycleContext.Provider value={value}>
      {children}
    </RevCycleContext.Provider>
  )
}

export const useRevCycleDataProvider = (): RevCycleContextType => {
  const context = useContext(RevCycleContext)
  if (!context) {
    throw new Error('Error while using RevCycle context.')
  }
  return context
}
