import type { CollectionConfig } from 'payload'

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
