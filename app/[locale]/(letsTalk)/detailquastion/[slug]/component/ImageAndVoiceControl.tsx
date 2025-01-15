import Slider from "../../../../../../components/Slider";
import { CollapsibleComponent } from "../../../../../../components/ui/Collapse";
import PlayVoice from "./PlayVoice";
import { Icon } from "@iconify/react";

interface ImageAndVoiceProps {
  images?: { id: string; url?: string }[]; // url is optional (string | undefined)
  voiceRecordings?: { id: string; url?: string }[]; // url must be a string
}

const ImageAndVoice = ({ images, voiceRecordings }: ImageAndVoiceProps) => {
  const validVoiceRecordings =
    voiceRecordings
      ?.filter((recording) => recording.url !== undefined)
      .map((recording) => ({
        id: recording.id,
        url: recording.url as string,
      })) || [];

  return (
    <>
      {/* Render images if available */}
      {images && images.length > 0 && (
        <CollapsibleComponent title={<ImageCounter counter={images.length} />}>
          <Slider images={images.filter((image) => image.url !== undefined)} />
        </CollapsibleComponent>
      )}

      {/* Render voice recordings if available */}
      {validVoiceRecordings.length > 0 && (
        <PlayVoice voice={validVoiceRecordings} />
      )}
    </>
  );
};

export default ImageAndVoice;

const ImageCounter = ({ counter }: { counter: number }) => (
  <span className="flex items-center text-xs bg-green-800 p-1 rounded-lg border border-green-400 text-green-300 justify-center">
    <Icon icon="mdi:image" className="w-4 h-4 mr-1" />
    {counter}
  </span>
);
