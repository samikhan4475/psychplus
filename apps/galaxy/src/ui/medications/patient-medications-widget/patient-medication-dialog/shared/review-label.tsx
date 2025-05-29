'use client'
import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
interface ReviewLabelProps {
    title?: string
    value?: string
}
const ReviewLabel = ({ title, value }: ReviewLabelProps) => {
    return (
        <Flex gap="1">
            <Text size="1" weight="medium">
                {title}
            </Text>
            <Text size="1" weight='regular' className="text-pp-gray-1">
                {value}
            </Text>
        </Flex>
    )
}

export { ReviewLabel }
