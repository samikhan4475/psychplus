import { create } from 'zustand'
import { Service, VisitType } from '@/types'

interface EditVisitStore {
  services: Service[]
  setServices: (services: Service[]) => void
  visitTypes: VisitType[]
  setVisitTypes: (visitTypes: VisitType[]) => void
}

export const useEditVisitStore = create<EditVisitStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  visitTypes: [],
  setVisitTypes: (visitTypes) => set({ visitTypes }),
}))
