enum TableFilters {
  All = 'All',
  Timed = 'Timed',
  Untimed = 'Untimed',
  Intake = 'Intake',
  CSS = 'CSS',
  RevCycle = 'Rev Cycle',
  Provider = 'Provider',
  BA = 'BA',
}

type FiltersIndex = { [key: string]: string[] }

const LIST_VIEW_TABLE_FILTERS: FiltersIndex = {
  [TableFilters.All]: [],
  [TableFilters.Timed]: [
    'unit',
    'appointment-group',
    'date-of-admission',
    'length-of-stay',
    'last-coverage-date',
    'authorization-number',
    'legal-status',
  ],
  [TableFilters.Untimed]: [
    'time',
    'provider',
  ],
  [TableFilters.Intake]: [],
  [TableFilters.CSS]: [],
  [TableFilters.RevCycle]: [],
  [TableFilters.Provider]: [
    'authorization-number',
    'patient-status',
    'primary-insurance',
    'secondary-insurance',
    'co-payment',
    'co-insurance',
    'balance',
  ],
  [TableFilters.BA]: [
    'patient-status',
    'authorization-number',
    'co-payment',
    'co-insurance',
    'balance',
  ],
}

export { LIST_VIEW_TABLE_FILTERS, TableFilters}