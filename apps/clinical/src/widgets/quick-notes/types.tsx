interface LabTest {
  id: string
  testName: string
  labTestCode: string
}

interface LabResult {
  labTestId: string
  resultValue: string
  resultValueUnit: string
  recomendedValue: string
  resultCode: string
  abnormalRangeCode: string
  statusCode: string
  labComments: string
}

interface Order {
  labOrderNumber: string
  orderingStaffName: string
  orderSentDateTime: string
  recordStatus: string
  orderingLab: {
    locationName: string
  }
  labTests: LabTest[]
  labResults: LabResult[]
}

interface LabOrderData {
  id: string
  panelName: string
  userName: string
  testCode: string
  labOrderNumber: string
  orderedBy: string
  orderDateAndTime: string
  labLocation: string
  status: string
}

interface LabResultData {
  id: string
  panelName: string
  dateAndTime: string
  resultAndUnit: string
  refRange: string
  code: string
  flag: string
  status: string
  labComment: string
}

export type { LabResult, LabTest, Order, LabOrderData, LabResultData }
