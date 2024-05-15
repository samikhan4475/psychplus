const updateProfileImage = (data: FormData) =>
  fetch('/api/patients/self/profileImage', {
    method: 'PATCH',
    body: data,
  })

export { updateProfileImage }
