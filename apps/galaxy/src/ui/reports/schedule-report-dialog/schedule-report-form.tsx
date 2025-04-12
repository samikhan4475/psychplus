import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
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
import { ScheduledReport, ScheduleJob, SchedulingReport } from '../types'
import {
  formatJobData,
  generateCronExpression,
  processParameters,
} from '../utils'
import { defaultValues } from './default-values'
import { DistributionGroupsSelect } from './distribution-groups'
import { ScheduleReportButton } from './schedule-report-button'
import { ScheduleReportIntervals } from './schedule-report-intervals'

const schema = z
  .object({
    beginOn: z
      .custom<DateValue>()
      .refine((value) => value !== null && value !== undefined, {
        message: 'Required',
      }),
    terminateOn: z.custom<DateValue>(),
    repeatCount: z.string().min(1, 'Required'),
    repeatInterval: z.string().optional(),
    forDuration: z.string().min(1, 'Required'),
    numberOfDuration: z.string().optional(),
    durationInterval: z.string().min(1, 'Required'),
    scheduleDays: z.array(z.string()).optional(),
    intervalOption: z.string().optional(),
    isSchedule: z.boolean().optional(),
    parameters: z
      .array(
        z.object({
          id: z.string(),
          scheduleParameterValue: z
            .union([z.string(), z.array(z.string())])
            .optional(),
          reportTemplateId: z.string().optional(),
          parameterCode: z.string().optional(),
        }),
      )
      .optional(),
    distributionGroups: z.array(z.string()).min(1, 'required'),
    isEnabled: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.forDuration !== 'last' ||
      (data.numberOfDuration && data.numberOfDuration.trim() !== ''),
    {
      path: ['numberOfDuration'],
      message: 'Required',
    },
  )
  .refine(
    (data) =>
      data.repeatCount === 'notrepeat' ||
      (data.repeatInterval && data.repeatInterval.trim() !== ''),
    {
      path: ['repeatInterval'],
      message: 'Required',
    },
  )

type ScheduleTemplateSchemaType = z.infer<typeof schema>
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

  const form = useForm<ScheduleTemplateSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(selectedTemplate, scheduleData),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ScheduleTemplateSchemaType> = async (data) => {
    const transformedDistributionGroups =
      data.distributionGroups.length > 0
        ? data.distributionGroups.map((id) => ({
            id,
            distributionGroupId: id,
            reportScheduleId: id,
          }))
        : []

    const beginDate = new Date(
      data.beginOn.year,
      data.beginOn.month - 1,
      data.beginOn.day,
    )
    const cronScheduleDefinition = generateCronExpression({
      beginDate,
      repeatInterval: data.repeatInterval,
      scheduleDays: data.scheduleDays,
      intervalOption: data.intervalOption,
      repeatCount: data.repeatCount,
    })

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
        distributionGroups: transformedDistributionGroups,
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
