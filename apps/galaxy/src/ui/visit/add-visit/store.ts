import { create } from 'zustand'
import { Service, VisitType } from '@/types'

interface AddVisitStore {
  services: Service[]
  setServices: (services: Service[]) => void
  visitTypes: VisitType[]
  setVisitTypes: (visitTypes: VisitType[]) => void
  groupedVisitTypes: { [key: string]: VisitType[] }
  setGroupedVisitTypes: (visitTypes: { [key: string]: VisitType[] }) => void
}

export const useAddVisitStore = create<AddVisitStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  visitTypes: [],
  setVisitTypes: (visitTypes) => set({ visitTypes }),
  groupedVisitTypes: {},
  setGroupedVisitTypes: (groupedVisitTypes) => set({ groupedVisitTypes }),
}))
