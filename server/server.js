import express, { json as _json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import OpenAI from 'openai';

config();
const app = express();
app.use(cors());
app.use(_json({ limit: '10mb' }))

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/analyze-image', async (req, res) => {
  const { base64 } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `List the food ingredients shown in an image. Output only a comma-separated list, no explanations. 
          If no ingredients are visible, respond with: "I don't see any food ingredients in this image."`,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'List the food ingredients in this image.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } },
          ],
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image analysis failed.' });
  }
});

app.post('/generate-recipe', async (req, res) => {
  const { ingredients, userInput } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: `You are a recipe generator. Generate a recipe using the provided ingredients.
              
              ONLY add additional ingredients if the provided ingredients are NOT enough to make any kind of reasonable dish.
              For example, if the provided ingredients are just salt and pepper, you should add additional ingredients to make an actual dish.
              
              If additional ingredients are needed, clearly label them as "(additional)" and keep them minimal and logical.
              
              If the given ingredients are enough to make a real dish, DO NOT add anything else.
              
              Return the recipe in the following JSON format:
              {
                "recipe": "Name of the recipe",
                "cookingTime": "Time range (e.g., 30-45 minutes)",
                "difficulty": "Easy / Medium / Hard",
                "ingredients": [array of strings; label additions with '(additional)'],
                "instructions": [array of steps]
              }`
        },
        {
          role: 'user',
          content: `Ingredients: ${ingredients}. Notes or corrections (if any): ${userInput}`,
        },
      ],
    });

    const json = JSON.parse(completion.choices[0].message.content);
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Recipe generation failed.' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
