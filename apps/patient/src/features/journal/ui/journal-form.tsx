'use client'

import { useEffect, useState } from 'react'
import { useProfileStore } from '../../account/profile/store'
import { useJournalActions } from '../hooks'
import JournalInputSection from './journal-input-section'
import { useStore } from '../store'

const JournalForm = () => {
  const { fetchJournals } = useJournalActions()

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const {
    selectedDate,
  } = useStore((state) => ({
    selectedDate: state.selectedDate,
  }))
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (profile?.id) {
      fetchJournals();
      setIsEditing(false)
    }
  }, [selectedDate, profile?.id])

  return (
    <JournalInputSection
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    />
  )
}

export default JournalForm 