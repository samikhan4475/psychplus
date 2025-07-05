'use client'

import { useToast } from '@/providers/toast-provider'
import { RecordStatus } from '@/types/feature-flag'
import { useState } from 'react'
import { CalendarDateTime, getLocalTimeZone, today } from '@internationalized/date'
import { useProfileStore } from '../../account/profile/store'
import { createJournalAction } from '../actions/create-journal'
import { deleteAttachmentAction } from '../actions/delete-attachment'
import { searchJournalAction } from '../actions/search-journal'
import { updateJournalAction } from '../actions/update-journal'
import { downloadJournalAttachment } from '../api/download-attachment'
import { uploadJournalAttachments } from '../api/upload-attachments'
import { useStore, type JournalFormData } from '../store'
import { JournalAttachment, type UnifiedAttachment } from '../types'
import { convertExistingAttachments, getFileExtension, isValidExtension } from '../utils'

export const useJournalActions = () => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const {
    journalEntries,
    currentJournalId,
    selectedDate,
    setJournalEntries,
    setCurrentJournalId,
    setFormData,
    setIsLoading,
    formData
  } = useStore((state) => ({
    journalEntries: state.journalEntries,
    currentJournalId: state.currentJournalId,
    selectedDate: state.selectedDate,
    setJournalEntries: state.setJournalEntries,
    setCurrentJournalId: state.setCurrentJournalId,
    setFormData: state.setFormData,
    setIsLoading: state.setIsLoading,
    formData: state.formData,
  }))

  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const { toast } = useToast()

  const updateJournalEntries = (formData: JournalFormData) => {

    setJournalEntries([{
      ...journalEntries[0],
      attachments: formData.attachments
        .filter((att) => att.isExisting && att.journalAttachmentId)
        .map((att) => ({
          journalAttachmentId: att.journalAttachmentId!,
          fileName: att.name,
          fileType: att.type,
          attachmentUrl: att.url || '',
          recordStatus: RecordStatus.ACTIVE,
          journalId: currentJournalId || '',
          metadata: {
            createdOn: new Date().toISOString(),
            createdBy: profile?.id || 0,
            createdByFullName: profile ? `${profile.legalName.firstName} ${profile.legalName.lastName}` : '',
            updatedOn: new Date().toISOString(),
            updatedBy: profile?.id || 0,
            updatedByFullName: profile ? `${profile.legalName.firstName} ${profile.legalName.lastName}` : '',
          },
        })),
      title: formData.title,
      notes: formData.content,
    }])
  }

  const fetchJournals = async () => {
    if (!profile) return

    setIsLoading(true)
    
    // Parse the selected date (e.g., "2025-07-02") and convert to UTC properly
    const [year, month, day] = selectedDate.split('-').map(Number)
    
    // Create start of day in local timezone, then convert to UTC
    const startOfDay = new CalendarDateTime(year, month, day, 0, 0, 0)
    const fromDate = startOfDay.toDate(getLocalTimeZone()).toISOString()
    
    // Check if selected date is today
    const todayDate = today(getLocalTimeZone())
    const isSelectedDateToday = todayDate.year === year && todayDate.month === month && todayDate.day === day
    
    const payload: { fromDate: string; toDate?: string } = {
      fromDate,
    }
    
    // Only include toDate if the selected date is not today
    if (!isSelectedDateToday) {
      // Create end of day in local timezone, then convert to UTC
      const endOfDay = new CalendarDateTime(year, month, day, 23, 59, 59, 999)
      const toDate = endOfDay.toDate(getLocalTimeZone()).toISOString()
      payload.toDate = toDate
    }

    const response = await searchJournalAction(profile.id, payload)

    if (response.state === 'error') {
      toast({
        title: 'Failed to fetch journals',
        description: response.error,
        type: 'error',
      })
      setFormData({
        title: '',
        content: '',
        attachments: [],
      })
      setCurrentJournalId(null)
      return
    }

    setJournalEntries(response.data)

    if (response.data.length > 0) {
      const existingAttachments = convertExistingAttachments(
        response.data[0].attachments || [],
      )
      setFormData({
        title: response.data[0].title,
        content: response.data[0].notes,
        attachments: existingAttachments,
      })
      setCurrentJournalId(response.data[0].journalId)
    } else {
      setFormData({
        title: '',
        content: '',
        attachments: [],
      })
      setCurrentJournalId(null)
    }
  }

  const createJournal = async (
    formData: JournalFormData,
  ): Promise<string | null> => {
    if (!profile) {
      toast({
        title: 'Profile not available',
        type: 'error',
      })
      return null
    }

    if (!formData.title.trim()) {
      toast({
        title: 'Title is required',
        type: 'error',
      })
      return null
    }

    if (!formData.content.trim()) {
      toast({
        title: 'Content is required',
        type: 'error',
      })
      return null
    }

    setIsCreating(true)
    const now = new Date().toISOString()

    const payload = {
      metadata: {
        createdOn: now,
        createdBy: profile.id,
        createdByFullName: `${profile.legalName.firstName} ${profile.legalName.lastName}`,
        updatedOn: now,
        updatedBy: profile.id,
        updatedByFullName: `${profile.legalName.firstName} ${profile.legalName.lastName}`,
      },
      recordStatus: 'Active',
      title: formData.title.trim(),
      notes: formData.content.trim(),
      journalNotes: [],
      attachments: [],
    }

    const response = await createJournalAction(profile.id, payload)

    if (response.state === 'error') {
      toast({
        title: 'Failed to create journal',
        description: response.error,
        type: 'error',
      })
      setIsCreating(false)
      return null
    }

    toast({
      title: 'Journal created successfully',
      type: 'success',
    })

    updateJournalEntries(formData)
    fetchJournals()

    setIsCreating(false)
    return response.data.journalId
  }

  const updateJournal = async (
    formData: JournalFormData,
  ): Promise<string | null> => {
    if (!profile) {
      toast({
        title: 'Profile not available',
        type: 'error',
      })
      return null
    }

    if (!currentJournalId) {
      toast({
        title: 'No journal selected for update',
        type: 'error',
      })
      return null
    }

    if (!formData.title.trim()) {
      toast({
        title: 'Title is required',
        type: 'error',
      })
      return null
    }

    if (!formData.content.trim()) {
      toast({
        title: 'Content is required',
        type: 'error',
      })
      return null
    }

    setIsUpdating(true)
    const now = new Date().toISOString()

    const payload = {
      metadata: {
        createdOn: journalEntries[0].metadata.createdOn,
        createdBy: journalEntries[0].metadata.createdBy || profile.id,
        createdByFullName:
          journalEntries[0].metadata.createdByFullName ||
          `${profile.legalName.firstName} ${profile.legalName.lastName}`,
        updatedOn: now,
        updatedBy: profile.id,
        updatedByFullName: `${profile.legalName.firstName} ${profile.legalName.lastName}`,
      },
      recordStatus: 'Active',
      title: formData.title.trim(),
      notes: formData.content.trim(),
      journalNotes: [],
      attachments: [],
    }

    const response = await updateJournalAction(
      profile.id,
      currentJournalId,
      payload,
    )

    if (response.state === 'error') {
      toast({
        title: 'Failed to update journal',
        description: response.error,
        type: 'error',
      })
      setIsUpdating(false)
      return null
    }

    toast({
      title: 'Journal updated successfully',
      type: 'success',
    })

    updateJournalEntries(formData)
    fetchJournals()

    setIsUpdating(false)
    return response.data.journalId
  }

  const uploadAttachments = async (
    journalId: string,
    attachments: UnifiedAttachment[],
  ): Promise<boolean> => {
    if (!profile) {
      toast({
        title: 'Profile not available',
        type: 'error',
      })
      return false
    }

    const newAttachments = attachments.filter(
      (att) => !att.isExisting && att.file,
    )

    if (newAttachments.length === 0) {
      return true
    }

    setIsUploading(true)

    const uploadResponse = await uploadJournalAttachments(
      String(profile.id),
      journalId,
      newAttachments.map((f) => f.file!),
    )

    if (uploadResponse.state === 'success') {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...(uploadResponse.data?.attachments || []).map((att: JournalAttachment) => ({
          id: att.journalAttachmentId,
          isExisting: true,
          journalAttachmentId: att.journalAttachmentId,
          name: att.fileName || 'Unknown file',
          type: att.fileType,
        }))]
      })
      toast({
        title: 'Attachments uploaded successfully',
        type: 'success',
      })
      setIsUploading(false)
      fetchJournals()
      return true
    } else {
      toast({
        title: 'Failed to upload attachments',
        description: uploadResponse.error || 'Unknown error',
        type: 'error',
      })
      setIsUploading(false)
      return false
    }
  }

  const downloadAttachment = async (
    attachment: UnifiedAttachment,
    patientId: string,
  ) => {
    if (!attachment.isExisting || !attachment.journalAttachmentId || !patientId || !currentJournalId) {
      if (attachment.url) {
        // For non-existing attachments with URLs, just download
        downloadFile(attachment.url, attachment.name)
      }
      return
    }

    const response = await downloadJournalAttachment(
      patientId,
      currentJournalId,
      attachment.journalAttachmentId
    )

    if (response.state === 'success' && response.data) {
      // Get MIME type from the blob
      const mimeType = response.data.type
      
      // Create object URL from the blob
      const url = window.URL.createObjectURL(response.data)
      
      // Get proper file extension
      let fileName = attachment.name
      const fileExtension = getFileExtension(fileName, mimeType)
      
      // Ensure filename has proper extension
      if (!fileName.includes('.') || !isValidExtension(fileName.split('.').pop() || '')) {
        fileName = `${fileName}${fileExtension}`
      }
      
      // Download the file
      downloadFile(url, fileName)
      
      // Clean up the object URL after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 2000)

      toast({
        title: 'Attachment downloaded successfully',
        type: 'success',
      })
    } else if (response.state === 'error') {
      toast({
        title: 'Failed to download attachment',
        description: response.error || 'Unknown error',
        type: 'error',
      })
    }
  }

  // Helper function to download a file
  const downloadFile = (url: string, fileName: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const deleteAttachment = async (
    attachment: UnifiedAttachment,
    patientId: string,
  ) => {
    if (!attachment.isExisting) {
      setFormData({
        ...formData,
        attachments: formData.attachments.filter((file) => file.id !== attachment.id),
      })
      return
    }

    if (!attachment.journalAttachmentId || !patientId || !currentJournalId) {
      toast({
        title: 'Cannot delete attachment',
        description: 'Missing required information',
        type: 'error',
      })
      return
    }

    const response = await deleteAttachmentAction(
      patientId,
      currentJournalId,
      attachment.journalAttachmentId
    )

    if (response.state === 'success') {
      setFormData({
        ...formData,
        attachments: formData.attachments.filter((file) => file.id !== attachment.id),
      })
      setJournalEntries([{
        ...journalEntries[0],
        attachments: journalEntries[0].attachments.filter((file) => file.journalAttachmentId !== attachment.journalAttachmentId),
      }])
      toast({
        title: 'Attachment deleted successfully',
        type: 'success',
      })
      fetchJournals()
    } else if (response.state === 'error') {
      toast({
        title: 'Failed to delete attachment',
        description: response.error || 'Unknown error',
        type: 'error',
      })
    }
  }

  return {
    fetchJournals,
    createJournal,
    updateJournal,
    uploadAttachments,
    downloadAttachment,
    deleteAttachment,
    isCreating,
    isUpdating,
    isUploading,
    currentJournalId,
    journalEntries,
  }
}
