import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'OpenAI test server is running!' });
});

// OpenAI test route
app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say hello!" }],
      model: "gpt-3.5-turbo",
    });

    res.json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to connect to OpenAI',
      details: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});