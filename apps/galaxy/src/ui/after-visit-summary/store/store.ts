import { DiagnosisIcd10Code } from '@/types'
import { getIcd10Diagnosis } from '@/ui/discharge-diagnosis/actions'
import { getNoteDetailsAction } from '@/ui/notes/actions'
import { groupBySectionName } from '@/ui/notes/utils'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import {
  getProviderRecommendationsHistory,
  saveProviderRecommendation,
} from '../actions'
import {
  Filters,
  ProviderRecommendationsSave,
  Recommendation,
} from '../types/recommendation'

interface ProviderRecommendationsState {
  history: Recommendation[]
  loading: boolean
  error: string | null
  loadingWorkingDiagnosis: boolean
  workingDiagnosisData: DiagnosisIcd10Code[]
  saveRecommendation: (
    appointmentId: string,
    data: ProviderRecommendationsSave,
  ) => Promise<void>
  getHistory: (appointmentId: string, filters: Filters) => Promise<void>
  fetchWorkingDiagnosis: (
    patientId: string,
    appointmentId: string,
  ) => Promise<void>
}

export const useProviderRecommendationsStore =
  create<ProviderRecommendationsState>((set) => ({
    history: [],
    loading: false,
    error: null,
    loadingWorkingDiagnosis: false,
    workingDiagnosisData: [],
    saveRecommendation: async (appointmentId, data) => {
      set({ loading: true })
      const res = await saveProviderRecommendation(appointmentId, data)
      if (res.state === 'error') {
        toast.error('Unable to save Recommendation')
        return set({ error: res.error, loading: false })
      }
      toast.success('Recommendation saved successfully')
      set((state) => ({
        history: [...state.history, res.data],
        loading: false,
      }))
    },
    getHistory: async (appointmentId, filters) => {
      set({ loading: true })
      const res = await getProviderRecommendationsHistory(
        appointmentId,
        filters,
      )
      if (res.state === 'error') {
        toast.error('Unable to fetch Recommendation History')
        return set({ history: [], error: res.error, loading: false })
      }
      set({ history: res.data, loading: false })
    },
    fetchWorkingDiagnosis: async (patientId, appointmentId) => {
      set({ loadingWorkingDiagnosis: true });
      const payload = {
        patientId: patientId,
        appointmentId: appointmentId,
        isIncludeDetails: true,
      };
      const quickNotesResponse = await getNoteDetailsAction(payload);

      if (quickNotesResponse.state === 'error') {
        toast.error('Failed to fetch working diagnosis');
        set({ loadingWorkingDiagnosis: false });
        return;
      }

      const noteData = groupBySectionName(quickNotesResponse.data);
      if (!noteData || !noteData.QuicknoteSectionDiagnosis) {
        set({ loadingWorkingDiagnosis: false, workingDiagnosisData: [] });
        return;
      }

      const sectionValues = noteData.QuicknoteSectionDiagnosis
        .map(item => item.sectionItemValue)
        .filter(Boolean);

      const codes = sectionValues
        .flatMap(value => value.split(','))
        .map(code => code.trim())
        .filter(code => code && code !== 'empty');

      const diagnosisCodes = [...new Set(codes)];

      if (diagnosisCodes.length === 0) {
        set({ loadingWorkingDiagnosis: false, workingDiagnosisData: [] });
        return;
      }

      const response = await getIcd10Diagnosis({ DiagnosisCodes: diagnosisCodes });

      set({ loadingWorkingDiagnosis: false });

      if (response.state === 'error') return;

      const sortedData = response.data.toSorted((a, b) => {
        return diagnosisCodes.indexOf(a.code) - diagnosisCodes.indexOf(b.code);
      });

      set({ workingDiagnosisData: sortedData });
    },

  }))
