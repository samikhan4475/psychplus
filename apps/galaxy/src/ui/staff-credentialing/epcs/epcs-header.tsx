'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { cn } from '@/utils'
import { getSelfProofing } from '../client-actions'
import { useSelfProofing } from './hooks/use-self-proofing'
import { useStore } from './store'

interface EPCSHeaderProps {
  userId: string | null
  staffId: string | null
}
const EPCSHeader = ({ userId, staffId }: EPCSHeaderProps) => {
  const { start, loading, iframeSrc, setIframeSrc } = useSelfProofing()
  const [isVerificationInProgress, setIsVerificationInProgress] = useState<
    boolean | null
  >(null)
  const [isEpcsVerified, setIsEpcsVerified] = useState(false)
  const { staff, loginUserId } = useGlobalStore((state) => ({
    staff: state.staffResource,
    loginUserId: state.user.id,
  }))
  const { epcsIframeLoaded, setEpcsIframeLoaded } = useStore((state) => ({
    epcsIframeLoaded: state.epcsIframeLoaded,
    setEpcsIframeLoaded: state.setEpcsIframeLoaded,
  }))

  const handleStart = () => {
    if (userId && typeof isVerificationInProgress === 'boolean') {
      const callbackUrl = `${window.location.origin}/ehr/staff/${staffId}/credentialing?id=${userId}`
      start(userId, callbackUrl, isVerificationInProgress)
    } else {
      toast.error('User ID is required to start the proofing process')
    }
  }

  const fetchVerificationStatus = async () => {
    if (!userId) return
    const proofingTypeResponse = await getSelfProofing(
      userId,
      String(loginUserId),
    )
    if (proofingTypeResponse.state === 'error') {
      setIsVerificationInProgress(false)
      return
    }
    if (proofingTypeResponse.data.proofingTransaction.successfulProofing) {
      setIsEpcsVerified(true)
      setIsVerificationInProgress(false)
      return
    }
    const isPending =
      proofingTypeResponse.data.proofingTransaction.pendingUserAction
    setIsVerificationInProgress(isPending)
  }

  const handleLoad = () => {
    if (!epcsIframeLoaded && iframeSrc) {
      handleOpen()
    } else {
      handleClose()
    }
  }

  const handleClose = async () => {
    setIframeSrc('')
    setIsVerificationInProgress(null)
    await fetchVerificationStatus()
    setEpcsIframeLoaded(false)
  }

  const handleOpen = () => {
    setEpcsIframeLoaded(true)
  }

  useEffect(() => {
    fetchVerificationStatus()
  }, [])

  return (
    <>
      <Flex direction="column" gap="1" className="bg-pp-bg-accent">
        <Flex className="bg-white" p="2" align="center" justify="between">
          <Text size="4" weight="medium" className="min-w-[80px]">
            EPCS Manager
          </Text>
          <Button
            color="gray"
            className={cn(
              `${isEpcsVerified ? 'text-pp-success-text' : 'text-black'} `,
            )}
            size="1"
            variant="outline"
            type="button"
            onClick={handleStart}
            disabled={
              loading || isVerificationInProgress === null || isEpcsVerified
            }
            loading={loading}
          >
            {getEspcButtonLabel(isEpcsVerified)}
          </Button>
        </Flex>
      </Flex>
      <Dialog.Root open={!!iframeSrc}>
        <Dialog.Content className=" h-[800px] max-w-[1200px] overflow-hidden pb-16">
          <Flex justify="between" className="mb-4">
            <Text size="5" weight="medium">
              ID Proofing {staff?.legalName.firstName}
            </Text>
            <CloseDialogTrigger onClick={handleClose} />
          </Flex>
          <iframe
            src={iframeSrc}
            title="EPCS Verification"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              display: iframeSrc ? 'block' : 'none',
            }}
            onLoad={handleLoad}
          />
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export { EPCSHeader }

const getEspcButtonLabel = (isVerified: boolean) =>
  isVerified ? 'ESPC Verified' : 'Start EPCS Verification'
