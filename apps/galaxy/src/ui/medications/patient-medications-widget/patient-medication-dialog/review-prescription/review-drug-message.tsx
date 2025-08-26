'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Info, TriangleAlert } from 'lucide-react'
import { useStore } from '../../store'
import { Prescription } from '../../types'

interface ReviewDrugMessageProps {
  drug?: Prescription
  type: 'warning' | 'info'
  description: React.ReactNode
}

const variantStyles = {
  warning: {
    bg: 'bg-pp-warning-bg-1',
    border: 'border-pp-warning-border',
    icon: 'text-pp-warning-border',
    Icon: TriangleAlert,
  },
  info: {
    bg: 'bg-pp-info-bg-1',
    border: 'border-pp-info-border',
    icon: 'text-pp-info-border',
    Icon: Info,
  },
}

const ReviewDrugMessage = ({
  drug,
  type,
  description,
}: ReviewDrugMessageProps) => {
  const { hasControlledMedication } = useStore((state) => ({
    hasControlledMedication: state.hasControlledMedication,
  }))

  const drugPrescription = drug?.prescriptionDrugs?.[0].isControlledSubstance

  if (type === 'warning' && !hasControlledMedication) return null
  if (!(type === 'warning' || (type === 'info' && drugPrescription)))
    return null

  const { bg, border, icon, Icon } = variantStyles[type]

  return (
    <Flex
      className={`${bg} ${border} mb-1 rounded-2 border p-1 px-2`}
      align="start"
      gap="3"
    >
      <Icon className={`min-w-6 ${icon}`} size={24} />
      <Text size="1" weight="regular">
        {description}
      </Text>
    </Flex>
  )
}

export { ReviewDrugMessage }
