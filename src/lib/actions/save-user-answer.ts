'use server'

import { authorizeUser } from '@/lib/actions/authorize-user'
import { MultiplechoiceQuestion } from '@/payload-types'
import config from '@/payload.config'
import { getPayload } from 'payload'

export const saveUserAnswer = async (
  answer: MultiplechoiceQuestion['options'][number],
  questionId: string,
) => {
  const payload = await getPayload({ config })
  const student = await authorizeUser()
  const studentId = student.user?.id

  if (!studentId) {
    return {
      message: 'Not authorized',
    }
  }

  const newAnswerData = await payload.create({
    collection: 'multiplechoice-answers',
    data: {
      isCorrect: answer.isCorrect,
      optionId: answer.id ?? '',
      question: questionId,
      score: answer.score,
      student: studentId,
    },
  })

  return newAnswerData
}
