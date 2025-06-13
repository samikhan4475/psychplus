enum ClinicScheduleTabs {
  ClinicTime = 'clinic-time',
  VacationTime = 'vacation-time',
  ForwardingInbox = 'forwarding-message',
}

enum VISIT_TYPES {
  InPerson = 'InPerson',
  Either = 'Either',
  TeleVisit = 'TeleVisit',
}

const GROUP_OPTIONS = [
  {
    label: 'Infant (0 yo to 4 yo)',
    value: 'infant',
  },
  { label: 'Child (5 yo to 12 yo)', value: 'child' },
  { label: 'Adolescent (13 yo to 17 yo)', value: 'adolescent' },
  {
    label: 'Adult (18 yo to 54 yo)',
    value: 'adult',
  },
  {
    value: 'geriatric',
    label: 'Geriatric (55 yo+)',
  },
]

export { ClinicScheduleTabs, GROUP_OPTIONS, VISIT_TYPES }
