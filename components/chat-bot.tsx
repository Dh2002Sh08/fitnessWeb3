"use client";
import { useChat } from 'ai/react'
import { Textarea } from "@/components/textarea"
import { Button } from "@/components/button"
import { SendIcon, SparklesIcon } from "lucide-react"

export function ChatBot() {
  const {messages , input , handleInputChange , handleSubmit} = useChat({
    api: "api/chat",
  });


  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[690px] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
          message.role === "assistant" ? (
            <div  key = {message.id} className="flex items-start gap-3">
            <div className="p-2 border border-gray-600 rounded-full">
              <SparklesIcon className="size-5 text-primary" fill="currentColor"></SparklesIcon>
            </div>
            <div className="bg-muted rounded-lg p-3 max-w-[70%]">
              <p className="text-sm text-muted-foreground">
                {message.content}
                </p>
            </div>
          </div>

          ) : (
            <div  key = {message.id} className="flex justify-end">
            <div className="bg-primary rounded-lg p-3 max-w-[70%]">
              <p className="text-sm text-primary-foreground">
                {message.content}
              </p>
            </div>
          </div>
          )
          
          )}

          <form onSubmit={handleSubmit}
           className="bg-muted/50 px-4 py-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Textarea
                placeholder="Type your message..."
                className="rounded-lg pr-12 min-h-[64px] text-black"
                rows={2}
                value = {input}
                onChange={handleInputChange}
              />
              <Button type="submit" size="icon" 
                disabled = {!input}
              className="absolute bottom-3 right-3 rounded-full">
                <SendIcon className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

