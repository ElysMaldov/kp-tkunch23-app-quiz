import config from '@payload-config'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import MultipleChoiceOptions from '@/components/MultipleChoiceOptions'

export interface QuizDetailsPageProps {
  params: Promise<{ quizId: string }>
}

const QuizDetailsPage = async ({ params }: QuizDetailsPageProps) => {
  const { quizId } = await params

  const quizData = await fetchQuizById(quizId)

  if (!quizData) return <p>No quiz data found</p>

  return (
    <section className="container mx-auto flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">{quizData.title}</h1>

      <RichText data={quizData?.question} />

      <MultipleChoiceOptions />
    </section>
  )
}

export default QuizDetailsPage

async function fetchQuizById(id: string) {
  try {
    const payload = await getPayload({ config: config })

    // const quizData = await payload.find({
    //   collection: 'multiplechoice-questions',
    //   where: {
    //     id: {
    //       equals: id,
    //     },
    //   },
    //   limit: 1,
    //   select: {
    //     id: true,
    //     title: true,
    //     createdAt: true,
    //     updatedAt: true,
    //   },
    // })

    const quizData = await payload.findByID({
      collection: 'multiplechoice-questions',
      id,
    })

    console.log(quizData)

    return quizData
  } catch (error) {
    console.error('Error fetching quiz by ID:', error)
    return null
  }
}
