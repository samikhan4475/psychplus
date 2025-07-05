'use client'

import { getLocalTimeZone, isToday } from '@internationalized/date'
import { getCalendarDate } from '@psychplus-v2/utils'
import { cn } from '@psychplus/ui/cn'
import { Box } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ActionButtons, FileAttachmentList, FilePreviewModal, JournalHeader } from '.'
import { useStore } from '../store'
import { type UnifiedAttachment } from '../types'
import UpdateButtons from './update-buttons'

const RichTextEditor = dynamic(
  () =>
    import('../../../components/rich-text-editor/index.ts').then(
      (mod) => mod.RichTextEditor,
    ),
  { ssr: false },
)


interface JournalInputSectionProps {
  setIsEditing?: (value: boolean) => void
  isEditing?: boolean
}

const JournalInputSection = ({
  setIsEditing, isEditing
}: JournalInputSectionProps) => {

  const {
    selectedDate,
    currentJournalId,
    formData,
    setFormData,
  } = useStore((state) => ({
    selectedDate: state.selectedDate,
    journalEntries: state.journalEntries,
    currentJournalId: state.currentJournalId,
    formData: state.formData,
    setFormData: state.setFormData,
  }))

  const isCurrentDate = () => isToday(getCalendarDate(selectedDate), getLocalTimeZone())
  const showEditButton = !!currentJournalId && !isEditing
  const disabled = !!currentJournalId && !isEditing || (!currentJournalId && !isCurrentDate())
  const showActionButtons = (!currentJournalId && isCurrentDate()) || isEditing

  const [selectedFile, setSelectedFile] = useState<UnifiedAttachment | null>(null)

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
    })
  }

  const handleFileClick = (file: UnifiedAttachment) => {
    setSelectedFile(file)
  }

  const handleCloseModal = () => {
    setSelectedFile(null)
  }

  return (
    <>
      <Box className="border-pp-gray-2 sm:mx-5 mt-5 rounded-4 border">
        <JournalHeader
          disabled={disabled}
          showEditButton={showEditButton}
          onEdit={() => setIsEditing?.(true)}
        />

        <Box className={cn("h-[400px]", disabled && "opacity-50 pointer-events-none")}>
          <RichTextEditor
            key="journal-rich-text-editor"
            value={formData.content}
            onChange={handleContentChange}
            height="350px"
            placeholder="Enter journal content here"
            readOnly={disabled}
            maxLength={4000}
            style={{
              borderLeft: '0',
              borderRight: '0',
              borderBottom: '0'
            }}
          />
        </Box>
        <UpdateButtons disabled={disabled} showEditButton={showEditButton} onEdit={() => setIsEditing?.(true)} className='flex sm:hidden justify-end px-3 mr-0 my-3' />

        <FileAttachmentList
          disabled={disabled}
          onFileClick={handleFileClick}
        />
      </Box>

      {showActionButtons && (
        <ActionButtons
          setIsEditing={setIsEditing}
        />
      )}

      <FilePreviewModal
        selectedFile={selectedFile}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default JournalInputSection
