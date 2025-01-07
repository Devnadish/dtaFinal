'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { updateFaqSettings } from './settingAction';

interface SettingsProps {
    initialPublished: boolean;
    initialRejected: boolean;
    initialGotAnswer: boolean;
    initialRejectedReason: string;
    faqid: string;

}

export function Settings({
    initialPublished,
    initialRejected,
    initialGotAnswer,
    initialRejectedReason,
    faqid

}: SettingsProps) {
    const [published, setPublished] = useState(initialPublished);
    const [rejected, setRejected] = useState(initialRejected);
    const [gotAnswer, setGotAnswer] = useState(initialGotAnswer);
    const [rejectedReason, setRejectedReason] = useState(initialRejectedReason);

    const handleSave = async () => {
        // alert(rejected)
        if (rejected && !rejectedReason.trim()) {
            toast.error('Please provide a reason for rejection.');
            return;
        }

        const applaySetting = await updateFaqSettings({
            faqId: faqid, // Ensure the property name matches the interface
            published,
            rejected,
            gotAnswer,
            rejectedReason,
        });


        toast.success('Settings saved successfully!');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Question Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Published Toggle */}
                <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch
                        id="published"
                        checked={published}
                        onCheckedChange={(checked) => setPublished(checked)}
                    />
                </div>

                {/* Rejected Toggle */}
                <div className="flex items-center justify-between">
                    <Label htmlFor="rejected">Rejected</Label>
                    <Switch
                        id="rejected"
                        checked={rejected}
                        onCheckedChange={(checked) => {
                            setRejected(checked);
                            if (!checked) setRejectedReason(''); // Clear reason if rejected is false
                        }}
                    />
                </div>

                {/* Rejected Reason Input (Conditional) */}
                {rejected && (
                    <div className="space-y-2">
                        <Label htmlFor="rejectedReason">Rejection Reason</Label>
                        <Input
                            id="rejectedReason"
                            value={rejectedReason}
                            onChange={(e) => setRejectedReason(e.target.value)}
                            placeholder="Enter reason for rejection..."
                        />
                    </div>
                )}

                {/* Got Answer Toggle */}
                <div className="flex items-center justify-between">
                    <Label htmlFor="gotAnswer">Got Answer</Label>
                    <Switch
                        id="gotAnswer"
                        checked={gotAnswer}
                        onCheckedChange={(checked) => setGotAnswer(checked)}
                    />
                </div>
            </CardContent>
            <CardFooter className='justify-end'>
                <Button onClick={handleSave}>Save Settings</Button>
            </CardFooter>
        </Card>
    );
}