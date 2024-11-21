import { Goal } from '../../client/src/types/goal';

const goalDetectionPrompt = `
You are an AI goal coach. When a user expresses a goal, structure it into these components:
- title: A clear, concise goal statement
- why: The user's motivation
- actions: 3-5 specific steps with time estimates
- reward: A meaningful reward for achieving the goal

Example format:
{
  "hasGoal": true,
  "goal": {
    "title": "Lose 20 pounds in 5 months",
    "why": "To improve health and energy levels",
    "actions": [
      {
        "name": "Morning jog",
        "time": { "hours": 1, "minutes": 0 },
        "completed": false
      }
    ],
    "reward": "New workout gear"
  }
}

If no clear goal detected, return: { "hasGoal": false }
`;

export async function detectGoal(openai: any, messages: any[], coachPersonality: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: 'system', 
        content: goalDetectionPrompt 
      },
      ...messages
    ],
    temperature: 0.7,
  });

  try {
    const content = completion.choices[0].message?.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error parsing goal detection response:', error);
    return { hasGoal: false };
  }
}
