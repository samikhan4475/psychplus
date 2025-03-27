import { create } from 'zustand'
import { Service, VisitType } from '@/types'

interface EditVisitStore {
  userId: number | undefined
  setUserId: (userId: number) => void
  services: Service[]
  setServices: (services: Service[]) => void
  visitTypes: VisitType[]
  setVisitTypes: (visitTypes: VisitType[]) => void
  groupedVisitTypes: { [key: string]: VisitType[] }
  setGroupedVisitTypes: (visitTypes: { [key: string]: VisitType[] }) => void
}

export const useEditVisitStore = create<EditVisitStore>((set) => ({
  userId: undefined,
  setUserId: (userId) => set({ userId }),
  services: [],
  setServices: (services) => set({ services }),
  visitTypes: [],
  setVisitTypes: (visitTypes) => set({ visitTypes }),
  groupedVisitTypes: {},
  setGroupedVisitTypes: (groupedVisitTypes) => set({ groupedVisitTypes }),
}))
