import React, { useState } from 'react';
import { MessageCircle, Target, ArrowRight, Clock, Plus, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoalSettingStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedCoach: any;
}

const GoalSettingStep: React.FC<GoalSettingStepProps> = ({ onNext, onBack, selectedCoach }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'coach',
      avatar: selectedCoach?.profileImage || "/api/placeholder/32/32",
      message: "Hi! I'd love to help you set a meaningful goal. What's something important you'd like to achieve?",
      type: 'text'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [smartGoal, setSmartGoal] = useState(null);
  const [showTaskBreakdown, setShowTaskBreakdown] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [tasks, setTasks] = useState({
    "Skills Development": [
      { title: "Complete React fundamentals course", timeframe: "2 weeks", status: "pending" },
      { title: "Build portfolio project #1", timeframe: "2 weeks", status: "pending" },
      { title: "Practice coding challenges", timeframe: "Daily", status: "pending" }
    ],
    "Job Search": [
      { title: "Update resume with projects", timeframe: "3 days", status: "pending" },
      { title: "Set up LinkedIn profile", timeframe: "2 days", status: "pending" },
      { title: "Research target companies", timeframe: "1 week", status: "pending" }
    ],
    "Networking": [
      { title: "Join 2 tech communities", timeframe: "1 week", status: "pending" },
      { title: "Attend local tech meetup", timeframe: "Bi-weekly", status: "pending" },
      { title: "Connect with 3 developers", timeframe: "Weekly", status: "pending" }
    ]
  });

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, {
      sender: 'user',
      message: userInput,
      type: 'text'
    }];

    newMessages.push({
      sender: 'coach',
      avatar: selectedCoach?.profileImage || "/api/placeholder/32/32",
      message: "Great input! Let's break this down further. Would you like to see my suggested task breakdown?",
      type: 'text'
    });

    if (messages.length > 4) {
      setSmartGoal({
        main: "Find a Frontend Developer role at a tech company",
        specific: "Frontend Developer position at a tech startup or established company",
        measurable: "Secure job offer with desired salary range",
        achievable: "Build required skills and apply to 10 companies per week",
        relevant: "Aligns with career growth in tech industry",
        timebound: "Within 3 months"
      });
      setShowTaskBreakdown(true);
    }

    setMessages(newMessages);
    setUserInput('');
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col bg-white rounded-xl shadow-sm"
    >
      <div className="p-6 border-b flex-shrink-0">
        <h2 className="text-2xl font-bold">What's Your Main Goal?</h2>
        <p className="text-gray-600">Let's work together to define a clear, achievable goal</p>
      </div>

      <div className="flex-1 overflow-auto space-y-6 p-6">
        {/* Chat Messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.sender === 'coach' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <img src={msg.avatar} alt="Coach" className="rounded-full" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* SMART Goal Summary and Task Breakdown */}
        {smartGoal && (
          <div className="border-t pt-6 space-y-6">
            {/* SMART Goal Summary */}
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-blue-500" />
                <h3 className="font-medium text-blue-800">Your SMART Goal</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium">{smartGoal.main}</div>
                  <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {smartGoal.timebound}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {['S', 'M', 'A', 'R', 'T'].map((letter, index) => (
                    <div key={letter} className="flex items-center p-2 bg-blue-100/50 rounded">
                      <span className="font-medium text-blue-700 w-8">{letter}</span>
                      <span className="text-blue-600">
                        {smartGoal[Object.keys(smartGoal)[index + 1]]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Breakdown */}
            {showTaskBreakdown && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" />
                      <h3 className="font-medium text-green-800">Task Breakdown</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(tasks).map(([category, categoryTasks]) => (
                      <div key={category} className="bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full p-3 flex items-center justify-between font-medium text-left hover:bg-gray-50"
                        >
                          <span>{category}</span>
                          {expandedCategories[category] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {expandedCategories[category] && (
                          <div className="p-3 space-y-2 border-t">
                            {categoryTasks.map((task, taskIdx) => (
                              <div key={taskIdx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{task.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{task.timeframe}</span>
                              </div>
                            ))}
                            <button className="w-full p-2 text-sm text-green-600 hover:bg-green-50 rounded flex items-center justify-center gap-1">
                              <Plus size={16} />
                              Add Task
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modification Note */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <img 
                        src={selectedCoach?.profileImage || "/api/placeholder/40/40"} 
                        alt="Coach" 
                        className="rounded-full" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">
                        Don't worry about getting everything perfect now! You can always adjust your goal and tasks later in the dashboard. As your coach, I'll be there to help you refine and adapt your plan as you progress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                placeholder="e.g., Find a job in tech within 3 months"
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
            disabled={!showTaskBreakdown}
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

export default GoalSettingStep;