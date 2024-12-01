import React, { useState, useEffect, useRef } from 'react';
import { Coach } from '../../../types/onboardingType';
import { Goal } from '../../../types/goalsType';
import {formatDuration} from '@/utils/formatter'



interface CoachChatStepProps {
  coach: Coach;
  onNext: () => void;
  onBack: () => void;
  onGoalSet: (goal: Goal) => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Time {
  hours: number;
  minutes: number;
}

const formatTime = (time: Time): string => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goal_setting_chat/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          user_input: userMessage,
          coach_name: coach.name,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.history);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatGoalProposal = (goal: Goal): string => {
    return `I've understood your goal. Here's what I propose:\n\n` +
           `🎯 ${goal.title}\n\n` +
           `💭 Why: ${goal.motivation}\n\n` +
           `📝 Actions:\n${goal.relatedTasks?.map(a => 
             `• ${a.title} (${formatDuration(a.duration)})`).join('\n')}\n\n` +
           `🎁 Reward: ${goal.reward}\n\n` +
           `Would you like me to add this goal to your dashboard?`;
  };

return (
  <div className="flex flex-col h-full">
    {/* Messages section */}
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="p-4 space-y-4">
        {messages
          .filter(message => message.role !== 'system')
          .map((message, index) => (
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
    </div>

    {/* Input section */}
    <div className="flex-none border-t bg-white p-4">
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
