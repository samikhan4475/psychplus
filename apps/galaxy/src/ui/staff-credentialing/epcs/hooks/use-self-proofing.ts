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
  const start = async (
    userId: string,
    callbackUrl: string,
    isVerificationInProgress: boolean,
  ) => {
    setLoading(true)
    if (!isVerificationInProgress) {
      let proofingType: ProofingType
      const proofingTypeResponse = await getProofingTypes(userId)

      if (proofingTypeResponse.state === 'error') {
        proofingType = ProofingType.mobile
      } else if (proofingTypeResponse.data.length) {
        const type = proofingTypeResponse.data[0]

        if (type.proofType === 'ial2xo' && type.abandonCount < 2) {
          proofingType = ProofingType.mobile
        } else {
          proofingType = ProofingType.web
        }
      } else {
        proofingType = ProofingType.mobile
      }

      const result = await selfStartProofing(
        userId,
        String(loginUserId),
        proofingType,
      )

      if (result.state === 'error') {
        toast.error(result.error)
        setLoading(false)
        return
      }
      toast.success('Self-proofing started successfully')
    }

    const launchResult = await launchProofing(
      callbackUrl,
      userId,
      String(loginUserId),
    )
    if (launchResult.state === 'error') {
      toast.error(launchResult.error || 'Failed to launch proofing')
      return
    }
    setIframeSrc(launchResult.data)
    setLoading(false)
  }

  return { start, loading, iframeSrc, setIframeSrc }
}
