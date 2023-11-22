import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import { codeSets, patientReferrals, patients, users } from './data'
import { wait } from './utils'

const ANON = ['/api/login']

const ONE_SECOND = 1000

const API_DELAY = process.env.API_DELAY ? Number(process.env.API_DELAY) : 0

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
    res.status(201).json({ accessToken: '12345' })
  })

  app.get('/api/user', async (req, res) => {
    await wait(API_DELAY)
    // @ts-ignore
    res.status(200).json(req.user)
  })

  app.get('/api/metadata/codesets', async (req, res) => {
    await wait(API_DELAY)
    res.status(200).json(codeSets)
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

  app.get('/api/patients/:id/referrals', async (req, res) => {
    await wait(API_DELAY)

    const referrals = patientReferrals.filter(
      (referral) => referral.patientId === Number(req.params.id),
    )
    res.status(200).json(referrals)
  })

  return app
}
