import { Flex, Separator, Text } from '@radix-ui/themes'
import { QuickNotesClearButton } from './quicknotes-clear-button'
import { QuickNotesCopyMyPreviousButton } from './quicknotes-copy-my-previous-button'
import { QuickNotesCopyPreviousButton } from './quicknotes-copy-previous-button'
import { QuickNotesCosignerDropdown } from './quicknotes-cosigner-dropdown'
import { QuickNotesDateInput } from './quicknotes-date-input'
import { QuickNotesLocationDropdown } from './quicknotes-location-dropdown'
import { QuickNotesPrintButton } from './quicknotes-print-button'
import { QuickNotesProviderDropdown } from './quicknotes-provider-dropdown'
import { QuickNotesProviderTypeDropdown } from './quicknotes-provider-type-dropdown'
import { QuickNotesSaveButton } from './quicknotes-save-button'
import { QuickNotesServiceDropdown } from './quicknotes-service-dropdown'
import { QuickNotesSignButton } from './quicknotes-sign-button'
import { QuickNotesTitleDropdown } from './quicknotes-title-dropdown'
import { QuickNotesUploadButton } from './quicknotes-upload-button'
import { QuickNotesViewNoteButton } from './quicknotes-view-note-button'
import { QuickNotesVisitTypeDropdown } from './quicknotes-visit-type-dropdown'
import { QuickNotesTimeDropdown } from './quicknotes-time-dropdown'
import { QuickNotesVisitNumberDropdown } from './quicknotes-visit-number-dropdown'

const QuickNotesHeader = () => {
  return (
    <Flex direction="column" mb="1" className="bg-white shadow-1 z-10" position="sticky" top="0">
      <Flex align="center" justify="between" wrap="wrap" p="2">
        <Text size="4" weight="medium">
          Quick Notes
        </Text>
        <Flex gap="2" wrap="wrap">
          <QuickNotesPrintButton />
          <QuickNotesViewNoteButton />
          <QuickNotesCopyPreviousButton />
          <QuickNotesCopyMyPreviousButton />
          <QuickNotesClearButton />
          <QuickNotesSaveButton />
          <QuickNotesUploadButton />
          <QuickNotesSignButton />
        </Flex>
      </Flex>
      <Separator className="w-full" />
      <Flex align="center" gap="2" wrap="wrap" p="2">
        <QuickNotesTitleDropdown />
        <QuickNotesVisitTypeDropdown />
        <QuickNotesProviderTypeDropdown />
        <QuickNotesProviderDropdown />
        <QuickNotesCosignerDropdown />
        <QuickNotesLocationDropdown />
        <QuickNotesServiceDropdown />
        <QuickNotesDateInput />
        <QuickNotesTimeDropdown />
        <QuickNotesVisitNumberDropdown />
      </Flex>
    </Flex>
  )
}

export { QuickNotesHeader }
