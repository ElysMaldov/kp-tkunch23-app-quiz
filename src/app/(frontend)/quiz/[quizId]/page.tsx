import config from '@payload-config'
import { getPayload } from 'payload'

export interface QuizDetailsPageProps {
  params: Promise<{ quizId: string }>
}

const QuizDetailsPage = async ({ params }: QuizDetailsPageProps) => {
  const { quizId } = await params

  const quizData = await fetchQuizById(quizId)

  return <p>{quizData?.title}</p>
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

    return quizData
  } catch (error) {
    console.error('Error fetching quiz by ID:', error)
    return null
  }
}
