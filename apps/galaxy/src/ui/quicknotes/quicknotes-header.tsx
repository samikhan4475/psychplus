'use client'

import { Flex, Separator, Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { AlertDialog } from './alert-dialog'
import { QuickNotesClearButton } from './quicknotes-clear-button'
import { QuickNotesCopyMyPreviousButton } from './quicknotes-copy-my-previous-button'
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
import { QuickNotesVisitMediumDropdown } from './quicknotes-visit-medium-dropdown'
import { QuickNotesVisitNumberDropdown } from './quicknotes-visit-number-dropdown'
import { QuickNotesVisitSequenceDropdown } from './quicknotes-visit-sequence-dropdown'
import { QuickNotesVisitTypeDropdown } from './quicknotes-visit-type-dropdown'

interface QuickNotesHeaderProps {
  appointment: Appointment
}

const QuickNotesHeader = ({ appointment }: QuickNotesHeaderProps) => {
  return (
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
          <QuickNotesCopyMyPreviousButton appointment={appointment} />
          <QuickNotesClearButton />
          <QuickNotesSaveButton  appointment={appointment} />
          <QuickNotesUploadButton />
          <QuickNotesSignButton appointment={appointment} />
        </Flex>
      </Flex>
      <Separator className="w-full" />
      <Flex align="center" gap="2" wrap="wrap" p="2">
        <QuickNotesTitleDropdown title={appointment.visitNoteTitle ?? 'NA'} />
        <QuickNotesVisitTypeDropdown visitType={appointment.visitType} />
        <QuickNotesVisitSequenceDropdown
          visitSequence={appointment.visitSequence}
        />
        <QuickNotesProviderTypeDropdown
          providerType={appointment.providerType}
        />
        <QuickNotesVisitMediumDropdown visitMedium={appointment.type} />
        <QuickNotesProviderDropdown provider={appointment.providerName} />
        <QuickNotesCosignerDropdown cosigners={appointment?.cosigners ?? []} />
        <QuickNotesLocationDropdown location={appointment.locationName} />
        <QuickNotesServiceDropdown service={appointment.service} />
        <QuickNotesDateInput />
        <QuickNotesTimeDropdown />
        <QuickNotesDuration duration={appointment.duration} />
        <QuickNotesVisitNumberDropdown visitNo={appointment.encounterNumber} />
        <AlertDialog />
      </Flex>
    </Flex>
  )
}

export { QuickNotesHeader }
