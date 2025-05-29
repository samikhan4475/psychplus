'use client'

import { Flex, Grid, ScrollArea } from '@radix-ui/themes'
import { FavoriteView, SearchDrugs } from '../shared'
import { StepComponentProps } from '../types'
import { DrugInteractionAccordian } from './drug-interaction-accordian'
import { PrescriptionAccordian } from './prescription-accordian'
import { TogglePrescribed } from './toggle-prescribed'

const FormFields = ({ onJump }: StepComponentProps) => {
  return (
    <Flex gap="2" justify="between" direction="column" className="relative">
      <Grid columns="2" gap="2">
        <Flex direction="column" gap="1" flexGrow="1">
          <TogglePrescribed />
          <SearchDrugs />
          <ScrollArea
            scrollbars="vertical"
            className="max-h-[52dvh] overflow-visible pr-2"
          >
            <DrugInteractionAccordian />
            <PrescriptionAccordian />
          </ScrollArea>
        </Flex>
        <FavoriteView onJump={onJump} />
      </Grid>
    </Flex>
  )
}

export { FormFields }
