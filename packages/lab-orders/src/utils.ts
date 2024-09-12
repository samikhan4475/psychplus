function isEmpty(obj: { [key: string]: any }) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
}

export { isEmpty }
