import { create } from 'zustand'
import { ProcessedTestData } from '../types'

interface LabTestStore {
  selectedTestId: string
  selectedTestName: string
  selectedResultName: string
  processedData: ProcessedTestData[]
  setSelectedTest: (id: string, testName: string, resultName: string) => void
  setProcessedData: (data: ProcessedTestData[]) => void
}

export const useLabTestStore = create<LabTestStore>((set) => ({
  selectedTestId: '',
  selectedTestName: '',
  selectedResultName: '',
  processedData: [],
  setSelectedTest: (id, testName, resultName) =>
    set({
      selectedTestId: id,
      selectedTestName: testName,
      selectedResultName: resultName,
    }),
  setProcessedData: (data) => set({ processedData: data }),
}))
