const PATIENT_MEDICATIONS_OPTIONS = [
  {
    label: 'Prescribed',
    value: 'prescribed',
    field: 'prescribed',
  },

  {
    label: 'Home',
    field: 'home',
    value: 'home',
  },
]
const DRUG_INTERACTION_ACCORDIAN = [
  {
    id: 1,
    drug: 'penicillAMINE 250 mg oral tablet',
    interactionMessage:
      'Concomitant use of Drug penicillAMINE 250 mg oral tablet and Drug B may increase the risk of specific adverse effect or reduced effectiveness.',
  },
  {
    id: 2,
    drug: 'ParaGard intrauterine device',
    interactionMessage:
      'Concomitant use of Drug ParaGard intrauterine device and Drug B may increase the risk of specific adverse effect or reduced effectiveness.',
  },
  {
    id: 3,
    drug: 'Celebrate Vitamin D3 Quick-Melt 5000 intl',
    interactionMessage:
      'Concomitant use of Drug Celebrate Vitamin D3 Quick-Melt 5000 intl and Drug B may increase the risk of specific adverse effect or reduced effectiveness.',
  },
]

export { PATIENT_MEDICATIONS_OPTIONS, DRUG_INTERACTION_ACCORDIAN }
