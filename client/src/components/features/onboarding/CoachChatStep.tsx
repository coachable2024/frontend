import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Coach } from '../../../types/onboarding';
import { Goal } from '../../../types/goal';

interface CoachChatStepProps {
  coach: Coach;
  onNext: () => void;
  onBack: () => void;
  onGoalSet: (goal: Goal) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const formatTime = (time: { hours: number; minutes: number }): string => {
  const parts: string[] = [];
  if (time.hours > 0) {
    parts.push(`${time.hours}h`);
  }
  if (time.minutes > 0) {
    parts.push(`${time.minutes}m`);
  }
  return parts.join(' ');
};

const CoachChatStep: React.FC<CoachChatStepProps> = ({ coach, onNext, onBack, onGoalSet }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [proposedGoal, setProposedGoal] = useState<Goal | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage = `Hi! I'm ${coach.name}, a ${coach.personality}. I'm here to help you achieve your goals. Could you tell me about the specific goal you'd like to work on?`;
    setMessages([{ role: 'assistant', content: initialMessage }]);
  }, [coach]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  }, []);

  const handleConfirmGoal = () => {
    if (proposedGoal) {
      onGoalSet(proposedGoal);
      setMessages(prev => [...prev, 
        { role: 'assistant', content: "Great! I've added this goal to your dashboard. Let's start working on it together!" }
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-answer-structured-output/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          question: userMessage,
          messages: messages,
          coachPersonality: coach.personality,
          coachName: coach.name
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.answer && data.answer.description) {
        // Convert FastAPI response format to your app's format
        const goalData = {
          title: data.answer.description,
          why: "Generated from your goal",
          actions: data.answer.tasks.map((task: any) => ({
            name: task.description,
            time: { hours: 1, minutes: 0 }, // You might want to calculate this from task dates
            completed: task.status === "COMPLETED"
          })),
          reward: "Achievement of your goal"
        };
        
        setProposedGoal(goalData);
        const goalProposal = formatGoalProposal(goalData);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: goalProposal
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.answer || "I couldn't understand the goal. Could you please rephrase it?" 
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = await error.response?.text();
      let debugMessage = '';
      
      try {
        const errorData = JSON.parse(errorMessage);
        debugMessage = errorData.debug || error.message || 'Unknown error';
      } catch {
        debugMessage = error.message || 'Unknown error';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I'm sorry, I'm having trouble responding right now. Error: ${debugMessage}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatGoalProposal = (goal: Goal): string => {
    return `I've understood your goal. Here's what I propose:\n\n` +
           `🎯 ${goal.title}\n\n` +
           `💭 Why: ${goal.why}\n\n` +
           `📝 Actions:\n${goal.actions.map(a => 
             `• ${a.name} (${formatTime(a.time)})`).join('\n')}\n\n` +
           `🎁 Reward: ${goal.reward}\n\n` +
           `Would you like me to add this goal to your dashboard?`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
          >
            {message.role === 'assistant' && (
              <img 
                src={coach.profileImage}
                alt={coach.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${coach.name}`;
                }}
              />
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-end gap-2">
            <img 
              src={coach.profileImage}
              alt={coach.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${coach.name}`;
              }}
            />
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        {proposedGoal && (
          <button
            onClick={handleConfirmGoal}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg 
                     hover:bg-green-700 transition-colors"
          >
            Confirm Goal
          </button>
        )}
      </div>
    </div>
  );
};

export default CoachChatStep; 