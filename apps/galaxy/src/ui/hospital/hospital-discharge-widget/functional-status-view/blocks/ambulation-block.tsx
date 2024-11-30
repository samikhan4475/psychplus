import { SelectableChipDetails, YesNoSelect } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'
import { useFormContext } from 'react-hook-form'
import { Flex } from '@radix-ui/themes'

const BLOCK_ID = 'ambulationWNL'
const BLOCK_LABEL = 'Ambulation WNL'

const BLOCK_OPTIONS = [
    {
        label: 'Yes',
        value: 'Yes',
    },
    {
        label: 'No',
        value: 'No',
    },
]

const AmbulationWNLBlock = () => {
    const form = useFormContext<HospitalDischargeWidgetSchemaType>()
    const ambulationWNL = form.watch('ambulationWNL')
    return (
        <Flex>
            <YesNoSelect
                field={BLOCK_ID}
                options={BLOCK_OPTIONS}
                label={BLOCK_LABEL}
                lastOptionIndicator={true}
            />
            {
                ambulationWNL == "No" &&
                <SelectableChipDetails
                    key={"ambulationWNLDescription"}
                    label={"Text"}
                    type={'text'}
                    field={"ambulationWNLDescription"}
                    showIndicator={false}
                />
            }
        </Flex>
    )
}

export { AmbulationWNLBlock }
