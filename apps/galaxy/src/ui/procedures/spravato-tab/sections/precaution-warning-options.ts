const PRECAUTION_OPTIONS = [
  {
    label:
      'The patient does not present with any indications of aneurysmal vascular disease, encompassing the thoracic and abdominal aorta, intracranial and peripheral arterial vessels, or conditions such as arteriovenous malformation and intracerebral hemorrhage. Moreover, there are no indications of hypersensitivity to esketamine, ketamine, or any of the excipients.',
    field: 'aneurysmalVascularDisease',
    message:
      'Can NOT proceed with treatment as it is a contraindication to do so if the patient has any of the following illnesses.',
  },
  {
    label:
      'The patient has been assessed for pregnancy status, and it has been confirmed that the patient is not pregnant. Additionally, the patient has been informed about the potential risks of Spravato administration during pregnancy, including but not limited to fetal harm.',
    field: 'pregnancyStatus',
    message: 'You will be unable to proceed with this box unchecked.',
  },
  {
    label:
      'The patient has received thorough education regarding potential adverse reactions, encompassing but not limited to dissociation, dizziness, nausea, sedation, vertigo, hypoesthesia, anxiety, lethargy, increased blood pressure, vomiting, and sensations akin to intoxication.',
    field: 'adverseReactionsEducation',
    message: 'You will be unable to proceed with this box unchecked.',
  },
  {
    label:
      'The patient has been advised against driving or operating heavy machinery for up to 24 hours following their treatment.',
    field: 'postTreatmentSafety',
    message: 'You will be unable to proceed with this box unchecked.',
  },
]

const RADIO_BUTTON_OPTIONS = [
  {
    label: 'Benzodiazepines',
    field: 'benzodiazepines',
    message:
      'The patient was closely monitored to assess for any fluctuations in blood pressure as well as potential sedation concerns.',
  },
  {
    field: 'nonBenzodiazepineSedativeHypnotic',
    label: 'Non-Benzodiazepine Sedative Hypnotic',
    message:
      'The patient was closely monitored to assess for any fluctuations in blood pressure as well as potential sedation concerns.',
  },
  {
    field: 'psychostimulants',
    label: 'Psychostimulants',
    message:
      'The patient was closely monitored to assess for any fluctuations in blood pressure as well as potential sedation concerns.',
  },
  {
    field: 'monoamineOxidaseInhibitors',
    label: 'Monoamine Oxidase Inhibitors (MAOIs)',
    message:
      'The patient was closely monitored to assess for any fluctuations in blood pressure as well as potential sedation concerns.',
  },
]

export { PRECAUTION_OPTIONS, RADIO_BUTTON_OPTIONS }
