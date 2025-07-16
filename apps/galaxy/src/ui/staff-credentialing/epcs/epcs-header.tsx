'use client'

import { useEffect, useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { RefreshCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as useGlobalStore } from '@/store'
import { cn } from '@/utils'
import { getSelfProofing } from '../client-actions'
import { CredentialingDialog } from './blocks/epcs-credentialing-dialog'
import { useSelfCredentialing } from './hooks/use-self-credentialing'
import { useSelfProofing } from './hooks/use-self-proofing'
import { useStore } from './store'

interface EPCSHeaderProps {
  userId: string | null
  staffId: string | null
}

const getEspcButtonLabel = (isVerified: boolean) =>
  isVerified ? 'ESPC Verified' : 'Start EPCS Verification'

const EPCSHeader = ({ userId, staffId }: EPCSHeaderProps) => {
  const { staff, loginUserId } = useGlobalStore((state) => ({
    staff: state.staffResource,
    loginUserId: state.user.id,
  }))
  const { epcsIframeLoaded, setEpcsIframeLoaded, refetch } = useStore(
    (state) => ({
      epcsIframeLoaded: state.epcsIframeLoaded,
      setEpcsIframeLoaded: state.setEpcsIframeLoaded,
      refetch: state.refetch,
    }),
  )

  const {
    start: startProofing,
    loading: proofingLoading,
    iframeSrc: proofingIframeSrc,
    setIframeSrc: setProofingIframeSrc,
  } = useSelfProofing()

  const {
    start: startCredentialing,
    loading: credentialingLoading,
    iframeSrc: credentialingIframeSrc,
    setIframeSrc: setCredentialingIframeSrc,
  } = useSelfCredentialing()

  const [verificationStatus, setVerificationStatus] = useState({
    isInProgress: null as boolean | null,
    isVerified: false,
    pendingSubStatus: null as string | null,
  })

  const fetchVerificationStatus = async () => {
    if (!userId) return

    const proofingTypeResponse = await getSelfProofing(
      userId,
      String(loginUserId),
    )

    if (proofingTypeResponse.state === 'error') {
      setVerificationStatus((prev) => ({ ...prev, isInProgress: false }))
      return
    }

    const { proofingTransaction, pendingProofing, subStatus } =
      proofingTypeResponse.data
    setVerificationStatus({
      isInProgress: proofingTransaction.pendingUserAction,
      isVerified: proofingTransaction.successfulProofing,
      pendingSubStatus: pendingProofing && subStatus ? subStatus : null,
    })
  }

  const handleStartProofing = () => {
    if (verificationStatus.pendingSubStatus === 'WTG_PROCESS') {
      toast.error('Proofing already in process')
      return
    }
    if (userId && typeof verificationStatus.isInProgress === 'boolean') {
      const callbackUrl = `${window.location.origin}/ehr/staff/${staffId}/credentialing?id=${userId}`
      startProofing(userId, callbackUrl, verificationStatus.isInProgress)
    } else {
      toast.error('User ID is required to start the proofing process')
    }
  }

  const handleStartCredentialing = () => {
    if (userId && staffId) {
      const callbackUrl = `${window.location.origin}/ehr/staff/${staffId}/credentialing?id=${userId}`
      startCredentialing(userId, callbackUrl)
    } else {
      toast.error('User ID and Staff ID are required to start credentialing')
    }
  }

  const handleProofingIframeLoad = (isOpen: boolean) => {
    if (!epcsIframeLoaded && proofingIframeSrc) {
      setEpcsIframeLoaded(true)
    } else {
      setProofingIframeSrc('')
      fetchVerificationStatus()
      setEpcsIframeLoaded(false)
    }
  }

  const handleCredentialingIframeLoad = (isOpen: boolean) => {
    if (!epcsIframeLoaded && credentialingIframeSrc) {
      setEpcsIframeLoaded(true)
    } else {
      setCredentialingIframeSrc('')
      setEpcsIframeLoaded(false)
    }
  }

  useEffect(() => {
    fetchVerificationStatus()
  }, [userId, loginUserId])

  const getButtonClassName = (isVerified: boolean) =>
    cn(`${isVerified ? 'text-pp-success-text' : 'text-black'}`)

  return (
    <>
      <Flex className="bg-white" p="2" align="center" justify="between">
        <Text size="4" weight="medium" className="min-w-[80px]">
          EPCS Manager
        </Text>
        <Flex gap="2" justify="end">
          <Button className="text-black bg-white gap-1 h-6 rounded-2 border border-solid" type="button" onClick={refetch}>
            <RefreshCcw className="text-pp-gray-3" width="16px" height="16px" />
            <Text className="text-pp-black-3 text-1">Refresh</Text>
          </Button>
          <Button
            color="gray"
            className={getButtonClassName(verificationStatus.isVerified)}
            size="1"
            variant="outline"
            type="button"
            onClick={handleStartProofing}
            disabled={
              proofingLoading ||
              verificationStatus.isInProgress === null ||
              verificationStatus.isVerified
            }
            loading={proofingLoading}
          >
            {getEspcButtonLabel(verificationStatus.isVerified)}
          </Button>
          <Button
            color="gray"
            className="text-black"
            size="1"
            variant="outline"
            type="button"
            onClick={handleStartCredentialing}
            disabled={credentialingLoading || !userId || !staffId}
            loading={credentialingLoading}
          >
            Start Self Credentialing
          </Button>
        </Flex>
      </Flex>

      <CredentialingDialog
        open={!!proofingIframeSrc}
        title="ID Proofing"
        staffName={staff?.legalName.firstName}
        iframeSrc={proofingIframeSrc}
        onClose={() => handleProofingIframeLoad(false)}
        onLoad={() => handleProofingIframeLoad(true)}
      />
      <CredentialingDialog
        open={!!credentialingIframeSrc}
        title="Credentialing"
        staffName={staff?.legalName.firstName}
        iframeSrc={credentialingIframeSrc}
        onClose={() => handleCredentialingIframeLoad(false)}
        onLoad={() => handleCredentialingIframeLoad(true)}
      />
    </>
  )
}

export { EPCSHeader }
