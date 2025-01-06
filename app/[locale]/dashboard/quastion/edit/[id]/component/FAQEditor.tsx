'use client';

import { useState } from 'react';
import { QuestionEditor } from './QuestionEditor';
import { AnswerList } from './AnswerList';
import { ImageManager } from './ImageManager';
import { VoiceRecordingManager } from './VoiceRecordingManager';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FAQ } from '@/type/faq';
import { TagManager } from './TagManager';
import { Icon } from '@iconify/react';
import { Answer, Tag } from '@/type/types';

interface FAQEditorProps {
  faq: FAQ;
}

export function FAQEditor({ faq }: FAQEditorProps) {
  const [editedFAQ, setEditedFAQ] = useState<FAQ>(faq);

  const handleQuestionChange = (question: string) => {
    setEditedFAQ(prev => ({ ...prev, question }));
  };

  const handleAnswersChange = (answers: FAQ['answers']) => {
    setEditedFAQ(prev => ({ ...prev, answers }));
  };

  const handleImagesChange = (images: FAQ['images']) => {
    setEditedFAQ(prev => ({ ...prev, images }));
  };

  const handleVoiceRecordingsChange = (voiceRecordings: FAQ['voiceRecordings']) => {
    setEditedFAQ(prev => ({ ...prev, voiceRecordings }));
  };

  const handleSave = () => {
    // Logic to save the updated FAQ
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-4">
        <Button onClick={handleSave}>Save FAQ</Button>
      </div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex items-center justify-between flex-row w-full">
          <div className="flex items-start">
            <div>
              <CardTitle className="text-2xl mb-2">Edit FAQ</CardTitle>
              <p className="text-sm text-muted-foreground mb-2">ID: {editedFAQ.id}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">
              <Icon icon="mdi:calendar" className="inline-block w-4 h-4 mr-1" />
              Created: {editedFAQ.createdAt.toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              <Icon icon="mdi:clock" className="inline-block w-4 h-4 mr-1" />
              Updated: {editedFAQ.updatedAt.toLocaleDateString()}
            </p>
            <div className="flex justify-end items-center space-x-4 mt-2">
              <span className="flex items-center text-sm">
                <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                {editedFAQ.viewerCount}
              </span>
              <span className="flex items-center text-sm">
                <Icon icon="mdi:heart" className="w-4 h-4 mr-1" />
                {editedFAQ.loveCount}
              </span>
              <span className="flex items-center text-sm">
                <Icon icon="mdi:thumbs-down" className="w-4 h-4 mr-1" />
                {editedFAQ.dislovCount}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="question" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="question">Question</TabsTrigger>
              <TabsTrigger value="answers">Answers</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="question">
              <QuestionEditor
                question={editedFAQ.question}
                QID={editedFAQ.id}

              />
            </TabsContent>
            <TabsContent value="answers">
              <AnswerList
                QID={editedFAQ.id as string}

              />
            </TabsContent>
            <TabsContent value="tags">
              <TagManager initialTags={faq.tagged as Tag[]} faqId={faq.id as string} />
            </TabsContent>
            <TabsContent value="images">
              <ImageManager
                images={editedFAQ.images}
                onChange={handleImagesChange}
              />
            </TabsContent>
            <TabsContent value="voice">
              <VoiceRecordingManager
                voiceRecordings={editedFAQ.voiceRecordings}
                onChange={handleVoiceRecordingsChange}
              />
            </TabsContent>
            <TabsContent value="settings">
              <p>Settings</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}