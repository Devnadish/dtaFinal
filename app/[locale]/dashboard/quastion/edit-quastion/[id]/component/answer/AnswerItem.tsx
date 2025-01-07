"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Answer } from "@/type/types";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { AnswerEditor } from "./AnswerEditor";

interface AnswerItemProps {
    answer: Answer;
    onSave: (updatedAnswer: Answer) => void;
    onDelete: (AID: string) => void;
}

interface DeleteDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
}

interface AnswerViewProps {
    answer: Answer;
    onEdit: () => void;
    onDelete: () => void;
}

interface EditModeProps {
    answer: Answer;
    onSave: (updatedAnswer: Answer) => void;
    onCancel: () => void;
}

function DeleteDialog({ isOpen, onOpenChange, onDelete }: DeleteDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="destructive" onClick={() => onOpenChange(true)}>
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete this answer?
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function AnswerView({ answer, onEdit, onDelete }: AnswerViewProps) {
    return (
        <div className="space-y-2">
            <p>{answer.content}</p>
            <div className="flex items-center justify-between ">
                <div className="space-x-2">
                    <Button variant="outline" onClick={onEdit}>
                        Edit
                    </Button>
                    <DeleteDialog
                        isOpen={false}
                        onOpenChange={onDelete}
                        onDelete={onDelete}
                    />
                </div>
                {answer.comments.length > 0 ? (
                    <Button>show commeint</Button>
                ) : (
                    <p className="bg-green-600 border border-green-400 rounded-lg p-1 text-xs ">Comment: {answer.comments.length}</p>
                )}
            </div>
        </div>
    );
}

function EditMode({ answer, onSave, onCancel }: EditModeProps) {
    return <AnswerEditor answer={answer} onSave={onSave} onCancel={onCancel} />;
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
                <EditMode
                    answer={answer}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <AnswerView
                    answer={answer}
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => setIsDeleteDialogOpen(true)}
                />
            )}
        </div>
    );
}
