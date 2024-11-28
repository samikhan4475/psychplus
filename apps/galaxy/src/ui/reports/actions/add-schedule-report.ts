'use server'

import * as api from '@/api';
import { SchedulingReport } from '../types';

const addScheduleReportAction = async (
  data: SchedulingReport
): Promise<api.ActionResult<SchedulingReport>> => {
  const result = await api.POST<SchedulingReport>(api.ADD_SCHEDULE_REPORT_ENDPOINT, data);

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

export { addScheduleReportAction };

