'use client'

import { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, Tooltip } from '@radix-ui/themes'
import { EyeIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CheckboxCell, WidgetContainer } from '@/components'
import { InformationLineIcon } from '@/components/icons'
import { ACCESS_UNAVAILABLE_MESSAGE, FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { Appointment } from '@/types'
import { pmpReportAction, searchPMPAction, startPMPAction } from './actions'
import { AddMedicationButton } from './add-medication-button'
import { PatientMedicationsDataTable } from './patient-medications-data-table'
import { PatientMedicationsTabView } from './patient-medications-tab-view'
import { PMPHistoryDialog } from './pmp-history'
import { useStore } from './store'
import { EncounterData, PmpScoreResponse, StartPmpResponse } from './types'

const getUUIDWithSplit = (url: string): string => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}
interface PatientMedicationsWidgetProps {
  appointment?: Appointment
}
const PatientMedicationsWidget = ({
  appointment,
}: PatientMedicationsWidgetProps) => {
  const ehr14021PmpIntegration = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr14021PmpIntegration,
  )
  const autoPMPCheckInMedicationWidget = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr15606AutoPMPCheckInMedicationWidget,
  )
  const { id: patientId, apptId = '' } = useParams<{
    id: string
    apptId: string
  }>()
  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')
  const [pmpScoresResponse, setPmpScoresResponse] = useState<
    PmpScoreResponse[]
  >([])
  const [checkPMPResponse, setCheckPMPResponse] =
    useState<StartPmpResponse | null>(null)
  const [startPMP, setStartPMP] = useState(false)
  const [checkPMPLoading, setCheckPMPLoading] = useState(false)
  const [generatePMPReport, setGeneratePMPReport] = useState(false)
  const {
    isPmpReviewed,
    setPmpReviewed,
    fetchPatientMedication,
    fetchScriptSureSessionToken,
    fetchExternalScriptsurePatientId,
    refetch,
    error,
    errorStatus,
  } = useStore()
  useEffect(() => {
    if (!patientId) return
    Promise.all([
      fetchScriptSureSessionToken(),
      fetchPatientMedication(
        { patientIds: [Number(patientId)] },
        1,
        true,
        isQuickNoteSection,
      ),
      fetchExternalScriptsurePatientId(patientId),
    ])
    if (ehr14021PmpIntegration) fetchPMPMSearch()
  }, [
    patientId,
    appointment,
    autoPMPCheckInMedicationWidget,
    ehr14021PmpIntegration,
  ])

  const fetchPMPMSearch = async () => {
    setCheckPMPLoading(false)
    const payload = {
      patientId: Number(patientId),
      appointmentId: Number(apptId),
    }

    const response = await searchPMPAction({ payload })
    if (response.state === 'success') {
      setPmpScoresResponse(response.data)
      if (response.data.length > 0) {
        setPmpReviewed(true)
      }
      if (response.data.length === 0 && autoPMPCheckInMedicationWidget) {
        await handlePMPCheck()
      }
    }
  }
  const handlePMPCheck = async () => {
    setCheckPMPLoading(true)
    setStartPMP(true)
    const payload = {
      patientId: Number(patientId),
      appointmentId: Number(apptId),
      locationId: appointment?.locationId,
      staffId: appointment?.providerStaffId,
    }
    const response = await startPMPAction({ payload })
    if (response.state === 'success') {
      await fetchPMPMSearch()
      setCheckPMPResponse(response.data)
      if (response.data) {
        setPmpReviewed(true)
      }
    } else {
      toast.error(response.error || 'Failed to start PMP')
    }
    setCheckPMPLoading(false)
  }

  const handlePMPReport = async () => {
    setGeneratePMPReport(true)
    const pmpResponse = pmpScoresResponse?.[0]
    const fallbackReportUrl =
      checkPMPResponse?.report?.reportRequestUrl?.viewableReport ?? ''
    const reportRequestUrl = pmpResponse?.reportRequestUrl ?? fallbackReportUrl
    const uuid = getUUIDWithSplit(reportRequestUrl)

    const payload = {
      patientId: String(patientId),
      appointmentId: Number(apptId),
      locationId: appointment?.locationId?.toString(),
      staffId: appointment?.providerStaffId,
      pmpPrescriptionId: pmpResponse.pmpScores[0]?.pmpPrescriptionId,
      reportId: uuid,
    }

    const response = await pmpReportAction({ payload })
    if (response.state === 'success') {
      const reportLink = response.data.reportLink
      if (reportLink) {
        window.open(reportLink, '_blank')
      }
    } else {
      toast.error(response.error || 'Failed to fetch report')
    }

    setGeneratePMPReport(false)
  }
  const path = usePathname()
  const tabViewEnabled = path.includes('medications')
  const pmpScores = startPMP
    ? checkPMPResponse?.report?.narxScores?.scores ?? []
    : pmpScoresResponse[0]?.pmpScores ?? []
  const message = startPMP
    ? checkPMPResponse?.report?.message
    : pmpScoresResponse[0]?.responseMessage ?? ''
  if (error && errorStatus === 401) {
    return (
      <WidgetContainer
        title="Medication Access Unavailable"
        titleIcon={<ExclamationTriangleIcon className="text-pp-orange-1" />}
      >
        <Box className="p-2">{ACCESS_UNAVAILABLE_MESSAGE}</Box>
      </WidgetContainer>
    )
  }

  if (tabViewEnabled) {
    return <PatientMedicationsTabView patientId={patientId} />
  }
  return (
    <Box position="relative" width="100%">
      <WidgetContainer
        title="Medications"
        headerLeft={<AddMedicationButton onRefresh={refetch} />}
      >
        {' '}
        <Flex className="align-center">
          <Flex>
            <CheckboxCell
              label="PMP is reviewed"
              checked={isPmpReviewed}
              onCheckedChange={(checked) => setPmpReviewed(!!checked)}
            />
          </Flex>

          {ehr14021PmpIntegration && (
            <Flex className=" border-pp-bg-table-label rounded-[5px] border p-1">
              <Flex gap="1" className="flex-wrap whitespace-nowrap">
                {message && (
                  <Tooltip
                    content={<Text className="select-text">{message}</Text>}
                  >
                    <Text
                      className="text-pp-black-3 line-clamp-1 select-text overflow-ellipsis pt-1"
                      size="1"
                      weight="regular"
                    >
                      <InformationLineIcon />
                    </Text>
                  </Tooltip>
                )}

                {pmpScores.map((item, index) => (
                  <Text key={item.scoreValue} size="1" className="pt-1">
                    <strong>{item.scoreType}</strong> {item.scoreValue}
                    {index !== pmpScores.length - 1 && ' | '}
                  </Text>
                ))}
                {pmpScores?.length !== 0 && (
                  <Button
                    size="1"
                    variant="outline"
                    color="gray"
                    className="text-black"
                    onClick={handlePMPReport}
                    loading={generatePMPReport}
                  >
                    <EyeIcon height={14} width={14} strokeWidth={1.5} />
                    View PMP Report
                  </Button>
                )}

                <Button
                  size="1"
                  variant="outline"
                  color="gray"
                  className="text-black"
                  onClick={() => handlePMPCheck()}
                  loading={checkPMPLoading}
                >
                  Check PMP
                </Button>
                <PMPHistoryDialog
                  patientId={patientId}
                  appointmentId={String(apptId)}
                />
              </Flex>
            </Flex>
          )}
        </Flex>
        <PatientMedicationsDataTable />
      </WidgetContainer>
    </Box>
  )
}

export { PatientMedicationsWidget }
