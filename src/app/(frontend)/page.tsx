import QuizList from '@/components/QuizList'
import config from '@payload-config'
import { getPayload } from 'payload'
import { authorizeUser } from '@/lib/actions/authorize-user'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const result = await authorizeUser()

  const quizzez = await fetchQuiz()

  if (result.user) {
    return <QuizList quizzez={quizzez} />
  } else {
    redirect('/auth/login')
  }
}

const fetchQuiz = async () => {
  const payload = await getPayload({
    config,
  })

  const quizzez = await payload.find({
    collection: 'multiplechoice-questions',
  })

  return quizzez.docs
}
