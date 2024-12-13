import React, { useState } from 'react';
import { Target, Heart, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HabitsCollectionStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedCoach: any;
  onHabitsSave?: (data: any) => void;
}

const HabitsCollectionStep: React.FC<HabitsCollectionStepProps> = ({ 
  onNext, 
  onBack, 
  selectedCoach,
  onHabitsSave 
}) => {
  const [messages, setMessages] = useState([
    {
      sender: 'coach',
      avatar: selectedCoach?.profileImage || "/api/placeholder/32/32",
      message: "Great progress so far! Now let's build a strong foundation with daily habits and activities that energize you. What habits would you like to build or maintain?",
      type: 'text'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [currentStage, setCurrentStage] = useState('habits');
  const [collectedHabits, setCollectedHabits] = useState([]);
  const [collectedSelfCare, setCollectedSelfCare] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, {
      sender: 'user',
      message: userInput,
      type: 'text'
    }];

    if (currentStage === 'habits') {
      setCollectedHabits([...collectedHabits, {
        activity: userInput,
        duration: '30 mins daily'
      }]);
      newMessages.push({
        sender: 'coach',
        avatar: selectedCoach?.profileImage || "/api/placeholder/32/32",
        message: "I've added this to your habits. Would you like to add another habit, or shall we move on to self-care activities?",
        type: 'text',
        actions: ['Add another habit', 'Move to self-care']
      });
    } else if (currentStage === 'selfCare') {
      setCollectedSelfCare([...collectedSelfCare, {
        name: userInput,
        frequency: 'As needed'
      }]);
      
      newMessages.push({
        sender: 'coach',
        avatar: selectedCoach?.profileImage || "/api/placeholder/32/32",
        message: "Great choices! You've created a good balance of habits and self-care activities. Ready to move forward?",
        type: 'text'
      });
      setIsComplete(true);
    }

    setMessages(newMessages);
    setUserInput('');
  };

  const renderMessage = (msg: any) => (
    <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
      {msg.sender === 'coach' && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <img src={msg.avatar} alt="Coach" className="rounded-full" />
        </div>
      )}
      <div className={`max-w-[80%] p-4 rounded-xl ${
        msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
      }`}>
        <div>{msg.message}</div>
        {msg.actions && (
          <div className="mt-3 space-x-2">
            {msg.actions.map((action: string, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  if (action === 'Move to self-care') {
                    setCurrentStage('selfCare');
                    setMessages(prev => [...prev, {
                      sender: 'coach',
                      avatar: selectedCoach?.profileImage || "/api/placeholder/32/32",
                      message: "Self-care is crucial for maintaining balance. What activities bring you joy and help you recharge?",
                      type: 'text'
                    }]);
                  }
                }}
                className="px-3 py-1 bg-white text-blue-600 rounded-lg text-sm hover:bg-blue-50"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      {collectedHabits.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-blue-500" />
            <h3 className="font-medium text-blue-800">Your Daily Habits</h3>
          </div>
          <div className="space-y-2">
            {collectedHabits.map((habit, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">{habit.activity}</div>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {habit.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {collectedSelfCare.length > 0 && (
        <div className="p-4 bg-rose-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="text-rose-500" />
            <h3 className="font-medium text-rose-800">Your Self-Care Activities</h3>
          </div>
          <div className="space-y-2">
            {collectedSelfCare.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">{activity.name}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {activity.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col bg-white rounded-xl shadow-sm"
    >
      <div className="p-6 border-b flex-shrink-0">
        <h2 className="text-2xl font-bold">Build Your Foundation</h2>
        <p className="text-gray-600">Let's establish habits and activities that support your wellbeing</p>
      </div>

      <div className="flex-1 overflow-auto space-y-6 p-6">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index}>
              {renderMessage(msg)}
            </div>
          ))}
        </div>
        
        {(collectedHabits.length > 0 || collectedSelfCare.length > 0) && (
          <div className="border-t pt-6">
            {renderSummary()}
          </div>
        )}
      </div>

      <div className="p-6 border-t mt-auto flex-shrink-0">
        <div className="flex gap-4 items-center">
          <button
            onClick={onBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
          <div className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={currentStage === 'habits' ? 
                  "e.g., Exercise 30 mins a day" : 
                  "e.g., Walking in nature"
                }
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={handleSendMessage}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <button
            onClick={onNext}
            disabled={!isComplete}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitsCollectionStep;