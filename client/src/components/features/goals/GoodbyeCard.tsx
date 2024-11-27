// components/GoodbyeCard.tsx
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeRequirement {
  hours: number;
  minutes: number;
}

interface ByebyeAction {
  name: string;
  time: TimeRequirement;
}

interface GoodbyeCardProps {
  why: string;
  byebyeActions: ByebyeAction[];
}

const formatTime = (time: TimeRequirement) => {
  const hours = time.hours > 0 ? `${time.hours}h` : "";
  const minutes = time.minutes > 0 ? `${time.minutes}m` : "";
  return `${hours} ${minutes}`.trim();
};

const GoodbyeCard: React.FC<GoodbyeCardProps> = ({ why, byebyeActions }) => {
  return (
    <Card className="mb-4">
      {/* Why Section */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Why?</CardTitle>
        <p className="text-gray-600">{why}</p>
      </CardHeader>

      {/* Saying Bye Bye Section */}
      <CardContent>
        <h3 className="font-semibold mb-3">Saying Bye Bye</h3>
        <div className="space-y-3">
          {byebyeActions.map((action, actionIndex) => (
            <div key={actionIndex} className="flex items-center justify-between">
              <span>{action.name}</span>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatTime(action.time)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoodbyeCard;