import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ResponseData {
  message: string;
}

export const config = {
  api: {
    bodyParser: true,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages, coachPersonality, coachName } = req.body;

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

    return res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
} 