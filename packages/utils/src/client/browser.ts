const isMobile = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 768px)').matches
  }
  return false
}

export { isMobile }
