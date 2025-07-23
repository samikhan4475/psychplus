import z from "zod"

export const nameRegex = /^[^\d]*$/
export const requiredName = z
    .string()
    .regex(nameRegex, 'Numbers are not allowed')
    .min(1, 'Required')
    .max(35, { message: 'Cannot exceed 35 characters' })