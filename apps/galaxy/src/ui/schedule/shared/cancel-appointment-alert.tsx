import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Grid, Text } from '@radix-ui/themes'
import format from 'date-fns/format'
import { TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextAreaInput,
  TextInput,
} from '@/components'
import { Appointment } from '@/types'
import { cn } from '@/utils'
import { convertToZonedDate, formatDateCell, formatTimeCell } from '../utils'

const schema = z.object({
  noRebookReason: z.string().min(1, 'Reason is required'),
})

type SchemaType = z.infer<typeof schema>

const CancelAppointmentAlert = ({
  appointment,
  isOpen,
  onClose,
  onSave,
}: {
  appointment: Appointment
  isOpen: boolean
  onClose: () => void
  onSave: (noRebookReason: string) => void
}) => {
  const [showReasonInput, setShowReasonInput] = useState(false)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { noRebookReason: '' },
  })

  const appointmentDate = formatDateCell(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )
  const locationStartTime = formatTimeCell(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )
  const locationStartDateTime = convertToZonedDate(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )
  const duration = appointment.appointmentDuration ?? 20
  const locationEndDate = new Date(
    locationStartDateTime.getTime() + duration * 60000,
  )
  const locationEndTime = format(new Date(locationEndDate), 'HH:mm')

  const onSubmit = (data: SchemaType) => {
    const { noRebookReason } = data
    onSave(noRebookReason)
  }
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content
        className="bg-pp-warning-bg-1 border-pp-warning-border !w-[850px] border"
        maxWidth={'100%'}
      >
        <Flex gap="3">
          <TriangleAlert className="min-w-6 min-h-6 text-pp-warning-border" />
          <Flex direction="column" gap="3">
            <AlertDialog.Title className="pt-1">
              Cancel Visit & Manage Future Booking
            </AlertDialog.Title>
            <AlertDialog.Description
              size="4"
              className="border-pp-gray-5 rounded-1 border p-2"
            >
              <Flex>
                <Text size="2" weight="bold" mr="1">
                  Visit Details of Patient
                </Text>
                <Text size="2">{appointment.name}</Text>
              </Flex>
              <Flex direction="row" gap="1">
                <LabelValue label="State" value={appointment.state} />
                <LabelValue label="Location" value={appointment.locationName} />
                <LabelValue label="Service" value={appointment.service} />
                <LabelValue
                  label="Provider Name"
                  value={appointment.providerName}
                />
              </Flex>
              <Flex direction="row" gap="1">
                <LabelValue
                  label="Provider Type"
                  value={appointment.providerType}
                />
                <LabelValue label="Appointment Date" value={appointmentDate} />
                <LabelValue
                  label="Appointment Time"
                  value={`${locationStartTime} - ${locationEndTime}`}
                />
              </Flex>
              <Flex direction="row" gap="1">
                <LabelValue
                  label="Duration"
                  value={
                    appointment.appointmentDuration
                      ? `${appointment.appointmentDuration} mins`
                      : ''
                  }
                />
                <LabelValue label="Visit Type" value={appointment.visitType} />
                <LabelValue
                  label="Ins Verification"
                  value={appointment.insuranceVerification}
                />
                <LabelValue
                  label="Frequency"
                  value={appointment.frequency ?? 'Once'}
                />
              </Flex>
            </AlertDialog.Description>

            <Grid className="" columns="3" gap="2">
              <AlertDialog.Description size="4" className="col-span-2">
                You are attempting to cancel this appointment, we will book
                another appointment for this patient.
              </AlertDialog.Description>
              <Flex gap="2" className="col-span-1" align="center">
                <Button
                  variant={!showReasonInput ? 'solid' : 'outline'}
                  color={!showReasonInput ? 'blue' : 'gray'}
                  className={cn('text-black bg-white flex-1', {
                    'text-white bg-pp-blue': !showReasonInput,
                  })}
                  type="button"
                  onClick={() => onSave('')}
                >
                  Yes
                </Button>

                <Button
                  variant={showReasonInput ? 'solid' : 'outline'}
                  color={showReasonInput ? 'blue' : 'gray'}
                  className={cn('text-black bg-white flex-1', {
                    'text-white bg-pp-blue': showReasonInput,
                  })}
                  type="button"
                  onClick={() => setShowReasonInput(true)}
                >
                  No
                </Button>
              </Flex>
            </Grid>
            {showReasonInput && (
              <FormContainer onSubmit={onSubmit} form={form}>
                <Grid className="" columns="4" gap="2">
                  <FormFieldContainer className="col-span-3 flex-1">
                    <FormFieldLabel required className="!text-2">
                      Reason
                    </FormFieldLabel>
                    <TextAreaInput
                      field="noRebookReason"
                      className="h-8 w-full"
                    />
                    <FormFieldError name="noRebookReason" />
                  </FormFieldContainer>

                  <Flex
                    gap="2"
                    className={`col-span-1 flex ${
                      form.formState?.errors?.noRebookReason
                        ? 'items-center'
                        : 'items-end'
                    }`}
                  >
                    <Button
                      type="submit"
                      className={cn(
                        'bg-pp-blue-400 text-white ml-auto flex-1 cursor-pointer px-3 py-1.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75',
                      )}
                    >
                      Submit
                    </Button>
                  </Flex>
                </Grid>
              </FormContainer>
            )}
          </Flex>
          <AlertDialog.Cancel
            className="min-w-5 min-h-5 cursor-pointer"
            onClick={onClose}
          >
            <Cross1Icon strokeWidth={1.5} className="text-pp-icon-sub" />
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

const LabelValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <Flex>
      <Text size="2" mr="1" weight="bold">
        {label}
      </Text>
      <Text size="2">{value ?? '-'}</Text>
    </Flex>
  )
}

export { CancelAppointmentAlert }
