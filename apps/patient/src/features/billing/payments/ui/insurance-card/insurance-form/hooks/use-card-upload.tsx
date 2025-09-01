import { useState } from 'react'
import { uploadInsuranceCard } from '@/features/billing/payments/actions'

const useCardUpload = () => {
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )

  const uploadCards = async (
    policyId: string,
    isUnAuthenticated?: boolean,
    shortUrlReference?: string,
  ) => {
    const cardUploadPromises = []

    if (cardFrontImage) {
      cardUploadPromises.push(
        uploadInsuranceCard({
          file: cardFrontImage,
          side: 'Front',
          policyId,
          isUnAuthenticated,
          shortUrlReference
        }),
      )
    }

    if (cardBackImage) {
      cardUploadPromises.push(
        uploadInsuranceCard({
          file: cardBackImage,
          side: 'Back',
          policyId,
          isUnAuthenticated,
          shortUrlReference
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
