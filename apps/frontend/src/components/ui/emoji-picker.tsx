import React from 'react';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  emoji: string;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiPicker = ({ emoji, setEmoji }: EmojiPickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex-shrink-0 text-4xl p-2 rounded-full shadow-md bg-[#9E7682]/20 border border-[#9E7682]/10 transition-all hover:scale-110"
          style={{
            boxShadow:
              'inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.1)',
          }}>
          {emoji}
        </button>
      </DialogTrigger>

      <DialogContent className="w-auto h-auto p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Emoji Picker</DialogTitle>
          <DialogDescription>Select an emoji from the picker</DialogDescription>
        </VisuallyHidden>
        <Picker
          data={data}
          onEmojiSelect={(emojiData: { native: string }) => {
            setEmoji(emojiData.native);
            setOpen(false);
          }}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            boxShadow: 'none',
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EmojiPicker;
