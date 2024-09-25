const useCalculateMinutes = () => {
  const calculateMinutes = (startTime: string, endTime: string) => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`)
      const end = new Date(`1970-01-01T${endTime}:00`)

      // If end time is less than start time, assume it's on the next day
      if (end.getTime() < start.getTime()) {
        end.setDate(end.getDate() + 1) // Increment to the next day
      }

      return Math.max((end.getTime() - start.getTime()) / 60000, 0) // Return minutes
    }
    return 0 // Return 0 if either time is not provided
  }

  return calculateMinutes
}

export default useCalculateMinutes
