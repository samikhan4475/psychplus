import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as useGlobalStore } from '@/store'
import { getProofingTypes } from '../../actions'
import { launchProofing } from '../../actions/launch-proofing'
import { selfStartProofing } from '../../actions/self-start-proofing'
import { ProofingType } from '../../types'

export const useSelfProofing = () => {
  const [loading, setLoading] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')
  const loginUserId = useGlobalStore((state) => state.user.id)

  const handleSelfStart = async (userId: string): Promise<boolean> => {
    let proofingType: ProofingType
    const proofingTypeResponse = await getProofingTypes(userId)

    if (proofingTypeResponse.state === 'error') {
      proofingType = ProofingType.mobile
    } else if (proofingTypeResponse.data.length) {
      const type = proofingTypeResponse.data[0]
      proofingType =
        type.proofType === 'ial2xo' && type.abandonCount < 2
          ? ProofingType.mobile
          : ProofingType.web
    } else {
      proofingType = ProofingType.mobile
    }

    const result = await selfStartProofing(userId, String(loginUserId), proofingType)

    if (result.state === 'error') {
      toast.error(result.error)
      return false
    }

    toast.success('Self-proofing started successfully')
    return true
  }

  const start = async (
    userId: string,
    callbackUrl: string,
    isVerificationInProgress: boolean,
    skipSelfStart?: boolean,
  ) => {
    setLoading(true)

    if (skipSelfStart) {
      const launchResult = await launchProofing(callbackUrl, userId, String(loginUserId))

      if (launchResult.state === 'error') {
        const selfStarted = await handleSelfStart(userId)
        if (!selfStarted) {
          setLoading(false)
          return
        }

        const retryLaunch = await launchProofing(callbackUrl, userId, String(loginUserId))
        if (retryLaunch.state === 'error') {
          toast.error(retryLaunch.error || 'Failed to launch proofing')
          setLoading(false)
          return
        }

        setIframeSrc(retryLaunch.data)
        setLoading(false)
        return
      }

      setIframeSrc(launchResult.data)
      setLoading(false)
      return
    }

    if (!isVerificationInProgress) {
      const selfStarted = await handleSelfStart(userId)
      if (!selfStarted) {
        setLoading(false)
        return
      }
    }

    const launchResult = await launchProofing(callbackUrl, userId, String(loginUserId))
    if (launchResult.state === 'error') {
      toast.error(launchResult.error || 'Failed to launch proofing')
      setLoading(false)
      return
    }

    setIframeSrc(launchResult.data)
    setLoading(false)
  }

  return { start, loading, iframeSrc, setIframeSrc }
}