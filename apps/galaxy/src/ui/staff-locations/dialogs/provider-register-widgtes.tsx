import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

export const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <Box>
    <Text as="div" size="1">
      <span className="font-medium">{label}: </span>
      <span className="text-gray-500">{value ?? '-'}</span>
    </Text>
  </Box>
)

export const Section = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <Flex
    direction="column"
    gap="2"
    p="4"
    className={`border-pp-gray-2 mt-2 rounded-3 border ${className}`}
  >
    {children}
  </Flex>
)

export const Grid = ({ children }: { children: React.ReactNode }) => (
  <Box className="grid w-full grid-cols-4 gap-4">{children}</Box>
)
