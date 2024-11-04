import { DateValue } from 'react-aria-components'
import { z } from 'zod'

type PastMedicalHxWidgetSchemaType = z.infer<typeof pastMedicalHxWidgetSchema>

const pastMedicalHxWidgetSchema = z
  .object({
    asthma: z.oboolean(),
    copd: z.oboolean(),
    htn: z.oboolean(),
    hld: z.oboolean(),
    dm: z.oboolean(),
    autoimmune: z.oboolean(),
    cad: z.oboolean(),
    stroke: z.oboolean(),
    migraines: z.oboolean(),
    headInjury: z.oboolean(),
    seizures: z.oboolean(),
    parkinsons: z.oboolean(),
    cirrhosis: z.oboolean(),
    hepatitis: z.oboolean(),
    hiv: z.oboolean(),
    sleepApnea: z.oboolean(),
    gerd: z.oboolean(),
    adhdAge: z.oboolean(),
    multipleSclerosis: z.oboolean(),
    kidneyDisease: z.oboolean(),
    kidneyStones: z.oboolean(),
    hypothyroidism: z.oboolean(),
    anemia: z.oboolean(),
    alzheimers: z.oboolean(),
    pregnant: z.oboolean(),
    pregnantDate: z.custom<DateValue | null>().optional(),
    breastFeeding: z.oboolean(),
    breastFeedingDaysPostPartum: z.coerce.number().optional(),
    communicable: z.oboolean(),
    measles: z.oboolean(),
    mumps: z.oboolean(),
    rubella: z.oboolean(),
    chickenPox: z.oboolean(),
    syphilis: z.oboolean(),
    rash: z.oboolean(),
    glaucoma: z.oboolean(),
    chlamydias: z.oboolean(),
    gonorrhea: z.oboolean(),
    gastricBypass: z.oboolean(),
    other: z.oboolean(),
    otherDetails: z.ostring(),
  })

  .refine(
    (data) => {
      return data.breastFeeding
        ? data.breastFeedingDaysPostPartum !== null &&
            data.breastFeedingDaysPostPartum !== undefined &&
            data.breastFeedingDaysPostPartum > 0
        : true
    },
    {
      message: 'required',
      path: ['breastFeedingDaysPostPartum'],
    },
  )
  .refine(
    (data) => {
      return data.other ? (data.otherDetails ?? '').trim().length > 0 : true
    },
    {
      message: 'required',
      path: ['otherDetails'],
    },
  )

export { pastMedicalHxWidgetSchema, type PastMedicalHxWidgetSchemaType }
