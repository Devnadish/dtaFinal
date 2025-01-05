"use client";

import { useActionState } from "react"; // Use `useActionState` from React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { addFollowUp } from "../actions/actions";

export function AddFollowUp({ id }: { id: string }) {
    const [state, action, isPending] = useActionState(addFollowUp, null);

    return (
        <Dialog>
            {/* Dialog Trigger Button */}
            <DialogTrigger asChild>
                <Button variant={"outline"}>Add Follow-Up</Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Follow-Up</DialogTitle>
                </DialogHeader>

                {/* Form */}
                <form action={action} className="space-y-4">
                    {/* Hidden input for packageRequestId */}
                    <input type="hidden" name="packageRequestId" value={id} />

                    {/* Status Field */}
                    <div>
                        <Label>Status</Label>
                        <Select name="status">
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Contacted">Contacted</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Follow-Up Date Field */}
                    <div>
                        <Label>Follow-Up Date</Label>
                        <Input type="datetime-local" name="followUpDate" />
                    </div>

                    {/* Notes Field */}
                    <div>
                        <Label>Notes</Label>
                        <Input name="notes" />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Adding..." : "Add Follow-Up"}
                    </Button>

                    {/* Display success or error message */}
                    {state?.message && (
                        <p className={`text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}>
                            {state.message}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}