import { useActionState, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { editFaq } from './updateFaq'

interface QuestionEditorProps {
  question: string
  QID: string
}

export function QuestionEditor({ question, QID }: QuestionEditorProps) {
  const [questionState, setQuestionState] = useState(question)
  const [state, action, isPending] = useActionState(editFaq, null);



  return (
    <form action={action} className="space-y-4 w-full flex flex-col">
      <input type="hidden" name="QID" value={QID} />
      <Textarea
        // defaultValue={question}
        onChange={(e) => setQuestionState(e.target.value)}
        disabled={isPending}
        rows={3}
        required
        value={questionState}
        placeholder="Enter your question here"
        className="min-h-[100px]"
        name="question"
      />
      <Button type="submit" disabled={isPending} className='self-end'>{isPending ? "Save..." : "Save"}</Button>
      {state?.message && (
        <p className={`text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}

