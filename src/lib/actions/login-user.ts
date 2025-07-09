'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

// RPC = Remote Procedure Call
export const loginUser = async (email: string, password: string) => {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()

  const user = await payload.login({
    collection: 'users',
    data: {
      email,
      password,
    },
  })

  if (user.token) {
    cookieStore.set('payload-token', user.token)
  }

  return user
}
