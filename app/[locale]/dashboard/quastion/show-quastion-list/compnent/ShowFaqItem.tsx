'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Icon } from '@iconify/react';
import { FAQ } from '@/type/faq';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface FAQItemProps {
    faq: FAQ;
}

export function FAQItem({ faq }: FAQItemProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const locale = useLocale()

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className='flex w-full items-center justify-between'>
                    <CardTitle>{faq.question}</CardTitle>
                    <Link
                        href={`/${locale}/dashboard/quastion/edit-quastion/${faq.id}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        <Icon icon="mdi:pencil" className="w-5 h-5" />
                        <span>Edit</span>
                    </Link>
                </div>
                <div>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
                        <span className="flex items-center">
                            <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                            {faq.viewerCount} views
                        </span>
                        <span className="flex items-center">
                            <Icon icon="mdi:heart" className="w-4 h-4 mr-1" />
                            {faq.loveCount} loves
                        </span>
                        <span className="flex items-center">
                            <Icon icon="mdi:thumb-down" className="w-4 h-4 mr-1" />
                            {faq.dislovCount} dislikes
                        </span>
                        <p className='ml-auto'><strong>Priority:</strong> {faq.priority}</p>
                        {faq.images.length > 0 && (
                            <span className="flex items-center">
                                <Icon icon="mdi:image" className="w-4 h-4 mr-1" />
                                {faq.images.length} images
                            </span>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {faq.tagged.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag.tag}</Badge>
                    ))}
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="details">
                        <AccordionTrigger>Show Details</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                    <p><strong>Status:</strong> {faq.published ? 'Published' : 'Unpublished'}</p>
                                    <p><strong>Created:</strong> {faq.createdAt.toLocaleDateString()}</p>
                                    <p><strong>Updated:</strong> {faq.updatedAt.toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p><strong>User Plan:</strong> {faq.userPlan}</p>

                                    <p><strong>Answered:</strong> {faq.gotAnswer ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            {faq.answers.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2">Answers:</h3>
                                    <ul className="list-disc pl-5">
                                        {faq.answers.map((answer, index) => (
                                            <li key={index}>{answer.content}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {faq.images.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2">Images:</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {faq.images.map((image, index) => (
                                            <div key={index} className="relative aspect-square">
                                                <Image
                                                    src={image.url}
                                                    alt={`FAQ image ${index + 1}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded cursor-pointer"
                                                    onClick={() => setSelectedImage(image.url)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {faq.voiceRecordings.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2">Voice Recordings:</h3>
                                    {faq.voiceRecordings.map((recording, index) => (
                                        <audio key={index} controls className="w-full mb-2">
                                            <source src={recording.url} type="audio/webm" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-3xl max-h-full">
                        <Image
                            src={selectedImage}
                            alt="Selected FAQ image"
                            layout="responsive"
                            width={800}
                            height={600}
                            objectFit="contain"
                        />
                        <Button
                            variant="secondary"
                            className="absolute top-4 right-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}

