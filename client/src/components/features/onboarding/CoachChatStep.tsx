import React, { useState, useEffect, useRef } from 'react';
import { Coach } from '../../../types/onboardingType';
import { Goal, GoalCategory } from '../../../types/goalsType';

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

const formatAssistantMessage = (content: string): JSX.Element => {
  const lines = content.split('\n').filter(line => line.trim());
  
  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        // Handle task group titles (lines with numbers followed by asterisks)
        if (/^\d+\.\s+\*\*.*\*\*$/.test(line.trim())) {
          return (
            <div key={index} className="font-bold mt-3 mb-1">
              {line.replace(/\*\*/g, '')}
            </div>
          );
        }
        // Handle bullet points
        else if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
          const bulletText = line.trim().substring(1).trim();
          return (
            <div key={index} className="flex gap-2 ml-2">
              <span className="text-gray-400">•</span>
              <span>{bulletText}</span>
            </div>
          );
        }
        // Handle numbered points
        else if (/^\d+\./.test(line.trim())) {
          const numberText = line.trim();
          return (
            <div key={index} className="ml-2">
              {numberText}
            </div>
          );
        }
        // Handle steps
        else if (line.toLowerCase().startsWith('step')) {
          return (
            <div key={index} className="font-medium">
              {line}
            </div>
          );
        }
        // Regular text
        else {
          return <div key={index}>{line}</div>;
        }
      })}
    </div>
  );
};

const CoachChatStep: React.FC<CoachChatStepProps> = ({ coach, onNext, onBack, onGoalSet }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentGoalData, setCurrentGoalData] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage = `Hi! I'm ${coach.name}, your personal coach. Let's work together to set your goals. Could you tell me about the specific goal you'd like to focus on?`;
    setMessages([{ role: 'assistant', content: initialMessage }]);
  }, [coach]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleConfirmGoal = () => {
    if (!currentGoalData) return;
  
    // Transform backend goal format to match frontend Goal interface
    const formattedGoal: Goal = {
      id: currentGoalData.id || Date.now().toString(),
      title: currentGoalData.title,
      description: currentGoalData.description,
      category: 'goal' as GoalCategory,
      relatedTasks: currentGoalData.tasks || [],
      targetDate: new Date(currentGoalData.target_date),
      startDate: new Date(),
      completedDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      reward: currentGoalData.reward,
      progress: 0,
    };
  
    // Update localStorage
    const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    localStorage.setItem('goals', JSON.stringify([...existingGoals, formattedGoal]));

    // Manually dispatch a custom "storage" event
    window.dispatchEvent(new StorageEvent('storage', { key: 'goals' }));

    // Optionally, reset goal state
    setCurrentGoalData(null);
  };
  

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goal_setting_chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      if (data.goal) {
        console.log('Goal received:', data.goal);
        setCurrentGoalData(data.goal);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Goal Display Section */}
      {currentGoalData && (
        <div className="bg-blue-50 p-4 mx-4 mt-4 rounded-lg border border-blue-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-blue-800">Current Goal Being Set:</h3>
            <span className="text-sm text-blue-600 px-2 py-1 bg-blue-100 rounded">
              {currentGoalData.status || 'Active'}
            </span>
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Title:</span> {currentGoalData.title}</p>
            <p><span className="font-medium">Description:</span> {currentGoalData.description}</p>
            <p><span className="font-medium">Target Date:</span> {currentGoalData.target_date}</p>
            {currentGoalData.tasks && currentGoalData.tasks.length > 0 && (
              <div>
                <p className="font-medium mb-1">Tasks:</p>
                <ul className="ml-4 space-y-1">
                  {currentGoalData.tasks.map((task: any, index: number) => (
                    <li key={index} className="text-sm">• {task.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              console.log('Button clicked'); // Log 0: Verify button click
              handleConfirmGoal();
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 
                      transition-colors duration-200 flex items-center gap-2"
          >
              <span>Confirm Goal</span>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                strokeCurrentColor 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } items-end gap-2`}
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
                {message.role === 'assistant' 
                  ? formatAssistantMessage(message.content)
                  : message.content}
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
              <div className="bg-gray-100 text-gray-800 rounded-lg p-3">Typing...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Section */}
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
      </div>
    </div>
  );
};

export default CoachChatStep;