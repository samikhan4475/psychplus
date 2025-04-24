import { useState } from 'react'
import toast from 'react-hot-toast'
import { launchProofing } from '../../actions/launch-proofing'
import { selfStartProofing } from '../../actions/self-start-proofing'
import { useStore as useGlobalStore } from '@/store'

export const useSelfProofing = () => {
  const [loading, setLoading] = useState(false)
  const loginUserId = useGlobalStore((state) => state.user.id)
  const start = async (userId: string,callbackUrl: string) => {
    setLoading(true)
    const result = await selfStartProofing(userId,String(loginUserId))
    if (result.state === 'error') {
      toast.error(result.error)
      setLoading(false)
      return
    }

    toast.success('Self-proofing started successfully')

    const launchResult = await launchProofing(callbackUrl,userId,String(loginUserId))
    if (launchResult.state === 'error') {
      toast.error(launchResult.error || 'Failed to launch proofing')
      return
    }

    window.open(launchResult.data, '_blank')
    setLoading(false)
  }

  return { start, loading }
}
