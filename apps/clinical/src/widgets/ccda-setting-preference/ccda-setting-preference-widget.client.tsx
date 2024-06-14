'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { CcdaSettingPreferenceTable } from './components/ccda-setting-preference-table'

const CcdaSettingPreferenceWidgetClient = () => {
  return (
    <Box p="4">
      <Flex pb="1" justify="between" align="center">
        <Text className="font-bold">CCDA Setting Preference</Text>
      </Flex>
      <CcdaSettingPreferenceTable />
    </Box>
  )
}

export { CcdaSettingPreferenceWidgetClient }
