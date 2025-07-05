import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as useGlobalStore } from '@/store'
import { launchCredentialing } from '../../actions/lauch-credentialing'

export const useSelfCredentialing = () => {
  const [loading, setLoading] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')
  const loginUserId = useGlobalStore((state) => state.user.id)
  const start = async (userId: string, callbackUrl: string) => {
    setLoading(true)
    const launchResult = await launchCredentialing(
      callbackUrl,
      userId,
      String(loginUserId),
    )
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
