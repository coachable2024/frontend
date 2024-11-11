import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

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
    const { messages, coachPersonality, coachName, coachImage } = req.body;

    if (!messages || !coachPersonality || !coachName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const systemPrompt = `You are ${coachName}, a ${coachPersonality}. Help the user define their goal clearly and provide supportive, encouraging responses in your coaching style. Keep responses concise and focused on understanding their goal.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
    });

    if (!completion.choices[0].message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    return res.status(200).json({ 
      message: completion.choices[0].message.content,
      coachImage: coachImage
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 