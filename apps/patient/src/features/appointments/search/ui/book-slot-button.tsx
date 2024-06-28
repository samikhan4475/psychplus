import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, isToday } from '@internationalized/date'
import { FormContainer } from '@psychplus-v2/components'
import { AppointmentType } from '@psychplus-v2/constants'
import { Consent, DocumentType } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getClinicAddressLabel,
  getDayOfWeekLabel,
  getMonthLabel,
  getProviderTypeLabel,
  getTimeLabel,
  getUserFullName,
} from '@psychplus-v2/utils'
import {
  Button,
  Checkbox,
  Dialog,
  Flex,
  Heading,
  Text,
  TextArea,
} from '@radix-ui/themes'
import { CalendarIcon, MapPinIcon, VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { clickTrack } from '@psychplus/utils/tracking'
import { addPolicyConsent } from '@/actions'
import {
  CancelDialogButton,
  CloseDialogIcon,
  ConsentView,
  FormError,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  ProviderAvatar,
} from '@/components-v2'
import { useStore } from '@/features/appointments/search/store'
import { bookAppointmentAction } from '../actions'
import {
  AppointmentClinic,
  AppointmentSlot,
  AppointmentSpecialist,
} from '../types'

interface BookSlotButtonProps {
  slot: AppointmentSlot
  specialist: AppointmentSpecialist
  clinic: AppointmentClinic
  userConsents: Consent[]
}

const schema = z.object({
  userAgreed: z.coerce.boolean().refine((value) => value === true, {
    message: 'You must agree to the above policies',
  }),
  reason: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const BookSlotButton = ({
  slot,
  specialist,
  clinic,
  userConsents,
}: BookSlotButtonProps) => {
  const { appointmentType, providerType } = useStore((state) => ({
    appointmentType: state.appointmentType,
    providerType: state.providerType,
  }))

  const checkIfPolicyBSigned = (fetchedUserConsents: Consent[]) =>
    !!fetchedUserConsents.find((consent) => consent.type === 'PolicyB')

  const [policyAlreadySigned, setPolicyAlreadySigned] = useState(
    checkIfPolicyBSigned(userConsents),
  )

  useEffect(() => {
    setPolicyAlreadySigned(checkIfPolicyBSigned(userConsents))
  }, [userConsents])

  useEffect(() => {
    form.setValue('userAgreed', policyAlreadySigned)
  }, [])

  const [bookingSuccessful, setBookingSuccessful] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const [showConsentView, setShowConsentView] = useState({
    visible: false,
    type: DocumentType.PRIVACY_PRACTICE,
  })

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      userAgreed: false,
      reason: '',
    },
  })

  const bookSlot = async (data: SchemaType) => {
    setError(undefined)

    const result = await bookAppointmentAction({
      locationId: clinic.id,
      specialistStaffId: specialist.id,
      specialistTypeCode: providerType,
      type: appointmentType,
      startDate: slot.startDate,
      duration: slot.duration,
      reason: data.reason,
    })

    if (result.state === 'error') {
      return setError(result.error)
    }

    if (!policyAlreadySigned) {
      const result = await addPolicyConsent({ type: 'PolicyB' })

      if (result.state === 'error') {
        return setError(result.error)
      }
      setPolicyAlreadySigned(true)
    }

    const providerTypeLabel = getProviderTypeLabel(providerType)
    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Portal appointmentBooked',
      clickAction: 'Accepted',
      clickActionData: `${providerTypeLabel}|${appointmentType}`,
    })

    setBookingSuccessful(true)
  }

  const slotDate = getCalendarDate(slot.startDate)

  return (
    <>
      <ConsentView
        open={showConsentView.visible}
        setOpen={(open) => {
          setShowConsentView({ ...showConsentView, visible: open })
        }}
        documentType={showConsentView.type}
      />
      <Dialog.Root
        onOpenChange={(open) => {
          if (!open) form.reset()
        }}
      >
        <Dialog.Trigger>
          <Button
            variant="outline"
            highContrast
            className="hover:text-white h-[40px] w-[85px] rounded-2 text-[13px] hover:bg-accent-12"
          >
            {getTimeLabel(slot.startDate)}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="relative">
          <CloseDialogIcon />
          {bookingSuccessful ? (
            <Heading size="8" className="mb-5 text-accent-12">
              You&rsquo;re all set!
            </Heading>
          ) : (
            <>
              <Heading size="8" className="mb-5 text-accent-12">
                Confirm Appointment
              </Heading>
              <FormError className="mb-4" message={error} />
            </>
          )}

          <Flex gap="5" className="w-[325px]">
            <ProviderAvatar provider={specialist} size="7" />
            <Flex direction="column" gap="2">
              <Flex direction="column" gap="1">
                <Text
                  trim="end"
                  weight="bold"
                  className="text-[18px] text-accent-12"
                >
                  {`${getUserFullName(specialist.legalName)} ${
                    specialist.legalName.honors ?? ''
                  }`}
                </Text>
                <Text weight="medium" className="text-[12px] text-accent-11">
                  {getProviderTypeLabel(providerType)}
                </Text>
                <Flex direction="row" gap="2" align="start">
                  {appointmentType === AppointmentType.Virtual ? (
                    <VideoIcon
                      width={18}
                      height={18}
                      strokeWidth={1.25}
                      className="min-w-[18px] text-accent-11"
                    />
                  ) : (
                    <MapPinIcon
                      width={18}
                      height={18}
                      strokeWidth={1.25}
                      className="mt-[3px] min-w-[18px] text-accent-11"
                    />
                  )}

                  {appointmentType === AppointmentType.InPerson ? (
                    <Text className="text-[12px]">
                      {getClinicAddressLabel(clinic.contact.addresses)}
                    </Text>
                  ) : (
                    <Text highContrast className="text-[12px]">
                      Virtual
                    </Text>
                  )}
                </Flex>
                <Flex
                  className="text-[12px]"
                  direction="row"
                  gap="2"
                  align="center"
                >
                  <CalendarIcon
                    width={20}
                    height={20}
                    strokeWidth={1.25}
                    className="min-w-[20px] text-accent-11"
                  />

                  <Flex direction="row" gap="1">
                    {isToday(slotDate, getLocalTimeZone()) ? (
                      <Text>Today</Text>
                    ) : (
                      <>
                        <Text>{getDayOfWeekLabel(slotDate)}</Text>
                        <Text>{getMonthLabel(slotDate).slice(0, 3)}</Text>
                        <Text>{slotDate.day}</Text>
                      </>
                    )}
                    <Text>{getTimeLabel(slot.startDate)}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {!bookingSuccessful ? (
            <>
              <FormFieldContainer mt="4">
                <FormFieldLabel>Reason (optional)</FormFieldLabel>
                <TextArea
                  placeholder="To provide you with the best care possible, please share anything you'd like your provider to know before your visit"
                  size="2"
                  maxLength={250}
                  {...form.register('reason')}
                />
              </FormFieldContainer>
              <FormContainer form={form} onSubmit={bookSlot}>
                {policyAlreadySigned ? null : (
                  <FormFieldContainer>
                    <Flex direction="row" gap="2" align="center" mt="4">
                      <Checkbox
                        id="terms-and-conditions-checkbox"
                        size="3"
                        onCheckedChange={(checked: boolean) =>
                          form.setValue('userAgreed', checked)
                        }
                        {...form.register('userAgreed')}
                        highContrast
                      />
                      <FormFieldLabel
                        className="text-[14px] font-[400]"
                        id="terms-and-conditions-checkbox"
                      >
                        I agree to electronically sign the{'  '}
                        <Button
                          className="bg-transparent px-2 pt-[5px]"
                          variant="ghost"
                          onClick={() =>
                            setShowConsentView({
                              visible: true,
                              type: DocumentType.PRIVACY_PRACTICE,
                            })
                          }
                        >
                          Notice of Privacy Practice,
                        </Button>{' '}
                        <Button
                          className="bg-transparent px-2 pt-[5px]"
                          variant="ghost"
                          onClick={() =>
                            setShowConsentView({
                              visible: true,
                              type: DocumentType.PATIENT_SERVICE_AGREEMENT,
                            })
                          }
                        >
                          Patient Service Agreement,
                        </Button>{' '}
                        and{' '}
                        <Button
                          className="bg-transparent px-2 pt-[5px]"
                          variant="ghost"
                          onClick={() =>
                            setShowConsentView({
                              visible: true,
                              type: DocumentType.CONSENT_FOR_TREATMENT,
                            })
                          }
                        >
                          Consent for Treatment
                        </Button>
                      </FormFieldLabel>
                    </Flex>
                    <FormFieldError name="userAgreed" />
                  </FormFieldContainer>
                )}
                <Flex gap="3" justify="end" mt="2">
                  <CancelDialogButton size="3" />
                  <FormSubmitButton size="3" highContrast>
                    Book Appointment
                  </FormSubmitButton>
                </Flex>
              </FormContainer>
            </>
          ) : (
            <Flex gap="3" justify="end" mt="4">
              <Dialog.Close>
                <Button size="3" variant="outline" highContrast>
                  Done
                </Button>
              </Dialog.Close>
            </Flex>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
export { BookSlotButton }
