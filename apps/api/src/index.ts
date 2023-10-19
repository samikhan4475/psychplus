import { createServer } from './server'

const PORT = process.env.PORT || 8080

const server = createServer()

const listener = server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing server')
  listener.close(() => {
    console.log('server closed')
  })
})
