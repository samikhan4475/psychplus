'use client'

import { BlockLabel, FormFieldContainer } from '@/components'
import { PhysicalConditionBlock } from './blocks/physical-condition-block'
import { AmbulationWNLBlock } from './blocks/ambulation-block'
import { AbleToPerformADLBlock } from './blocks/able-to-perform-block'
import { SocialFunctioningWNLBlock } from './blocks/social-functioning-block'
import { ActivityBlock } from './blocks/activity-block'
import { DietBlock } from './blocks/diet-block'

const FunctionalStatusView = () => {
    return (
        <FormFieldContainer className="flex w-[750px] gap-2 border-[1px] border-[var(--bg-main,#D9E2FC)] rounded-md p-2">
            <BlockLabel >Functional Status</BlockLabel>
            <PhysicalConditionBlock />
            <AmbulationWNLBlock />
            <AbleToPerformADLBlock />
            <SocialFunctioningWNLBlock />
            <ActivityBlock />
            <DietBlock />
        </FormFieldContainer>
    )
}

export default FunctionalStatusView
