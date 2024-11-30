import { SelectableChipDetails, YesNoSelect } from '@/components'
import { useFormContext } from 'react-hook-form'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'
import { Flex } from '@radix-ui/themes'

const BLOCK_ID = 'socialFunctioningWNL'
const BLOCK_LABEL = 'Social Functioning WNL'

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

const SocialFunctioningWNLBlock = () => {
    const form = useFormContext<HospitalDischargeWidgetSchemaType>()
    const socialFunctioningWNL = form.watch('socialFunctioningWNL')
    return (
        <Flex>
            <YesNoSelect
                field={BLOCK_ID}
                options={BLOCK_OPTIONS}
                label={BLOCK_LABEL}
                lastOptionIndicator={true}
            />
            {
                socialFunctioningWNL == "No" &&
                <SelectableChipDetails
                    key={"socialFunctioningWNLDescription"}
                    label={"Text"}
                    type={'text'}
                    field={"socialFunctioningWNLDescription"}
                    showIndicator={false}
                />
            }
        </Flex>
    )
}

export { SocialFunctioningWNLBlock }
