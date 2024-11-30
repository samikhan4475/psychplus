'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
    GroupSelectSection,
    RadioSelectSection,
} from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../hospital-discharge-widget-schema'
import { cn } from '@/utils'

const BLOCK_ID = 'antiPsychotics'
const OPTIONS_ID = 'antiPsychoticOptions'
const BLOCK_LABEL = 'Antipsychotics'

const BLOCK_OPTIONS = [
    {
        label: '≤ 1',
        value: '≤ 1',
    },
    {
        label: '≥ 2',
        value: '≥ 2',
    },
]

const BLOCK_ANTI_PSYCHOTIC = [
    {
        label: 'Failed 3 trials of monotherapy',
        value: 'Failed 3 trials of monotherapy',
    },
    {
        label: 'Plan to taper to monotherapy',
        value: 'Plan to taper to monotherapy',
    },
    {
        label: 'Augment with clozapine',
        value: 'Augment with clozapine',
    },
]

const AntiPsychoticBlock = () => {
    const form = useFormContext<HospitalDischargeWidgetSchemaType>()
    const antiPsychotics = form.watch('antiPsychotics')
    return (
        <Flex>
            <RadioSelectSection
                label={BLOCK_LABEL}
                field={BLOCK_ID}
                options={BLOCK_OPTIONS}
                lastOptionIndicator={true}
            />
            {antiPsychotics == "≥ 2" &&
                <Flex className={cn('bg-pp-focus-bg-2 rounded-1 pl-1 flex-row')}>
                    <Text
                        weight="medium"
                        mr="1"
                        className="whitespace-nowrap text-[11px] flex items-center justify-center"
                    >
                     Select
                    </Text>
                    <Flex className='gap-1 bg-white'>
                        <GroupSelectSection
                            field={OPTIONS_ID}
                            options={BLOCK_ANTI_PSYCHOTIC}
                            hasChild
                        />
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}

export { AntiPsychoticBlock }
