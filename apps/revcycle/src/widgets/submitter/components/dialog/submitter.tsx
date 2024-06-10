'use client'
import { type SubmitHandler } from 'react-hook-form';
import { Box, Flex } from '@radix-ui/themes';
import {
    Form,
    FormSubmitButton,
    FormTextInput,
    useForm,
    FormSelect,
    validate
} from '@psychplus/form';
import { saveSubmitter, updateSubmitter } from '../../api.client';

import { z } from 'zod';

const schema = z.object({
    name: validate.requiredString,
    username: validate.requiredString,
    password: validate.requiredString,
    email: validate.requiredString.email('Please provide valid email'),
    submitterId: validate.requiredString,
    contactPerson: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    receiver: validate.requiredString,
    practiceName: validate.requiredString,
    addressLine1: validate.requiredString,
    city: validate.requiredString,
    state: validate.requiredString,
    zip: validate.requiredString.max(5),
    addressLine2: validate.requiredString
});

interface IOptions {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    submitterId?: string;
    contactPerson?: string;
    phone?: string;
    fax?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    id?: string;
}

const practiceList = [{
    id: "d3f4e8a1-7c4e-4b98-8d5e-3a8dbe2c5d39",
    name: "PSYCHIATRY OF TEXAS PLLC"
}, {
    id: "a2c9e9f7-5a4e-4126-a37d-7f6f614b4c57",
    name: "PSYCHIATRY OF HOUSTON",
}]

type SchemaType = z.infer<typeof schema>
interface IProps {
    options: { id: string, receiverName: string }[],
    refresh: () => void;
    optionalData: IOptions
}
const Submitter = (props: IProps) => {
    const form = useForm({
        schema,
        criteriaMode: 'all',
        defaultValues: props.optionalData || {},
    })

    const onSubmit: SubmitHandler<SchemaType> = (data) => {
        if (props.optionalData && props.optionalData.id) {
            updateSubmitter(props.optionalData.id, data)
                .then(() => {
                    props.refresh()
                })
        }
        saveSubmitter(data)
            .then(() => {
                props.refresh()
            })
    }

    return (
        <Form form={form} onSubmit={() => {
            onSubmit(form.getValues())
        }}>
            <Flex direction="column" gap="4" mb="4" px="1">
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Name *"
                            {...form.register('name')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="User Name *"
                            {...form.register('username')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="User Password"
                            {...form.register('password')}
                        />
                    </Box>
                </Flex>
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="User Email *"
                            {...form.register('email')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Submitter Id *"
                            {...form.register('submitterId')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Contact Person"
                            {...form.register('contactPerson')}
                        />
                    </Box>
                </Flex>
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Phone *"
                            {...form.register('phone')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Fax *"
                            {...form.register('fax')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormSelect
                            label="Receiver"
                            {...form.register('receiver')}
                            options={[...props.options].map(r => ({ label: r.receiverName, value: r.id }))}
                        />
                    </Box>
                </Flex>
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        <FormSelect
                            label="Practice Name"
                            {...form.register('practiceName')}
                            options={[...practiceList].map(r => ({ label: r.name, value: r.id }))}
                        />
                    </Box>
                </Flex>
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        Primary Address
                    </Box>
                </Flex>
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Address 1 *"
                            {...form.register('addressLine1')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Address 2"
                            {...form.register('addressLine2')}
                        />
                    </Box>
                </Flex>
                <Flex gap="4" mb="4" mt="4">
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="City"
                            {...form.register('city')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="State *"
                            {...form.register('state')}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <FormTextInput
                            label="Zip *"
                            {...form.register('zip')}
                        />
                    </Box>
                </Flex>
            </Flex>
            <Flex gap="3" justify="end">
                <FormSubmitButton
                    size="2"
                >
                    {props.optionalData ? 'Update' : 'Create'}
                </FormSubmitButton>
            </Flex>
        </Form>
    )
}

export { Submitter }
