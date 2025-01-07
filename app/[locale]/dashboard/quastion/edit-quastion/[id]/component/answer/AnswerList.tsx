'use client';

import { useState, useEffect } from 'react';
import { Answer } from '@/type/types';
import { addAnswer, deleteAnswer, fetchAnswers, updateAnswer } from './answerActions';
import { AnswerItem } from './AnswerItem';
import { AddAnswerDialog } from './AddAnswerDialog';

interface AnswerListProps {
  QID: string;
}

export function AnswerList({ QID }: AnswerListProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  // Fetch answers from the server
  const fetchAndSetAnswers = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const data = await fetchAnswers(QID);
      setAnswers(data);
    } catch (error) {
      console.error('Error fetching answers:', error);
      setError('Failed to fetch answers. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Fetch answers when QID changes
  useEffect(() => {
    fetchAndSetAnswers();
  }, [QID]);

  const handleSave = async (updatedAnswer: Answer) => {
    setLoading(true);
    setError(null); // Reset error before updating
    try {
      await updateAnswer(updatedAnswer.id, updatedAnswer.content);
      await fetchAndSetAnswers(); // Fetch fresh data after update
    } catch (error) {
      console.error('Error updating answer:', error);
      setError('Failed to update answer. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (AID: string) => {
    setLoading(true);
    setError(null); // Reset error before deleting
    try {
      await deleteAnswer(AID);
      await fetchAndSetAnswers(); // Fetch fresh data after delete
    } catch (error) {
      console.error('Error deleting answer:', error);
      setError('Failed to delete answer. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnswer = async (content: string) => {
    setLoading(true);
    setError(null); // Reset error before adding
    try {
      await addAnswer(QID, content);
      await fetchAndSetAnswers(); // Fetch fresh data after add
    } catch (error) {
      console.error('Error adding answer:', error);
      setError('Failed to add answer. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-between">
        <p>
          <strong>Answer Count:</strong> {answers.length}
        </p>
        <AddAnswerDialog QID={QID} onAddAnswer={handleAddAnswer} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Show loader or skeleton while data is being fetched */}
      {loading ? (
        <div className="space-y-4">
          {/* Skeleton Loading */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-secondary rounded w-1/2"></div>
              <div className="flex space-x-2 mt-4">
                <div className="h-8 bg-secondary rounded w-16"></div>
                <div className="h-8 bg-secondary rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        answers.map((answer) => (
          <AnswerItem
            key={answer.id}
            answer={answer}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}