'use client'

import React from 'react'
import { LinkIcon } from 'lucide-react'
import { Location } from '@/types'
import { AddLocationServiceDialog } from '../service'

interface AddServiceButtonProps {
  googleApiKey: string
  location: Location
}
const AddServiceButton = ({
  googleApiKey,
  location,
}: AddServiceButtonProps) => {
  return (
    <AddLocationServiceDialog
      googleApiKey={googleApiKey}
      location={location}
      title="Add Service"
    >
      <LinkIcon size={16} />
    </AddLocationServiceDialog>
  )
}

export { AddServiceButton }
