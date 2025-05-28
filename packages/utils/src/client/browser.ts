const isMobile = (): boolean => window.matchMedia('(max-width: 768px)').matches;

export { isMobile }
