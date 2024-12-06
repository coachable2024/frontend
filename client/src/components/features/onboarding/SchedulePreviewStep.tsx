import React from 'react';
import { Sun, Pencil, Coffee, Brain, Book, Plus, ArrowRight, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SchedulePreviewStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedCoach: any;
  onScheduleSave?: (data: any) => void;
}

const SchedulePreviewStep: React.FC<SchedulePreviewStepProps> = ({ 
  onNext, 
  onBack, 
  selectedCoach,
  onScheduleSave 
}) => {
  const scheduledActivities = [
    {
      icon: <Sun className="text-yellow-500" />,
      title: "Morning Routine",
      description: "Meditation + Journaling",
      startTime: "07:00",
      endTime: "08:30",
      duration: "1h 30m",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Pencil className="text-blue-500" />,
      title: "Job Search Tasks",
      description: "Application writing + Research",
      startTime: "09:00",
      endTime: "10:30",
      duration: "1h 30m",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Coffee className="text-orange-500" />,
      title: "Break",
      description: "Walking",
      startTime: "10:45",
      endTime: "11:15",
      duration: "30m",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Brain className="text-purple-500" />,
      title: "Skill Development",
      description: "Technical practice",
      startTime: "11:15",
      endTime: "12:45",
      duration: "1h 30m",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Book className="text-green-500" />,
      title: "Learning Block",
      description: "Online course work",
      startTime: "14:00",
      endTime: "15:30",
      duration: "1h 30m",
      bgColor: "bg-green-50"
    }
  ];

  const premiumFeatures = [
    {
      title: "AI-Powered Schedule Optimization",
      description: "Get personalized suggestions to maximize your productivity",
      icon: <Sparkles className="text-yellow-500" />
    },
    {
      title: "Progress Analytics",
      description: "Track your journey with detailed insights and reports",
      icon: <Brain className="text-purple-500" />
    },
    {
      title: "Priority Coaching Support",
      description: "Get faster responses and dedicated support from your coach",
      icon: <Lock className="text-blue-500" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col bg-white rounded-xl shadow-sm p-6"
    >
      {/* Header */}
      <div className="border-b pb-6">
        <h2 className="text-2xl font-bold">Your Personalized Plan</h2>
        <p className="text-gray-600">Here's a suggested schedule that balances your goals, habits, and self-care</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto py-6 space-y-8">
        {/* Daily Structure */}
        <div>
          <h3 className="font-medium mb-4">Daily Structure</h3>
          <div className="space-y-3">
            {scheduledActivities.map((activity, index) => (
              <div key={index} className={`p-4 rounded-xl border ${activity.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white">
                      {activity.icon}
                    </div>
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-gray-600">{activity.description}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{activity.startTime}</span>
                    <span>→</span>
                    <span>{activity.endTime}</span>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-white hover:bg-gray-50">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}

            <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <Plus size={20} />
              Add Activity
            </button>
          </div>
        </div>

        {/* Weekly Focus */}
        <div className="space-y-4">
          <h3 className="font-medium">Weekly Focus</h3>
          
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-blue-800 mb-3">Goal Progress</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• Resume updates & applications</li>
              <li>• Network building</li>
              <li>• Technical skills practice</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-medium text-green-800 mb-3">Habits & Wellbeing</h4>
            <ul className="space-y-2 text-green-600">
              <li>• Daily exercise routine</li>
              <li>• Meditation sessions</li>
              <li>• Nature walks</li>
            </ul>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="border-t pt-8">
          <h3 className="font-medium mb-4">Unlock More with Premium</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50">
                <div className="mb-3">{feature.icon}</div>
                <h4 className="font-medium mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Coach Note */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <img src={selectedCoach?.profileImage || "/api/placeholder/40/40"} alt="Coach" className="rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600">
                I've customized this schedule based on your goals and preferences. You can always adjust the timings and activities to better fit your routine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t mt-auto">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SchedulePreviewStep;