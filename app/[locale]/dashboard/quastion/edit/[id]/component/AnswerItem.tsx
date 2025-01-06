'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Answer } from '@/type/types';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { AnswerEditor } from './AnswerEditor';

interface AnswerItemProps {
    answer: Answer;
    onSave: (updatedAnswer: Answer) => void;
    onDelete: (AID: string) => void;
}

export function AnswerItem({ answer, onSave, onDelete }: AnswerItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleSave = (updatedAnswer: Answer) => {
        onSave(updatedAnswer);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(answer.id);
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="border rounded-lg p-4">
            {isEditing ? (
                <AnswerEditor
                    answer={answer}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="space-y-2">
                    <p>{answer.content}</p>
                    <p className='bg-green-500 rounded p-1 w-fit'>Commints {answer.comments.length}</p>
                    <div className="space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>

                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                >
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you sure you want to delete this answer?</DialogTitle>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            )}
        </div>
    );
}