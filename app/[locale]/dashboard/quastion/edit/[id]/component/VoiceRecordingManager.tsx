import { useState } from 'react'
import { VoiceRecording } from '@/types/faq'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Upload } from 'lucide-react'

interface VoiceRecordingManagerProps {
  voiceRecordings: VoiceRecording[]
  onChange: (voiceRecordings: VoiceRecording[]) => void
}

export function VoiceRecordingManager({ voiceRecordings, onChange }: VoiceRecordingManagerProps) {
  const [newRecordingUrl, setNewRecordingUrl] = useState('')

  const handleAddRecording = () => {
    if (newRecordingUrl) {
      const newRecording: VoiceRecording = { id: Date.now().toString(), url: newRecordingUrl }
      onChange([...voiceRecordings, newRecording])
      setNewRecordingUrl('')
    }
  }

  const handleRemoveRecording = (id: string) => {
    const newRecordings = voiceRecordings.filter(recording => recording.id !== id)
    onChange(newRecordings)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter voice recording URL"
          value={newRecordingUrl}
          onChange={(e) => setNewRecordingUrl(e.target.value)}
        />
        <Button onClick={handleAddRecording}>
          <Upload className="mr-2 h-4 w-4" /> Add Recording
        </Button>
      </div>
      <div className="space-y-2">
        {voiceRecordings.map((recording) => (
          <div key={recording.id} className="flex items-center space-x-2">
            <audio controls src={recording.url} className="flex-grow" />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveRecording(recording.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

