'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { loginUser } from '@/lib/actions/login-user'

// RPC = Remote Procedure Call
export const createUser = async (email: string, password: string, fullName: string) => {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()

  const user = await payload.create({
    collection: 'users',
    data: {
      email,
      fullName,
      password,
    },
  })

  const result = await loginUser(email, password)

  if (result.token) {
    cookieStore.set('payload-token', result.token)
  }

  return user
}
