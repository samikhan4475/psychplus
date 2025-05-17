const getStatusLabel = (archive: number | string) =>
  archive === 0 ? 'Active' : 'Inactive'

export { getStatusLabel }
