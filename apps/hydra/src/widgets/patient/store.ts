'use client'

import { create } from 'zustand'
import { createPatientStore, type PatientState } from '@psychplus/store/patient'

const useStore = create<PatientState>()((...a) => ({
  ...createPatientStore(...a),
}))

export { useStore }
