'use server'

import * as api from '@/api';
import { ScheduleJob } from '../types';

const runScheduleReportAction = async (
  data: ScheduleJob
): Promise<api.ActionResult<ScheduleJob>> => {
  const result = await api.POST<ScheduleJob>(api.RUN_SCHEDULE_REPORT_JOB_ENDPOINT, data);

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

export { runScheduleReportAction };

