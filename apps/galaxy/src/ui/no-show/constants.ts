export const NoSowDefaultValues = {
  patientContactedTwiceQ1: undefined,
  patientRespondedQ2: undefined,
  safetyConcernQ3: undefined,
  welfareCheckDoneQ4: undefined,
  patientResponseQ5: undefined,
  patientEducatedQ6: undefined,
  comments: '',
}

export const NO_SHOW_QUESTIONS = [
  {
    id: 1,
    question: 'Patient was called or texted at least twice',
    field: 'patientContactedTwiceQ1',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    alert:
      'Please attempt to call or text the patient twice prior to making the patient "no show"',
    dependantField: 'q0',
    dependantValue: '',
    errorValue: 'no',
  },
  {
    id: 2,
    question: 'Patient responded to call/text?',
    field: 'patientRespondedQ2',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    alert: '',
    dependantField: 'patientContactedTwiceQ1',
    dependantValue: 'yes',
    errorValue: '',
  },
  {
    id: 3,
    question: 'Is there a concern for patient safety or safety of others',
    field: 'safetyConcernQ3',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    alert: '',
    dependantField: 'patientRespondedQ2',
    dependantValue: 'no',
    errorValue: '',
  },
  {
    id: 4,
    question: 'Was a welfare check completed',
    field: 'welfareCheckDoneQ4',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    alert:
      'A welfare check must be completed in order to mark the visit as “no-show”',
    dependantField: 'safetyConcernQ3',
    dependantValue: 'yes',
    errorValue: 'no',
  },
  {
    id: 5,
    question: 'Patients response to call/text',
    field: 'patientResponseQ5',
    options: [
      { label: 'Agreeable to being seen at this time.', value: 'yes' },
      { label: 'Wants to reschedule', value: 'no' },
    ],
    alert:
      'Please assess the patient and complete a visit note and do not mark this visit as no-show',
    dependantField: 'patientRespondedQ2',
    dependantValue: 'yes',
    errorValue: 'yes',
  },
  {
    id: 6,
    question:
      'Has the patient been educated that this appointment will be considered no-show and patient may be charged a no-show fee and/or may not be eligible to rescheduling if this is their second no-show in a row?',
    field: 'patientEducatedQ6',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    alert:
      'If patient responded to the call or message, they must be educated about the consequences of no-showing an appointment. Please attempt to call or text patient again to ensure they are educated, in order to mark the visit as “no-show”',
    dependantField: 'patientResponseQ5',
    dependantValue: 'no',
    errorValue: 'no',
  },
]

export const NOTE_TYPE_CODE = 'NoShow'
export const NOTE_TITLE_CODE = 'Communication'
