import { authorizeUser } from '@/lib/actions/authorize-user'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface ResultsPageProps {
  params: Promise<{ quizId: string }>
}

const ResultsPage = async ({ params }: ResultsPageProps) => {
  const { quizId } = await params
  const userId = (await authorizeUser()).user?.id

  if (!userId) {
    redirect('/')
  }

  const payload = await getPayload({
    config,
  })

  const existingGrade = await payload.find({
    collection: 'multiplechoice-question-grades',
    limit: 1,
    select: {
      totalScore: true,
      answers: true,
    },
    where: {
      student: {
        equals: userId,
      },
      question: {
        equals: quizId,
      },
    },
  })

  const existingGradeData = existingGrade.totalDocs > 0 ? existingGrade.docs[0] : null

  return (
    <section className="container mx-auto flex items-center justify-center h-screen flex-col gap-y-4">
      <p>{existingGradeData?.totalScore}</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </section>
  )
}

export default ResultsPage
