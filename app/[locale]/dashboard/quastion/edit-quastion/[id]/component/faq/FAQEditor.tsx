"use client";

import { useState } from "react";
import { QuestionEditor } from "./QuestionEditor";
import { ImageManager } from "../image/ImageManager";
import { VoiceRecordingManager } from "../VoiceRecordingManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FAQ } from "@/type/faq";
import { TagManager } from "../tag/TagManager";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { AnswerList } from "../answer/AnswerList";
import { Tag } from "@/type/types";
import { Settings } from "../setting/Settings";

interface FAQEditorProps {
  faq: FAQ;
}

export function FAQEditor({ faq }: FAQEditorProps) {
  const [editedFAQ, setEditedFAQ] = useState<FAQ>(faq);

  const handleVoiceRecordingsChange = (
    voiceRecordings: FAQ["voiceRecordings"]
  ) => {
    setEditedFAQ((prev) => ({ ...prev, voiceRecordings }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
        <LeftSection
          faqId={faq.id}
          published={faq.published}
          rejected={faq.rejected}
          rejectReson={faq.rejectedReason}
          priority={faq.priority}
        />
        <RightSection
          createdAt={faq.createdAt}
          updatedAt={faq.updatedAt}
          viewerCount={faq.viewerCount}
          loveCount={faq.loveCount}
          dislovCount={faq.dislovCount}
        />
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="question" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {/* Question Tab */}
            <TabsTrigger value="question">Question</TabsTrigger>

            {/* Answers Tab */}
            <TabsTrigger value="answers">
              Answers
              <span
                className={`flex items-center justify-center rounded-full size-4 border text-foreground ml-1 text-[10px] ${faq.answers.length === 0
                  ? "bg-gray-400 border-gray-500" // Gray background if no answers
                  : "bg-green-600 border-green-500" // Green background if answers exist
                  }`}
              >
                {faq.answers.length}
              </span>
            </TabsTrigger>

            {/* Tags Tab */}
            <TabsTrigger value="tags">
              Tags
              <span
                className={`flex items-center justify-center rounded-full size-4 border text-foreground ml-1 text-[10px] ${faq.tagged.length === 0
                  ? "bg-gray-400 border-gray-500" // Gray background if no tags
                  : "bg-green-600 border-green-500" // Green background if tags exist
                  }`}
              >
                {faq.tagged.length}
              </span>
            </TabsTrigger>

            {/* Images Tab */}
            <TabsTrigger value="images">
              Images
              <span
                className={`flex items-center justify-center rounded-full size-4 border text-foreground ml-1 text-[10px] ${faq.images.length === 0
                  ? "bg-gray-400 border-gray-500" // Gray background if no images
                  : "bg-green-600 border-green-500" // Green background if images exist
                  }`}
              >
                {faq.images.length}
              </span>
            </TabsTrigger>

            {/* Voice Tab */}
            <TabsTrigger value="voice">
              Voice
              <span
                className={`flex items-center justify-center rounded-full size-4 border text-foreground ml-1 text-[10px] ${faq.voiceRecordings.length === 0
                  ? "bg-gray-400 border-gray-500" // Gray background if no voice recordings
                  : "bg-green-600 border-green-500" // Green background if voice recordings exist
                  }`}
              >
                {faq.voiceRecordings.length}
              </span>
            </TabsTrigger>

            {/* Settings Tab */}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="question">
            <QuestionEditor question={editedFAQ.question} QID={editedFAQ.id} />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerList QID={editedFAQ.id as string} />
          </TabsContent>
          <TabsContent value="tags">
            <TagManager
              initialTags={faq.tagged as Tag[]}
              faqId={faq.id as string}
            />
          </TabsContent>
          <TabsContent value="images">
            <ImageManager images={editedFAQ.images} />
          </TabsContent>
          <TabsContent value="voice">
            <VoiceRecordingManager
              voiceRecordings={editedFAQ.voiceRecordings}
              onChange={handleVoiceRecordingsChange}
            />
          </TabsContent>
          <TabsContent value="settings">
            <Settings
              initialPublished={editedFAQ.published}
              initialRejected={editedFAQ.rejected}
              initialGotAnswer={editedFAQ.gotAnswer}
              initialRejectedReason={editedFAQ.rejectedReason}
              faqid={editedFAQ.id}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// LeftSection Component
function LeftSection({
  faqId,
  published,
  rejected,
  rejectReson,
  priority,
}: {
  faqId: string;
  published: boolean;
  rejected: boolean;
  rejectReson: string;
  priority: number;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <CardTitle className="text-2xl font-semibold">Edit FAQ</CardTitle>
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">ID: {faqId}</p>
        <Badge variant="secondary" className="w-fit">
          Priority : {priority}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <Badge variant="secondary" className="w-fit">
            {" "}
            {published ? "Online" : "Offline"}
          </Badge>
          {rejected && (
            <Badge variant="secondary" className="w-fit bg-destructive">
              {" "}
              rejected{" "}
            </Badge>
          )}
        </div>
        {rejected && (
          <p className="text-xs text-muted-foreground">
            <strong>Because :</strong>
            {rejectReson}
          </p>
        )}
      </div>
    </div>
  );
}

// RightSection Component
function RightSection({
  createdAt,
  updatedAt,
  viewerCount,
  loveCount,
  dislovCount,
}: {
  createdAt: Date;
  updatedAt: Date;
  viewerCount: number;
  loveCount: number;
  dislovCount: number;
}) {
  return (
    <div className="flex flex-col space-y-2 text-right">
      {/* Metadata: Creation and Update Dates */}
      <div className="flex flex-col space-y-1">
        <p className="text-sm text-muted-foreground flex items-center justify-end">
          <Icon icon="mdi:calendar" className="w-4 h-4 mr-1 inline-block" />
          Created: {createdAt.toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground flex items-center justify-end">
          <Icon icon="mdi:clock" className="w-4 h-4 mr-1 inline-block" />
          Updated: {updatedAt.toLocaleDateString()}
        </p>
      </div>

      {/* Statistics: Views, Likes, Dislikes */}
      <div className="flex justify-end items-center space-x-4">
        <span className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
          {viewerCount}
        </span>
        <span className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Icon icon="mdi:heart" className="w-4 h-4 mr-1" />
          {loveCount}
        </span>
        <span className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Icon icon="mdi:thumbs-down" className="w-4 h-4 mr-1" />
          {dislovCount}
        </span>
      </div>
    </div>
  );
}

// Main FAQCardHeader Component
