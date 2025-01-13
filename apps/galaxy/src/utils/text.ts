const truncateString = (str: string, length: number) =>
  str.length > length ? `${str.slice(0, length)}...` : str

const decodeUrlString = (str: string) => decodeURIComponent(str)

export { truncateString, decodeUrlString }
