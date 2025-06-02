import { LabOrderResponseList } from '@/types'

function containsUrineTest(labOrders?: LabOrderResponseList): boolean {
  if (!labOrders) {
    return false
  }
  return labOrders?.labOrders.some((order) =>
    order.labTests?.some(
      (test) =>
        typeof test.testName === 'string' && test?.labTestCode === '6635',
    ),
  )
}

export { containsUrineTest }
