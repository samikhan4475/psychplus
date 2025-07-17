async function retryOnTimeoutFetch(
  fn: () => Promise<Response>,
  retries = 3,
  delayMs = 700,
): Promise<Response> {
  let lastErrorMsg = 'Request timed out'

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fn()
      if ((res?.status === 522 || res?.status === 524) && attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs))
        continue
      }
      return res
    } catch (e) {
      lastErrorMsg = e instanceof Error ? e.message : String(e)
      console.error('Fetch retry error:', lastErrorMsg)
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs))
      }
    }
  }

  return new Response('Request timed out after multiple attempts.', {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export { retryOnTimeoutFetch }
