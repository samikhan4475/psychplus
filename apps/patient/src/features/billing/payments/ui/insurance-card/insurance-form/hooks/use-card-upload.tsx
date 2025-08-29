import { useState } from 'react'
import { uploadInsuranceCard } from '@/features/billing/payments/actions'

const useCardUpload = () => {
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )

  const uploadCards = async (policyId: string) => {
    const cardUploadPromises = []

    if (cardFrontImage) {
      cardUploadPromises.push(
        uploadInsuranceCard({
          file: cardFrontImage,
          side: 'Front',
          policyId,
        }),
      )
    }

    if (cardBackImage) {
      cardUploadPromises.push(
        uploadInsuranceCard({
          file: cardBackImage,
          side: 'Back',
          policyId,
        }),
      )
    }

    const cardUploadResponse = await Promise.all(cardUploadPromises)
    return cardUploadResponse.every((r) => r.ok)
  }

  return {
    cardFrontImage,
    cardBackImage,
    setCardFrontImage,
    setCardBackImage,
    uploadCards,
  }
}

export { useCardUpload }
