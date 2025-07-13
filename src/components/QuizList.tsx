import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { MultiplechoiceQuestion } from '@/payload-types'

interface QuizListProps {
  quizzez: MultiplechoiceQuestion[]
}

export default function QuizList({ quizzez }: QuizListProps) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzez.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/quiz/${quiz.id}`}
            className="block transition-transform hover:scale-105"
          >
            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                <h2 className="text-lg font-semibold text-center leading-tight">{quiz.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
