'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FAQ } from '@/types/faq'

interface FAQDetailsProps {
    faq: FAQ
}

export function showFaqDetails({ faq }: FAQDetailsProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const toggleExpand = () => setIsExpanded(!isExpanded)

    return (
        <>
            <button
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={toggleExpand}
            >
                {isExpanded ? 'Hide Details' : 'Show Details'}
                <Image
                    src={isExpanded ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
                    width={16}
                    height={16}
                    alt={isExpanded ? "Hide" : "Show"}
                    className="ml-1"
                />
            </button>
            {isExpanded && (
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p><strong>Status:</strong> {faq.published ? 'Published' : 'Unpublished'}</p>
                            <p><strong>Created:</strong> {new Date(faq.createdAt).toLocaleDateString()}</p>
                            <p><strong>Updated:</strong> {new Date(faq.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p><strong>User Plan:</strong> {faq.userPlan}</p>
                            <p><strong>Priority:</strong> {faq.priority}</p>
                            <p><strong>Answered:</strong> {faq.gotAnswer ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    {faq.answers.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Answers:</h3>
                            <ul className="list-disc pl-5">
                                {faq.answers.map((answer, index) => (
                                    <li key={index}>{answer}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {faq.images.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Images:</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {faq.images.map((image, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <Image
                                            src={image}
                                            alt={`FAQ image ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded cursor-pointer"
                                            onClick={() => setSelectedImage(image)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {faq.voiceRecordings.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Voice Recordings:</h3>
                            {faq.voiceRecordings.map((recording, index) => (
                                <audio key={index} controls className="w-full mb-2">
                                    <source src={recording.url} type="audio/webm" />
                                    Your browser does not support the audio element.
                                </audio>
                            ))}
                        </div>
                    )}
                </div>
            )}
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
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <Image src="/icons/close.svg" width={24} height={24} alt="Close" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

