"use client";

import React, { useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Mode = "reply" | "understand";

interface TextBoxProps {
  /** optional initial message */
  message?: string;
  /** optional initial mode ("reply" | "understand") */
  mode?: Mode;
  /** callback invoked when user sends a message */
  onSend?: (payload: { message: string; mode: Mode }) => void;
}

const TextBox = ({
  message = "",
  mode: initialMode = "reply",
  onSend,
}: TextBoxProps) => {
  const [text, setText] = useState<string>(message);
  const [mode, setMode] = useState<Mode>(initialMode);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const canSend = text.trim().length > 0;

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend?.({ message: trimmed, mode });
    setText("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) handleSend();
    }
  }

  return (
    <div className="w-full">
      <InputGroup className="flex flex-col space-y-1">
        <InputGroupTextarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[200px] resize-none !text-lg"
          placeholder="Type your message here..."
        />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                className={`rounded-full p-4 ${
                  mode === "reply" ? "bg-green-500/20" : "bg-purple-500/20"
                }`}
              >
                {mode === "reply" ? "Reply" : "Understand"}
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className={`[--radius:0.95rem] ${
                mode === "reply"
                  ? "bg-white/50 dark:bg-black/50 backdrop-blur-sm animate-slide-up-fade"
                  : "bg-white/50 dark:bg-black/50 backdrop-blur-sm animate-slide-up-fade"
              }`}
            >
              <DropdownMenuItem onClick={() => setMode("reply")}>
                Reply
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMode("understand")}>
                Understand
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <InputGroupText className="ml-auto"></InputGroupText>
          <Separator orientation="vertical" className="!h-5" />

          <InputGroupButton
            type="button"
            variant="default"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            size="icon-sm"
            onClick={handleSend}
            disabled={!canSend}
            aria-disabled={!canSend}
            title={!canSend ? "Type a message to enable send" : "Send message"}
          >
            <Send />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default TextBox;
