enum MedicationOrdersTabs {
  REFILL_REQUESTS = 'Refill Requests',
  CHANGE_REQUESTS = 'Change Requests',
  NEW_PRESCRIPTIONS = 'New Prescriptions (10)',
  ERRORS = 'Errors',
}

enum MedicationOrdersTabsId {
    REFILL_REQUESTS_ID = 'refill-requests-tab',
    CHANGE_REQUESTS_ID = 'change-requests-tab',
    NEW_PRESCRIPTIONS_ID = 'new-prescriptions-tab',
    ERRORS_ID = 'errors-tab',
  }
  

const MEDICATION_ORDER_TABLE_PAGE_SIZE = 20

export { MedicationOrdersTabs, MedicationOrdersTabsId, MEDICATION_ORDER_TABLE_PAGE_SIZE }
