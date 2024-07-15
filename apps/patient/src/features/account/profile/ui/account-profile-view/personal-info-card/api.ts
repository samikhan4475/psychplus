const updateDriversLisenceImage = (data: FormData) =>
  fetch('/api/patients/self/driverslicenseimage/Front', {
    method: 'PATCH',
    body: data,
  })

export { updateDriversLisenceImage }
