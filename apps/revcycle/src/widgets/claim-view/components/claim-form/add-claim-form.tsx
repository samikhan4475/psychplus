import * as Accordion from '@radix-ui/react-accordion'
import { FileIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Switch,
  Text,
} from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Form, useForm, validate } from '@psychplus/form'
import { AccidentAndLab } from './accident-and-lab'
import { AuthAndReferrals } from './auth-and-referrals'
import { BillingProvider } from './billing-provider'
import { Charges } from './charges'
import { ClaimAccordionItem } from './claim-accordion'
import { Diagnosis } from './diagnosis'
import { InsuranceTable } from './insurance-table'
import { SubmissionInformation } from './submission-information'
import { SubmissionResponse } from './submission-response'

const today = new Date()

const schema = z.object({
  name: validate.requiredString,
  effectiveFrom: validate.optionalString,
  effectiveTo: validate.optionalString,
  description: validate.optionalString,
  sequenceNumber: validate.optionalString,
  authNumber: validate.nullOrString,
  referralNumber: validate.nullOrString,
  claimNotes: validate.nullOrString,
  submission_date: validate.nullOrString,
  submission_batch: validate.nullOrString,
  system_validation_message: validate.nullOrString,
})

type SchemaType = z.infer<typeof schema>

const AddClaimForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      effectiveFrom: today.toISOString(),
      effectiveTo: today.toISOString(),
      description: '',
      sequenceNumber: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    console.log('onSubmit Data', data)
  }
  return (
    <Box className="px-2">
      <Form form={form} onSubmit={onSubmit}>
        <Flex
          justify="between"
          className="mb-2 border border-solid border-[#f7f6f6] py-1"
        >
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

        <Flex justify="between" className="mb-2">
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
            <Button className="h-25 ml-2 border border-solid border-[#8b8b8b] bg-transparent text-[#000]">
              HX
            </Button>
          </Box>
        </Flex>
        <Flex className="rounded-[5px] bg-[#EBF3FC] p-2">
          <Grid
            columns="2"
            gap="3"
            rows="repeat(2)"
            className=" mr-2 w-2/5 border-r border-solid border-[#a4a4a4]"
          >
            <Box>
              <Text size="2" className="pr-2 font-bold">
                Patient Name
              </Text>
              <Text size="2">Mustaq, Saqlain</Text>
            </Box>
            <Box>
              <Text size="2" className="pr-2 font-bold">
                Gender
              </Text>
              <Text size="2">Male</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                DOB
              </Text>
              <Text size="2">12/22/2003</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Account Number
              </Text>
              <Text size="2">31002</Text>
            </Box>
          </Grid>

          <Grid columns="4" gap="3" rows="repeat(2)" className=" w-3/5">
            <Box>
              <Text size="2" className="pr-2 font-bold">
                Billed
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Secondary Paid
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Write Off
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Last Modified By
              </Text>
              <Text size="2">-</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Primary Paid
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Patient Paid
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Balance
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Claim Status
              </Text>
              <Text size="2">New Charge</Text>
            </Box>
          </Grid>
        </Flex>

        <Accordion.Root type="single" className="w-full" collapsible>
          <ClaimAccordionItem title="Billing Provider">
            <BillingProvider form={form} />
          </ClaimAccordionItem>

          <ClaimAccordionItem title="Accidents And Labs">
            <AccidentAndLab form={form} />
          </ClaimAccordionItem>

          <ClaimAccordionItem title="Diagnosis">
            <Diagnosis form={form} />
          </ClaimAccordionItem>

          <ClaimAccordionItem
            title="Insurances"
            buttons={
              <Flex gap="3" align="center" justify="end">
                <Text as="label" size="2" weight="bold">
                  <Flex gap="2">
                    <Switch
                      size="1"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />{' '}
                    Show Inactive Plans
                  </Flex>
                </Text>

                <Text as="label" size="2" weight="bold">
                  <Flex gap="2">
                    <Switch
                      size="1"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />{' '}
                    Self Pay
                  </Flex>
                </Text>

                <Button
                  className="bg-[transparent] font-bold text-[#000]"
                  size="1"
                >
                  <PlusCircledIcon />
                  Add
                </Button>
              </Flex>
            }
          >
            <InsuranceTable />
          </ClaimAccordionItem>

          <ClaimAccordionItem title="Charges">
            <Charges />
          </ClaimAccordionItem>

          <Flex gap="3">
            <Box className="flex-1">
              <ClaimAccordionItem title="Authorizations and Referrals">
                <AuthAndReferrals form={form} />
              </ClaimAccordionItem>
            </Box>
            <Box className="flex-1">
              <ClaimAccordionItem title="Submission Information">
                <SubmissionInformation form={form} />
              </ClaimAccordionItem>
            </Box>
          </Flex>

          <ClaimAccordionItem title="Submission Response">
            <SubmissionResponse />
          </ClaimAccordionItem>
        </Accordion.Root>
      </Form>
    </Box>
  )
}

export { AddClaimForm, type SchemaType }
