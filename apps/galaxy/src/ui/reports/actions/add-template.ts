'use server'

import * as api from '@/api';
import { Template } from '../types';

const addTemplateAction = async (
  data: Template
): Promise<api.ActionResult<Template>> => {
  const result = await api.POST<Template>(api.ADD_REPORT_TEMPLATE_ENDPOINT, data);

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    };
  }

  return {
    state: 'success',
    data: result.data
  };
};

export { addTemplateAction };

