import type { CollectionConfig } from 'payload'

export const MultiplechoiceQuestions: CollectionConfig = {
  slug: 'multiplechoice-questions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'question',
      type: 'richText',
      required: true,
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
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
    },
  ],
}
