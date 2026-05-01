import axios from 'axios';

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY || '';

const client = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'https://aura-architect.vercel.app',
    'X-Title': 'Aura Architect',
  },
});

export const getAuraResponse = async (messages) => {
  try {
    const response = await client.post('/chat/completions', {
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are Aura, the AI Life Architect. You are a wise, celestial-themed assistant with a calm and encouraging anime-style personality.
          
          Your goal is to help users architect their dreams into reality. 
          When a user shares a goal, you should provide a JSON response in the following format if they are asking for a plan:
          
          {
            "reply": "Aura's conversational response here",
            "blueprint": {
              "title": "Project Title",
              "milestones": [
                { "id": 1, "task": "Step description", "duration": "1 week", "category": "Learning/Action" }
              ]
            }
          }
          
          If they are just chatting, return:
          {
            "reply": "Your response here",
            "blueprint": null
          }
          
          Always stay in character. Use metaphors related to stars, constellations, and architecture.`
        },
        ...messages
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('OpenRouter Error:', error);
    return {
      reply: "The celestial currents are turbulent right now. Please try again in a moment.",
      blueprint: null
    };
  }
};
