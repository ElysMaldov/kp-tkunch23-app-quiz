import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
