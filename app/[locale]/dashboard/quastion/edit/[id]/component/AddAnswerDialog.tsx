'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

interface AddAnswerDialogProps {
    QID: string;
    onAddAnswer: (content: string) => Promise<void>;
}

export function AddAnswerDialog({ QID, onAddAnswer }: AddAnswerDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!content.trim()) {
            setError('Answer content cannot be empty.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onAddAnswer(content);
            setIsOpen(false); // Close the dialog after successful submission
            setContent(''); // Reset the form
            toast({
                title: 'Success',
                description: 'Answer added successfully.',
                variant: 'default',
            });
        } catch (error) {
            console.error('Error adding answer:', error);
            toast({
                title: 'Error',
                description: 'Failed to add answer. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-1/2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Answer
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Answer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter your answer here"
                        className="min-h-[100px]"
                    />
                    {error && (
                        <div className="text-sm text-red-500">{error}</div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Answer'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}