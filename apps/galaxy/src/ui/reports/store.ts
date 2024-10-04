import { Code } from '@/types';
import { create } from 'zustand';
import { getReportParametersTypeAction, getReportsAction, getTemplatesAction } from './actions';
import { Parameter, Template } from './types';

interface Store {
  reports: Code[];
  loading: boolean;
  error: string | null;
  templates: Template[];
  templateFilters: Parameter | null;
  selectedReport: Code | null;
  selectedTemplate: Template | null;
  generatedReport: any;
  fetchReportsAndTemplates: () => void;
  setSelectedReport: (code: Code) => void;
  setSelectedTemplate: (template: Template) => void;
  setGeneratedReport: (report: any) => void;
}

const useStore = create<Store>((set) => ({
  reports: [],
  error: null,
  templates: [],
  templateFilters: null,
  loading: false,
  selectedReport: null,
  selectedTemplate: null,
  generatedReport: null,

  fetchReportsAndTemplates: async () => {
    set({ loading: true, error: null });

    const [reportsResult, templatesResult, codeParametersResult] = await Promise.all([
      getReportsAction(),
      getTemplatesAction(),
      getReportParametersTypeAction(),
    ]);

    if (reportsResult.state === 'success' && templatesResult.state === 'success' && codeParametersResult.state === 'success') {
      set({
        reports: reportsResult.data?.codes || [],
        templates: templatesResult.data || [],
        templateFilters: codeParametersResult.data || null,
        loading: false,
      });
    } else {
      set({
        error: 'Failed to fetch data',
        loading: false,
      });
    }
  },

  setSelectedReport: (code: Code) => {
    set({ selectedReport: code });
  },

  setSelectedTemplate: (template: Template) => {
    set({ selectedTemplate: template });
  },

  setGeneratedReport: (report: any) => {
    set({ generatedReport: report });
  },
}));

export { useStore };
