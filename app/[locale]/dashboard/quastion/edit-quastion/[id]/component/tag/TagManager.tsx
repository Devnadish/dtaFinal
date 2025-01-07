'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Check, Loader2 } from 'lucide-react'; // Import icons for success and loading states
import { Tag } from '@/type/types';
import { deleteTag, fetchTags, updateTags } from './tagActions';
import { Skeleton } from '@/components/ui/skeleton'; // Import skeleton component

interface TagManagerProps {
    initialTags: Tag[]; // Initial tags passed from the parent
    faqId: string; // FAQ ID for associating tags
}

// Component to display a single tag
function TagItem({ tag, onRemove }: { tag: Tag; onRemove: (tag: string) => void }) {
    return (
        <Badge variant="secondary" className="flex items-center gap-2 transition-all hover:bg-secondary/80">
            {tag.tag}
            <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600"
                onClick={() => onRemove(tag.tag)}
                aria-label={`Remove tag ${tag.tag}`}
            >
                <X className="h-3 w-3" />
            </Button>
        </Badge>
    );
}

// Component to display the list of selected tags
function SelectedTags({ tags, onRemove }: { tags: Tag[]; onRemove: (tag: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <TagItem key={tag.id} tag={tag} onRemove={onRemove} />
            ))}
        </div>
    );
}

// Component to display the list of available tags for selection
function AvailableTags({ tags, onSelect }: { tags: Tag[]; onSelect: (tag: Tag) => void }) {
    return (
        <div className="flex flex-wrap gap-2 border border-border p-2 rounded-lg">
            {tags.map((tag) => (
                <Badge
                    key={tag.id}
                    variant="outline"
                    className="cursor-pointer transition-all hover:bg-primary/10 hover:text-primary"
                    onClick={() => onSelect(tag)}
                >
                    {tag.tag}
                </Badge>
            ))}
        </div>
    );
}

// Component to display a skeleton loader for available tags
function AvailableTagsSkeleton() {
    return (
        <div className="flex flex-wrap gap-2 border border-border p-2 rounded-lg">
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-20 rounded-md" />
            ))}
        </div>
    );
}

// Main TagManager component
export function TagManager({ initialTags = [], faqId }: TagManagerProps) {
    const [tags, setTags] = useState<Tag[]>(initialTags); // Local state for selected tags
    const [pendingTags, setPendingTags] = useState<Tag[]>(initialTags); // State for pending tag changes
    const [availableTags, setAvailableTags] = useState<Tag[]>([]); // All tags fetched from the database
    const [loading, setLoading] = useState(true); // Loading state for fetching tags
    const [error, setError] = useState<string | null>(null); // Error state
    const [isUpdating, setIsUpdating] = useState(false); // Loading state for updating tags
    const [isUpdated, setIsUpdated] = useState(false); // Success state after updating tags

    // Fetch all tags from the server using Server Actions
    useEffect(() => {
        const fetchAndSetTags = async () => {
            try {
                const data = await fetchTags();
                setAvailableTags(data as Tag[]); // Set the fetched tags
            } catch (error) {
                console.error('Error fetching tags:', error);
                setError('Failed to fetch tags. Please try again.');
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchAndSetTags();
    }, []);

    // Update tags in the database
    const handleUpdateTags = async (updatedTags: Tag[]) => {
        setIsUpdating(true); // Start loading
        setError(null); // Clear any errors
        setIsUpdated(false); // Reset success state

        try {
            // Validate the tags array
            const validTags = Array.isArray(updatedTags) ? updatedTags : [];

            console.log('Updating tags with payload:', { faqId, tags: validTags });
            await updateTags(faqId, validTags); // Update tags in the database
            setTags(validTags); // Update the local state with the saved tags
            setIsUpdated(true); // Show success message
        } catch (error) {
            console.error('Error updating tags:', error);
            setError('Failed to update tags. Please try again.');
        } finally {
            setIsUpdating(false); // Stop loading
        }
    };

    // Remove a tag from the pending tags list
    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = pendingTags.filter((t) => t.tag !== tagToRemove);
        setPendingTags(newTags); // Update the pending tags state
    };

    // Select a tag from the available tags and add it to the pending tags list
    const handleSelectTag = (selectedTag: Tag) => {
        if (!pendingTags.some((t) => t.tag === selectedTag.tag)) {
            const newTags = [...pendingTags, selectedTag];
            setPendingTags(newTags); // Update the pending tags state
        }
    };

    // Save the pending tags to the database
    const handleSaveTags = async () => {
        if (!pendingTags || !Array.isArray(pendingTags)) {
            setError('Invalid tags data. Please try again.');
            return;
        }

        console.log('Saving tags:', pendingTags);
        await handleUpdateTags(pendingTags); // Save the pending tags
    };

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-background shadow-sm">
            <h3 className="text-lg font-semibold">Current Tags</h3>

            {/* Display selected tags */}
            <SelectedTags tags={pendingTags} onRemove={handleRemoveTag} />

            {/* Error message */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Success message */}
            {isUpdated && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Tags updated successfully!</span>
                </div>
            )}

            {/* Display available tags for selection */}
            {loading ? (
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Add Tags</h3>
                    <AvailableTagsSkeleton />
                </div>
            ) : (
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Add Tags</h3>
                    <AvailableTags tags={availableTags} onSelect={handleSelectTag} />
                </div>
            )}

            {/* Button to save the pending tags */}
            {!loading && pendingTags.length > 0 && (
                <Button
                    onClick={handleSaveTags}
                    className="mt-4 transition-all"
                    disabled={isUpdating} // Disable button while updating
                >
                    {isUpdating ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        'Update Tags'
                    )}
                </Button>
            )}
        </div>
    );
}