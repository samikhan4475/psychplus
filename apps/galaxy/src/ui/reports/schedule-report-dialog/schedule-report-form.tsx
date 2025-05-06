import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { converter, PeriodType } from 'react-js-cron'
import { FormContainer } from '@/components'
import { ActionResult, SelectOptionType } from '@/types'
import { formatDateToISOString } from '@/utils'
import {
  addScheduleReportAction,
  editScheduleReportAction,
  getOrganizationRolesAction,
  runScheduleReportAction,
  updateScheduleJobAction,
} from '../actions'
import { useStore } from '../store'
import {
  DistributionGroup,
  ScheduledReport,
  ScheduleJob,
  SchedulingReport,
} from '../types'
import { convertToNumber, formatJobData, processParameters } from '../utils'
import { defaultValues } from './default-values'
import { DistributionGroupsSelect } from './distribution-groups'
import { ScheduleReportButton } from './schedule-report-button'
import { ScheduleReportIntervals } from './schedule-report-intervals'
import { ScheduleTemplateSchemaType, schema } from './schema'

interface ScheduleReportFormProps {
  onSuccess?: () => void
  scheduleData?: ScheduledReport
}
const ScheduleReportForm = ({
  onSuccess,
  scheduleData,
}: ScheduleReportFormProps) => {
  const { selectedTemplate, searchScheduledReports } = useStore()
  const [distributionGroupOptions, setDistributionGroupOptions] = useState<
    SelectOptionType[]
  >([])
  const [loading, setLoading] = useState(false)
  const internalValueRef = useRef<string>('')

  const form = useForm<ScheduleTemplateSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(
      internalValueRef,
      selectedTemplate,
      scheduleData,
    ),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ScheduleTemplateSchemaType> = async (data) => {
    const transformedData = convertToNumber(data)

    const cronScheduleDefinition = converter.getCronStringFromValues(
      (transformedData?.repeatInterval as PeriodType) ?? 'week',
      transformedData.monthSelection,
      transformedData.monthDateSelection,
      transformedData.weekdaysSelection,
      transformedData.hourSelection,
      transformedData.minuteSelection,
      true,
      undefined,
    )

    const transformedDistributionGroups =
      data.distributionGroups.length > 0
        ? data.distributionGroups.map((id) => ({
            id,
            distributionGroupId: id,
            reportScheduleId: id,
          }))
        : []

    const findExistingDistributionGroup = (
      existingGroups: DistributionGroup[],
      newGroupId: string,
    ) => {
      return existingGroups.find(
        (group) => group.distributionGroupId === newGroupId,
      )
    }

    // If the existing distribution group is found, merge the new data with existing one
    const updatedDistributionGroups = transformedDistributionGroups.map(
      (newDistributionGroup) => {
        const existingDistributionGroup = findExistingDistributionGroup(
          scheduleData?.distributionGroups || [],
          newDistributionGroup.id,
        )

        if (existingDistributionGroup) {
          const { metadata, ...rest } = existingDistributionGroup
          return { ...newDistributionGroup, ...rest }
        }

        return newDistributionGroup
      },
    )

    const formattedJobData = formatJobData(
      cronScheduleDefinition,
      selectedTemplate,
      data?.numberOfDuration ?? '',
    )

    let jobResponse: ActionResult<ScheduleJob> | null = null

    if (!scheduleData) {
      jobResponse = await runScheduleReportAction(formattedJobData)
    } else {
      jobResponse = await updateScheduleJobAction({
        jobId: scheduleData.jobId,
        data: formattedJobData,
      })
    }

    if (jobResponse?.state === 'success') {
      const updatedParameters = processParameters(
        data.parameters ? data.parameters : [],
        selectedTemplate?.id,
        data.numberOfDuration ?? '',
        data.durationInterval ?? '',
        data.forDuration ?? '',
      )

      const formattedScheduleData = {
        templateId: selectedTemplate?.id,
        beginOn: formatDateToISOString(data.beginOn),
        terminateOn: data.terminateOn
          ? formatDateToISOString(data.terminateOn)
          : null,
        parameters: updatedParameters,
        distributionGroups: updatedDistributionGroups,
        jobId: jobResponse.data.id,
        isEnabled: data.isEnabled,
      }
      let scheduleResponse: ActionResult<SchedulingReport> | null = null
      if (!scheduleData) {
        scheduleResponse = await addScheduleReportAction(formattedScheduleData)
      } else {
        scheduleResponse = await editScheduleReportAction({
          scheduleId: scheduleData.id || '',
          data: formattedScheduleData,
        })
      }

      if (scheduleResponse?.state === 'success') {
        toast.success('Report Scheduled Successfully')
        onSuccess?.()
        searchScheduledReports({ templateIds: [selectedTemplate?.id ?? ''] })
      } else {
        toast.error(scheduleResponse?.error ?? 'Oops! Schedule report failed')
      }
    } else {
      toast.error(jobResponse?.error ?? 'Run schedule job failed')
    }
  }
  useEffect(() => {
    const fetchDistributionGroups = async () => {
      setLoading(true)
      const result = await getOrganizationRolesAction()
      if (result.state === 'success') {
        const options = result.data.map((item) => ({
          value: item.id,
          label: item.displayName,
        }))
        setDistributionGroupOptions(options)
      } else {
        toast.error(result.error ?? 'Failed to fetch distribution groups:')
      }
      setLoading(false)
    }

    fetchDistributionGroups()
  }, [])
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <ScheduleReportIntervals />
      <DistributionGroupsSelect
        distributionGroupsOptions={distributionGroupOptions}
        isLoading={loading}
      />
      <ScheduleReportButton />
    </FormContainer>
  )
}

export { ScheduleReportForm, type ScheduleTemplateSchemaType }
