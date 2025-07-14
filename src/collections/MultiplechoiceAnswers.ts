import { MultiplechoiceAnswer } from '@/payload-types'
import type { CollectionConfig, FieldHook } from 'payload'

const selectGrade: FieldHook<MultiplechoiceAnswer, string, MultiplechoiceAnswer> = async ({
  req: { payload },
  data,
}) => {
  if (!data?.student || !data.question) {
    return ''
  }
  // Cari grade yang dimiliki student & question yang sama
  // Kalau ada, pake itu; kalau ada buat yang baru

  const existingGrade = await payload.find({
    collection: 'multiplechoice-question-grades',
    limit: 1,
    select: {},
    where: {
      student: {
        equals: data.student,
      },
      question: {
        equals: data.question,
      },
    },
  })

  const existingGradeId = existingGrade.totalDocs > 0 ? existingGrade.docs[0].id : null

  if (existingGradeId) {
    return existingGradeId
  }

  // Kalau gada, buat grade yang baru
  const newGrade = await payload.create({
    collection: 'multiplechoice-question-grades',
    data: {
      student: data.student,
      question: data.question,
    },
  })

  return newGrade.id
}

export const MultiplechoiceAnswers: CollectionConfig = {
  slug: 'multiplechoice-answers',
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      filterOptions: {
        role: {
          equals: 'student',
        },
      },
    },
    {
      name: 'question',
      type: 'relationship',
      relationTo: 'multiplechoice-questions',
      required: true,
    },
    {
      name: 'grade',
      type: 'relationship',
      relationTo: 'multiplechoice-question-grades',
      hooks: {
        beforeChange: [selectGrade],
      },
    },
    {
      name: 'optionId',
      type: 'text',
      required: true,
    },
    {
      name: 'isCorrect',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
