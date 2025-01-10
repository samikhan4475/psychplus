import { Suspense } from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { Appointment, StaffResource } from '@/types'
import { getAuthCookies } from '@/utils/auth'
import { AlertDialog } from './alert-dialog'
import { QuickNotesClearButton } from './quicknotes-clear-button'
import { QuickNotesCopyMyPreviousButton } from './quicknotes-copy-my-previous-button'
import { QuickNotesCopyPreviousButton } from './quicknotes-copy-previous-button'
import { QuickNotesCosignerDropdown } from './quicknotes-cosigner-dropdown'
import { QuickNotesDateInput } from './quicknotes-date-input'
import { QuickNotesDuration } from './quicknotes-duration'
import { QuickNotesLocationDropdown } from './quicknotes-location-dropdown'
import { QuickNotesProviderDropdown } from './quicknotes-provider-dropdown'
import { QuickNotesProviderTypeDropdown } from './quicknotes-provider-type-dropdown'
import { QuickNotesSaveButton } from './quicknotes-save-button'
import { QuickNotesServiceDropdown } from './quicknotes-service-dropdown'
import { QuickNotesSignButton } from './quicknotes-sign-button'
import { QuickNotesTimeDropdown } from './quicknotes-time-dropdown'
import { QuickNotesTitleDropdown } from './quicknotes-title-dropdown'
import { QuickNotesUploadButton } from './quicknotes-upload-button'
import { QuickNotesViewNoteButton } from './quicknotes-view-note-button'
import { QuickNotesVisitNumberDropdown } from './quicknotes-visit-number-dropdown'
import { QuickNotesVisitSequenceDropdown } from './quicknotes-visit-sequence-dropdown'
import { QuickNotesVisitTypeDropdown } from './quicknotes-visit-type-dropdown'

interface QuickNotesHeaderProps {
  appointment: Appointment
  appointmentProvider?: StaffResource
}

const QuickNotesHeader = async ({
  appointment,
  appointmentProvider,
}: QuickNotesHeaderProps) => {
  const auth = getAuthCookies()
  return (
    <Suspense
      fallback={
        <Flex className="bg-white h-[146px] border-b border-b-gray-5">
          <LoadingPlaceholder />
        </Flex>
      }
    >
      <Flex
        direction="column"
        mb="1"
        className="bg-white z-10 shadow-1"
        position="sticky"
        top="0"
      >
        <Flex align="center" justify="between" wrap="wrap" p="2">
          <Text size="4" weight="medium">
            Quick Notes
          </Text>
          <Flex gap="2" wrap="wrap">
            <QuickNotesViewNoteButton />
            <QuickNotesCopyPreviousButton />
            <QuickNotesCopyMyPreviousButton appointment={appointment} />
            <QuickNotesClearButton />
            <QuickNotesSaveButton />
            <QuickNotesUploadButton />
            <QuickNotesSignButton
              appointment={appointment}
              auth={auth}
              appointmentProvider={appointmentProvider}
            />
          </Flex>
        </Flex>
        <Separator className="w-full" />
        <Flex align="center" gap="2" wrap="wrap" p="2">
          <QuickNotesTitleDropdown title={appointment.visitNoteTitle} />
          <QuickNotesVisitTypeDropdown visitType={appointment.visitType} />
          <QuickNotesVisitSequenceDropdown
            visitSequence={appointment.visitSequence}
          />
          <QuickNotesProviderTypeDropdown
            providerType={appointment.providerType}
          />
          <QuickNotesProviderDropdown provider={appointment.providerName} />
          <QuickNotesCosignerDropdown
            cosigners={appointment?.cosigners ?? []}
          />
          <QuickNotesLocationDropdown location={appointment.locationName} />
          <QuickNotesServiceDropdown service={appointment.service} />
          <QuickNotesDateInput />
          <QuickNotesTimeDropdown />
          <QuickNotesDuration duration={appointment.duration} />
          <QuickNotesVisitNumberDropdown
            visitNo={appointment.encounterNumber}
          />
          <AlertDialog />
        </Flex>
      </Flex>
    </Suspense>
  )
}

export { QuickNotesHeader }
