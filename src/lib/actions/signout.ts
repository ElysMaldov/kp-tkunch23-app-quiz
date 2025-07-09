'use server'

import { cookies } from 'next/headers'

// RPC = Remote Procedure Call
export const signout = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('payload-token')
}
