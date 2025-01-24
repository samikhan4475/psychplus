import React from 'react'
import { CredentialingView } from '@/ui/staff-credentialing'

interface StaffCredentialingPageProps {
  params: { id: string }
}

const StaffCredentialing = ({ params }: StaffCredentialingPageProps) => {
  return <CredentialingView staffId={params.id} />
}

export default StaffCredentialing
