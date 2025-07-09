'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

// RPC = Remote Procedure Call
export const createUser = async (email: string, password: string, fullName: string) => {
  const payload = await getPayload({ config })

  const user = await payload.create({
    collection: 'users',
    data: {
      email,
      fullName,
      password,
    },
  })

  return user
}
