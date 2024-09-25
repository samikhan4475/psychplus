'use server'

import * as api from '@/api'

const deleteStaffCommentAction = async (
  id: number,
): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE(api.DELETE_STAFF_COMMENT_ENDPOINT(id))
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: undefined,
  }
}

export { deleteStaffCommentAction }
