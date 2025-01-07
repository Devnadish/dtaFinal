'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Answer } from '@/type/types';

interface AnswerEditorProps {
  answer: Answer;
  onSave: (updatedAnswer: Answer) => void;
  onCancel: () => void;
}

export function AnswerEditor({ answer, onSave, onCancel }: AnswerEditorProps) {
  const [editedContent, setEditedContent] = useState(answer.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSave = () => {
    onSave({ ...answer, content: editedContent });
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={editedContent}
        onChange={handleChange}
        placeholder="Enter your answer here"
        className="min-h-[100px]"
      />
      <div className="space-x-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}