'use client'

import { Box, Flex, Grid } from '@radix-ui/themes'
import { CosignerTextField } from './cosigner-text-field'
import { DirectSupervisionRadioButton } from './direct-supervision-radio-button'
import { IndirectSupervisionRadioButton } from './indirect-supervision-radio-button'

const StaffPreferencesCoSignerInfoView = () => {
  return (
    <>
      <Box className="bg-gray-3 px-3 py-1 text-1 font-medium">
        CoSigner Info
      </Box>
      <Flex gap="2" direction="column" px="3" py="2">
        <Grid columns="5" gap="2">
          <Box className="col-span-4">
            <CosignerTextField field="cosignerInfoDirectSupervisionText" label="Text" />
          </Box>
          <Box className="col-span-1 flex items-end">
            <DirectSupervisionRadioButton />
          </Box>
        </Grid>

        <Grid columns="5" gap="2">
          <Box className="col-span-4">
            <CosignerTextField field="cosignerInfoIndirectSupervisionText" label="Text" />
          </Box>
          <Box className="col-span-1 flex items-end">
            <IndirectSupervisionRadioButton />
          </Box>
        </Grid>
      </Flex>
    </>
  )
}

export { StaffPreferencesCoSignerInfoView }
