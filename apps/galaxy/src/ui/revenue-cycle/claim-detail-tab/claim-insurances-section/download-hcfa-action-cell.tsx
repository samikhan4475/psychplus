import { useState } from 'react'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { IconButton, Spinner, Tooltip } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DOWNLOAD_HCFA_FILE_ENDPOINT } from '@/api/endpoints'
import { InsuranceClaimPolicy } from '@/types'
import { useStore as useRootStore } from '../../store'
import { getRandomId, previewFile } from '../../utils'
import { ClaimUpdateSchemaType } from '../schema'

interface ActionsCellProps {
  item?: InsuranceClaimPolicy
}

const DownloadHcfaActionCell = ({ item }: ActionsCellProps) => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const { setSelectedPdfFileUrl, setActiveTab } = useRootStore((state) => ({
    setActiveTab: state.setActiveTab,
    setSelectedPdfFileUrl: state.setSelectedPdfFileUrl,
  }))
  const [loading, setLoading] = useState(false)
  const previewHcfaFile = async () => {
    const claimId = form.getValues('id')
    setLoading(true)
    try {
      const payload = {
        claimIds: [claimId],
        insurancePolicyPriority: item?.insurancePolicyPriority,
        claimType: 'Professional',
      }
      const url = await previewFile(
        DOWNLOAD_HCFA_FILE_ENDPOINT,
        `hcfa_file`,
        'POST',
        payload,
        true,
      )
      if (url) {
        setActiveTab('File ' + getRandomId())
        setSelectedPdfFileUrl(url)
      }
    } catch (error) {
      const message =
        (error instanceof Error && error.message) || 'Failed to download.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip content="View HCFA file">
      {loading ? (
        <Spinner size={'1'} />
      ) : (
        <EyeOpenIcon
          height={18}
          onClick={previewHcfaFile}
          className="cursor-pointer"
        />
      )}
    </Tooltip>
  )
}

export { DownloadHcfaActionCell }
