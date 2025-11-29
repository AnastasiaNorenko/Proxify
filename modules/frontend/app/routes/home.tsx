import type { Route } from "./+types/home";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Bot, Send, Terminal } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Giesecke+Devrient - Support Assistant" },
    { name: "description", content: "AI-powered technical support assistant." },
  ];
}

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Welcome to G+D Technical Support. Describe the issue or ask a question regarding SIM card lifecycle management or connectivity." }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      setIsProcessing(false);
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `I understand you are asking about: "${userMsg}". \n\nBased on our knowledge base, here are potential solutions:\n1. Verify the ICCID profile status.\n2. Check the OTA update logs for error code 0x45.\n\nWould you like me to run a diagnostic on the specified SIM batch?` 
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#262474] flex flex-col font-sans text-white">
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-[#262474] shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-sm">
              <div className="w-6 h-6 bg-[#262474] flex items-center justify-center font-bold text-[10px] text-white">G+D</div>
            </div>
            <span className="font-bold text-xl tracking-tight">Giesecke+Devrient</span>
          </div>
          <div className="text-sm font-medium text-white/60 flex items-center gap-2">
             <Terminal size={16} />
             Technical Support Portal
          </div>
        </div>
      </header>

      {/* Main Content - Top Aligned, No Card Box */}
      <main className="flex-1 flex justify-center pt-12 px-4 pb-8">
        <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-160px)]">
          
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-white">AI Support Assistant</h1>
            <p className="text-white/60">Describe the technical issue or query below.</p>
          </div>

          {/* Chat Area - No Box, Transparent */}
          <div className="flex-1 flex flex-col min-h-0">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6 pb-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-6 py-4 text-base leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-white text-[#262474] rounded-br-none font-medium' 
                          : 'bg-[#262474] border border-white/20 text-white/90 rounded-bl-none' // Increased opacity for visibility without card bg
                      }`}>
                        <div className="whitespace-pre-wrap flex items-start gap-3">
                          {msg.role === 'ai' && <Bot className="mt-1 min-w-5 w-5 h-5 text-white/60" />}
                          <span>{msg.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-[#262474] border border-white/20 rounded-2xl rounded-bl-none px-6 py-4 flex gap-2 items-center text-white/60">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area - Floating with backdrop */}
              <div className="mt-4 relative">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="relative flex items-center shadow-2xl rounded-full"
                >
                  <Input 
                    placeholder="Type your question here..." 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="h-16 pl-8 pr-20 rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 hover:bg-white/15 transition-all text-lg shadow-inner"
                    disabled={isProcessing}
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isProcessing}
                    className="absolute right-2 w-12 h-12 rounded-full bg-white text-[#262474] hover:bg-white/90 transition-all shadow-lg"
                  >
                    <Send size={20} />
                  </Button>
                </form>
                <div className="mt-3 text-center text-xs text-white/30 font-medium">
                  AI can make mistakes. Verify important information.
                </div>
              </div>
          </div>

        </div>
      </main>
    </div>
  );
}
