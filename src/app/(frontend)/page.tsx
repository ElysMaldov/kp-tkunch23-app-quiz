import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import '../globals.css'
import RegistrationForm from '@/components/registration-form'

export default async function HomePage() {
  return <RegistrationForm />
}
