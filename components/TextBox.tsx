"use client";
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
import { ArrowUpIcon, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const TextBox = () => {
  return (
    <div className="w-full max-w-2xl">
      <InputGroup className="flex flex-col space-y-1">
        <InputGroupTextarea
          className="min-h-[200px] resize-none !text-lg"
          placeholder="Type to Accelerate..."
          //   onChange={}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
          >
            <ArrowUpIcon />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">Score</InputGroupText>
          <Separator orientation="vertical" className="!h-5" />
          <InputGroupButton
            variant="default"
            className="rounded-full"
            size="icon-sm"
          >
            0
          </InputGroupButton>
          <InputGroupText className="ml-auto">Translate</InputGroupText>
          <Separator orientation="vertical" className="!h-5" />
          <InputGroupButton
            variant="default"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            size="icon-sm"
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
