import {
    Form,
    useForm,
    validate
} from '@psychplus/form'
import * as Accordion from '@radix-ui/react-accordion'
import { FileIcon } from '@radix-ui/react-icons'
import { Box, Button, Checkbox, Flex, Grid, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { BillingProvider } from '../billing-provider'
import { ClaimAccordionItem } from './claim-accordion'

const today = new Date()

const schema = z.object({
    name: validate.requiredString,
    effectiveFrom: z.date().optional(),
    effectiveTo: z.date().optional(),
    description: validate.optionalString,
    sequenceNumber: validate.optionalString,
})

type SchemaType = z.infer<typeof schema>


const AddClaimForm = () => {
    const form = useForm({
        schema,
        criteriaMode: 'all',
        defaultValues: {
            name: "",
            effectiveFrom: today,
            effectiveTo: today,
            description: "",
            sequenceNumber: "",
        },
    })

    const onSubmit: SubmitHandler<SchemaType> = async (data) => {
        console.log('onSubmit Data', data)
    }
    return (
        <Box className='px-2'>
            <Form form={form} onSubmit={onSubmit}>
                <Flex justify="between" className='border border-solid py-1 border-[#f7f6f6] mb-2'>
                    <Box>
                        <Text size="4" className="pt-2 font-bold">
                            Claim # 15543534
                        </Text>
                    </Box>
                    <Box>
                        <Button className="h-25 ml-2 bg-[#151B4A]">
                            <FileIcon /> Save
                        </Button>
                    </Box>
                </Flex>

                <Flex justify="between" className='mb-2'>
                    <Flex gap="2">
                        <Text as="label" size="2" weight="bold">
                            <Flex gap="2">
                                <Checkbox /> HCFA
                            </Flex>
                        </Text>

                        <Text as="label" size="2" weight="bold">
                            <Flex gap="2">
                                <Checkbox /> Ready to Send
                            </Flex>
                        </Text>

                        <Text as="label" size="2" weight="bold">
                            <Flex gap="2">
                                <Checkbox /> Hold Statement
                            </Flex>
                        </Text>

                        <Text as="label" size="2" weight="bold">
                            <Flex gap="2">
                                <Checkbox /> Hold Claim
                            </Flex>
                        </Text>

                        <Text as="label" size="2" weight="bold">
                            <Flex gap="2">
                                <Checkbox /> Mark as Submit
                            </Flex>
                        </Text>
                    </Flex>
                    <Box>
                        <Button className="h-25 ml-2 bg-transparent border border-solid border-[#8b8b8b] text-[#000]">
                            HX
                        </Button>
                    </Box>
                </Flex>

                <Grid columns="6" gap="3" rows="repeat(2)" width="auto" className='mb-2 bg-[#d3def6] p-2 rounded-[5px]'>
                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Patient Name
                        </Text>
                        <Text size="2">
                            Mustaq. Saqlain
                        </Text>
                    </Box>
                    <Box className='border-r border-solid'>
                        <Text size="2" className="pr-2 font-bold">
                            Gender
                        </Text>
                        <Text size="2">
                            Male
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Billed
                        </Text>
                        <Text size="2">
                            $0.00
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Secondary Paid
                        </Text>
                        <Text size="2">
                            $0.00
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Write Off
                        </Text>
                        <Text size="2">
                            $0.00
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Last Modified By
                        </Text>
                        <Text size="2">
                            -
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            DOB
                        </Text>
                        <Text size="2">
                            12/22/2003
                        </Text>
                    </Box>

                    <Box className='border-r border-solid'>
                        <Text size="2" className="pr-2 font-bold">
                            Account Number
                        </Text>
                        <Text size="2">
                            31002332
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Primary Paid
                        </Text>
                        <Text size="2">
                            $0.00
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Patient Paid
                        </Text>
                        <Text size="2">
                            $0.00
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Balance
                        </Text>
                        <Text size="2">
                            $0.00
                        </Text>
                    </Box>

                    <Box>
                        <Text size="2" className="pr-2 font-bold">
                            Claim Status
                        </Text>
                        <Text size="2">
                            New Charge
                        </Text>
                    </Box>
                </Grid>
                <Accordion.Root
                    type="single"
                    className="w-full"
                    collapsible
                >
                    <ClaimAccordionItem title="Billing Provider">
                        <BillingProvider form={form} />
                    </ClaimAccordionItem>
                </Accordion.Root>
            </Form>
        </Box>
    )
}

export { AddClaimForm, type SchemaType }
