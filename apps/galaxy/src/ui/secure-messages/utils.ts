const bytesToMegaBytes = (bytes: number) => {
    const MB = bytes / (1024 * 1024)
    return MB.toFixed(2)
}

export { bytesToMegaBytes }