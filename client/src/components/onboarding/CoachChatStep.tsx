import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Coach } from '../../types/onboarding';

interface CoachChatStepProps {
  coach: Coach;
  onNext: () => void;
  onBack: () => void;
  onGoalSet: (goal: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CoachChatStep: React.FC<CoachChatStepProps> = ({ coach, onNext, onBack, onGoalSet }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          coachPersonality: coach.personality,
          coachName: coach.name,
          coachImage: coach.profileImage
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.message) {
        throw new Error('Invalid response format');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      
      if (messages.length === 1) {
        onGoalSet(userMessage);
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble responding right now. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center bg-gray-50">
          <img 
            src={coach.profileImage}
            alt={coach.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${coach.name}`;
            }}
          />
          <div className="ml-3">
            <h3 className="font-semibold text-lg">{coach.name}</h3>
            <p className="text-sm text-gray-600">{coach.personality}</p>
          </div>
        </div>

        <div className="p-6 min-h-[500px] flex flex-col">
          <div className="flex-grow overflow-y-auto mb-4 space-y-4">
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
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default CoachChatStep; 