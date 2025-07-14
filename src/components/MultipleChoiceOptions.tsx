'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { saveUserAnswer } from '@/lib/actions/save-user-answer'
import { MultiplechoiceQuestion } from '@/payload-types'
import { useState } from 'react'

export interface MultipleChoiceOptionsProps {
  answers: MultiplechoiceQuestion['options']
  questionId: string
}

/* 
1. Terima property untuk pilihan2 soal dan render radio berdasarkan jumlah pilihan itu
2. Ketika user pilih jawaban dan klik submit, aku bisa tau jawaban yang mana (minimal console.log)
*/

const MultipleChoiceOptions = ({ answers, questionId }: MultipleChoiceOptionsProps) => {
  const [chosenAnswerId, setChosenAnswerId] = useState('')

  const radioItems = answers.map((answer) => {
    if (!answer.id) return null

    return (
      <div className="flex items-center space-x-2" key={answer.id}>
        <RadioGroupItem value={answer.id} id={answer.id} />
        <Label htmlFor={answer.id}>{answer.text}</Label>
      </div>
    )
  })

  const onSubmitClick = async () => {
    const chosenAnswerData = answers.find((answer) => {
      return answer.id === chosenAnswerId
    })

    if (chosenAnswerData) {
      await saveUserAnswer(chosenAnswerData, questionId)
    }
  }

  return (
    <section className="flex flex-col gap-y-4">
      <RadioGroup onValueChange={(val) => setChosenAnswerId(val)}>{radioItems}</RadioGroup>

      <Button onClick={onSubmitClick}>Submit</Button>
    </section>
  )
}

export default MultipleChoiceOptions
