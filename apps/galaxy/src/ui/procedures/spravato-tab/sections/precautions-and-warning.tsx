import { Flex } from '@radix-ui/themes'
import { CheckboxInput, FormFieldContainer, YesNoSelect } from '@/components'
import { SectionHeading } from '@/ui/procedures/spravato-tab/sections/section-heading'

const PRECAUTION_OPTIONS = [
  {
    label:
      'The patient does not present with any indications of aneurysmal vascular disease, encompassing the thoracic and abdominal aorta, intracranial and peripheral arterial vessels, or conditions such as arteriovenous malformation and intracerebral hemorrhage. Moreover, there are no indications of hypersensitivity to esketamine, ketamine, or any of the excipients.',
    field: 'aneurysmalVascularDisease',
  },
  {
    label:
      'The patient has been assessed for pregnancy status, and it has been confirmed that the patient is not pregnant. Additionally, the patient has been informed about the potential risks of Spravato administration during pregnancy, including but not limited to fetal harm.',
    field: 'pregnancyStatus',
  },
  {
    label:
      'The patient has received thorough education regarding potential adverse reactions, encompassing but not limited to dissociation, dizziness, nausea, sedation, vertigo, hypoesthesia, anxiety, lethargy, increased blood pressure, vomiting, and sensations akin to intoxication.',
    field: 'adverseReactionsEducation',
  },
  {
    label:
      'The patient has been advised against driving or operating heavy machinery for up to 24 hours following their treatment.',
    field: 'postTreatmentSafety',
  },
]

const PrecautionsAndWarningSection = () => {
  return (
    <FormFieldContainer className='bg-white  p-2.5 shadow-2'>
        <SectionHeading title="Precautions & Warnings" />
        <Flex gap="4" direction="column">
          <CheckboxInput
            label={
              'The patient was assessed to determine if they are currently taking any of the following medication(s) that may cause sedation or blood pressure changes:'
            }
            labelClassName="max-w-max"
            field={'medicationAssessment'}
            defaultChecked
            disabled
          />

          <Flex
            className="border-pp-gray-2 mx-4 rounded-2 border p-3"
            direction="column"
            gap="1"
          >
            <YesNoSelect
              isNoFirst
              field="benzodiazepines"
              label="Benzodiazepines"
              required
            />
            <YesNoSelect
              isNoFirst
              field="nonBenzodiazepineSedativeHypnotic"
              label="Non-Benzodiazepine Sedative Hypnotic"
              required
            />
            <YesNoSelect
              isNoFirst
              field="psychostimulants"
              label="Psychostimulants"
              required
            />
            <YesNoSelect
              isNoFirst
              field="monoamineOxidaseInhibitors"
              label="Monoamine Oxidase Inhibitors (MAOIs)"
              required
            />
          </Flex>

          {PRECAUTION_OPTIONS.map((option) => (
            <CheckboxInput
              key={option.field}
              label={option.label}
              field={option.field}
              labelClassName="max-w-max"
              defaultChecked
            />
          ))}
        </Flex>
      </FormFieldContainer>
  )
}

export { PrecautionsAndWarningSection }
