enum TableFilters {
  All = 'All',
  Intake = 'Intake',
  CSS = 'CSS',
  RevCycle = 'Rev Cycle',
  Provider = 'Provider',
  BA = 'BA',
}

type FiltersIndex = { [key: string]: string[] }

const TABLE_FILTERS: FiltersIndex = {
  [TableFilters.All]: [],
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

export { TABLE_FILTERS, TableFilters }
