import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { getAllPackageRequests } from "./actions/actions";
import { AddFollowUp } from "./component/AddFolowUp";
import { Icon } from "@iconify/react";

type FollowUp = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    packageRequestId: string;
    status: string;
    followUpDate: Date | null;
    notes: string | null;
};

export default async function PackageRequestsPage() {
    const data = await getAllPackageRequests();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Package Requests</h1>
            <div className="space-y-4">
                {data.map((request) => (
                    <details key={request.id} className="group">
                        <summary
                            className="cursor-pointer list-none flex items-center p-4 hover:bg-secondary rounded-lg"
                            aria-expanded={false}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <Icon icon="mdi:user" className="h-6 w-6 text-blue-500" />
                                <div>
                                    <p className="font-semibold">{request.name}</p>
                                    <p className="text-sm text-gray-500">Phone: {request.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="bg-green-500 text-white px-2 rounded-lg mr-2">{request.followUps.length} Follow-Ups</p>

                            </div>
                        </summary>
                        <Card className="shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Icon icon="mdi:user" className="h-6 w-6 text-blue-500" />
                                    <div>
                                        <CardTitle className="text-lg">{request.name}</CardTitle>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <Icon
                                                icon="mdi:phone"
                                                className="h-4 w-4 text-gray-500"
                                            />
                                            {request.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <Icon icon="mdi:calendar" className="h-4 w-4 text-gray-500" />
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 p-4">
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Icon
                                            icon="mdi:map-marker"
                                            className="h-4 w-4 text-gray-500"
                                        />
                                        {request.city}, {request.country}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Icon
                                            icon="mdi:file-document-outline"
                                            className="h-4 w-4 text-gray-500"
                                        />
                                        {request.request}
                                    </p>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Icon
                                            icon="mdi:history"
                                            className="h-5 w-5 text-blue-500"
                                        />
                                        Follow-Ups
                                    </h3>
                                    {request.followUps.length > 0 ? (
                                        <div className="space-y-2">
                                            {request.followUps.map((followUp) => (
                                                <div
                                                    key={followUp.id}
                                                    className="border-l-4 pl-4 border-blue-500"
                                                >
                                                    <div className="w-full flex items-center justify-between">
                                                        <p className="flex items-center gap-2 text-sm">
                                                            <Icon
                                                                icon="mdi:clipboard-text-outline"
                                                                className="h-4 w-4 text-blue-500"
                                                            />
                                                            <strong>Status:</strong> {followUp.status}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <Icon
                                                                icon="mdi:calendar"
                                                                className="h-4 w-4 text-blue-500"
                                                            />
                                                            <strong>Follow-Up Date:</strong>{" "}
                                                            {followUp.followUpDate?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <p className="flex items-center gap-2">
                                                        <Icon
                                                            icon="mdi:note-text-outline"
                                                            className="h-4 w-4 text-blue-500"
                                                        />
                                                        <strong>Notes:</strong>{" "}
                                                        {followUp.notes || "No notes"}
                                                    </p>
                                                    <div className="flex gap-2 mt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Icon icon="mdi:pencil" className="h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Icon icon="mdi:trash" className="h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No follow-ups available.</p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4">
                                <AddFollowUp id={request.id} />
                            </CardFooter>
                        </Card>
                    </details>
                ))}
            </div>
        </div>
    );
}
