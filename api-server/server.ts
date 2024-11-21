import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { detectGoal } from './services/goalDetection';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Basic health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, coachPersonality, coachName, detectGoal: shouldDetectGoal } = req.body;

    if (!messages || !coachPersonality || !coachName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // First, try to detect if there's a goal
    if (shouldDetectGoal) {
      const goalDetectionResult = await detectGoal(openai, messages, coachPersonality);
      
      if (goalDetectionResult.hasGoal) {
        return res.status(200).json({
          message: "I've detected a goal in our conversation!",
          definedGoal: goalDetectionResult.goal
        });
      }
    }

    // If no goal detected or not checking for goals, proceed with normal chat
    const systemPrompt = `You are ${coachName}, a ${coachPersonality}. Help the user define their goal clearly and provide supportive, encouraging responses in your coaching style. Keep responses concise and focused on understanding their goal.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
    });

    return res.status(200).json({ 
      message: completion.choices[0].message?.content
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 