interface MedicationRefill {
  id: string
  labTestId: string
  orderId: string
  observationTime: string
  resultCode: string
  resultName: string
  resultValue: string
  resultValueUnit?: string
  recommendedValue?: string
  abnormalRangeCode: string
  physicianComments: string
  externalResultId: string
  labComments: string
  resultValueType: string
  valueDescription: string
  recordStatus: string
  labOrderNumber: number
  labId: string
  patientId: number
  appointmentId: number
  orderingStaffId: number
  billType: string
  isFasting: boolean
  isLabDraw: boolean
  orderType: string
  orderSendStatus: boolean
  orderSentDateTime: string
  isPscHold: boolean
  isTest: boolean
  labOrderDate: string
  labNotes: string,
  orderingLab: {
    id: string
    recordStatus: string
    name: string
    locationName: string
    locationId: string
    consolidatorId: string
    labGroupId: string
    isTest: boolean
  },
  orderingStaffName:{
    firstName: string,
    lastName: string
  }
}

interface MedicationRefillResponseList {
  refillRequests: MedicationRefill[]
  total: number
}

export type {
  MedicationRefill,
  MedicationRefillResponseList
}
