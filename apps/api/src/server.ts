import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import { patients, users } from './data'
import { wait } from './utils'

const ANON = ['/api/login']

const ONE_SECOND = 1000

const API_DELAY = process.env.API_DELAY
  ? Number(process.env.API_DELAY)
  : ONE_SECOND

export const createServer = (): Express => {
  const app = express()

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())

  app.use((req, res, next) => {
    if (ANON.includes(req.path)) {
      return next()
    }

    const token = req.headers.authorization?.toLowerCase().trim()
    if (token !== 'bearer 12345') {
      return res.status(401).send()
    }

    // @ts-ignore
    req.user = users[0]
    next()
  })

  app.post('/api/login', async (req, res) => {
    await wait(API_DELAY)
    res.status(201).json({ token: '12345' })
  })

  app.get('/api/metadata/codesets', async (req, res) => {
    await wait(API_DELAY)
    res.status(200).json({ message: 'foo' })
  })

  app.get('/api/user', async (req, res) => {
    await wait(API_DELAY)
    // @ts-ignore
    res.status(200).json(req.user)
  })

  app.get('/api/patients/:id', async (req, res) => {
    await wait(API_DELAY)
    const patient = patients.find(
      (patient) => patient.id === Number(req.params.id),
    )

    if (!patient) {
      return res.status(404).send()
    }

    res.status(200).json(patient)
  })

  return app
}
