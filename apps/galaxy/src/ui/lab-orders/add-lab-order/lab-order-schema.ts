import { DateValue } from 'react-aria-components'
import { z } from 'zod'

type LabOrderSchemaType = z.infer<typeof labOrderSchema>

const specimenSchema = z
  .array(
    z.object({
      id: z.string().optional(),
      collectionReceivedDateTime: z.string().optional(),
      collectedOn: z.string().optional(),
      newSpecimen: z.boolean().optional(),
      TestId: z.string().optional(),
      specimenType: z.string().optional(),
      specimenAdditives: z.string().optional(),
      collectionMethod: z.string().optional(),
      sourceSite: z.string().optional(),
      sourceSiteModifier: z.string().optional(),
      role: z.string().optional(),
      StartDate: z.string(),
      StartTime: z.string(),
      EndDate: z.string(),
      EndTime: z.string(),
      volume: z.number().or(z.string()).optional(),
      measureUnit: z.string().optional(),
      rejectReason: z.string().optional(),
      containerCondition: z.string().optional(),
      orderId: z.string().optional(),
    }),
  )
  .default([])

const labOrderSchema = z
  .object({
    testLabs: z
      .array(
        z.object({
          id: z.string().optional(),
          recordStatus: z.string().optional(),
          orderId: z.string().optional(),
          labTestCode: z.string().optional(),
          testName: z.string().optional(),
          labTestCodeType: z.string().optional(),
          labAssignedCode: z.string().optional(),
          temperatureType: z.string().optional(),
          papIndicator: z.string().optional(),
          labTestAnswers: z.array(z.object({})).optional(),
          consolidatorId: z.string().optional(),
          cptCode: z.string().optional(),
          testCode: z.string().optional(),
          askAtOrderEntries: z.array(z.object({})).optional(),
          labTestId: z.string().optional(),
          isNewTestLab: z.boolean().optional(),
        }),
      )
      .default([]),
    diagnosis: z
      .array(
        z.object({
          id: z.number().or(z.string()).optional(),
          metadata: z.object({}).optional(),
          newDignoses: z.boolean().optional(),
          isActive: z.boolean().optional(),
          symptomCode: z.string().optional(),
          description: z.string().optional(),
          activeStatus: z.string().optional(),
          symptomCodeDescription: z.string().optional(),
          diagnosisDescription: z.string().optional(),
          diagnosisCode: z.string().optional(),
          code: z.string().optional(),
          checked: z.boolean().optional(),
          disabled: z.boolean().optional(),
          recordStatus: z.string().optional(),
          temperatureType: z.string().optional(),
          papIndicator: z.string().optional(),
        }),
      )
      .default([]),

    labOrderId: z.string().optional(),
    orderDate: z.custom<DateValue>().optional(),
    orderTime: z.string().optional(),
    labLocation: z.string().optional(),
    labLocationData: z
      .object({
        id: z.string().optional(),
        name: z.string().optional(),
      })
      .optional(),
    labBillingType: z.string().optional(),
    labOrderStatus: z.string().optional(),
    providerName: z.string().optional(),
    providerDetail: z.any().optional(),
    isFasting: z.string().optional(),
    isPSCHold: z.string().optional(),
    specimenList: specimenSchema,
    labQuestions: z.any({}).optional(),
    orderingStaffName: z.string().optional(),
    labOrderNumber: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    const validations = [
      {
        condition: !data?.labLocation,
        path: ['labLocation'],
      },
      {
        condition: !data?.providerName,
        path: ['providerName'],
      },
      {
        condition: !data?.isFasting,
        path: ['isFasting'],
      },
      {
        condition: !data?.isPSCHold,
        path: ['isPSCHold'],
      },
      {
        condition: !data?.labBillingType,
        path: ['labBillingType'],
      },
      {
        condition: data?.testLabs.length === 0,
        path: ['testLabs'],
      },
      {
        condition: data?.diagnosis.length === 0,
        path: ['diagnosis'],
      },
      {
        condition: !data?.orderDate,
        path: ['orderDate'],
      },
      {
        condition: !data?.labOrderStatus,
        path: ['labOrderStatus'],
      },
    ]

    if (data.specimenList && data.specimenList.length > 0) {
      data.specimenList.forEach((item, index) => {
        validations.push(
          ...[
            {
              condition: !item?.TestId,
              path: [`specimenList.${index}.TestId`],
            },
            {
              condition: !item?.specimenType,
              path: [`specimenList.${index}.specimenType`],
            },
            {
              condition: !item?.specimenAdditives,
              path: [`specimenList.${index}.specimenAdditives`],
            },
            {
              condition: !item?.collectionMethod,
              path: [`specimenList.${index}.collectionMethod`],
            },
            {
              condition: !item?.StartDate,
              path: [`specimenList.${index}.StartDate`],
            },
            {
              condition: !item?.StartTime,
              path: [`specimenList.${index}.StartTime`],
            },
            {
              condition: !item?.EndDate,
              path: [`specimenList.${index}.EndDate`],
            },
            {
              condition: !item?.EndTime,
              path: [`specimenList.${index}.EndTime`],
            },
            {
              condition: !item?.volume,
              path: [`specimenList.${index}.volume`],
            },
          ],
        )
      })
    }

    if (data.labQuestions && Object.keys(data.labQuestions).length > 0) {
      const keys = Object.keys(data.labQuestions)
      keys.forEach((item) => {
        const { answer, isRequired } = data.labQuestions[item]
        if (isRequired && !answer) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`labQuestions[${item}].answer`],
            message: 'Required',
          })
        }
      })
    }

    validations.forEach((item) => {
      if (item.condition) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: item.path,
          message: 'Required',
        })
      }
    })
  })

export { labOrderSchema, type LabOrderSchemaType }
