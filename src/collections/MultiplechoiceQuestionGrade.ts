import { MultiplechoiceQuestionGrade } from '@/payload-types'
import type { CollectionConfig, FieldHook } from 'payload'

const calculateTotalScore: FieldHook<
  MultiplechoiceQuestionGrade,
  number,
  MultiplechoiceQuestionGrade
> = async ({ data, req: { payload } }) => {
  if (data?.answers) {
    let totalScore = 0

    const answers = await payload.find({
      collection: 'multiplechoice-answers',
      where: {
        id: {
          in: data.answers,
        },
      },
      select: {
        score: true,
      },
      depth: 0,
    })

    for (let i = 0; i < answers.docs.length; i++) {
      const { score } = answers.docs[i]

      totalScore += score
    }

    return totalScore
  }

  return 0
}

export const MultiplechoiceQuestionGrades: CollectionConfig = {
  slug: 'multiplechoice-question-grades',
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
      name: 'answers',
      type: 'relationship',
      relationTo: 'multiplechoice-answers',
      required: true,
      hasMany: true,
    },

    {
      name: 'totalScore',
      type: 'number',
      required: true,
      defaultValue: 0,
      hooks: {
        afterRead: [calculateTotalScore],
      },
      virtual: true,
      // hooks: {
      //   afterRead
      // }
    },
  ],
}
