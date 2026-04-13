import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeSolution(problem, solution) {
  try {
    const prompt = `
You are an expert AI evaluator.

Evaluate the solution based on:

1. Feasibility (0-100)
2. Creativity (0-100)
3. Cost-effectiveness (0-100)

Also provide:
- SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
- Improvement suggestions

Problem:
${problem}

Solution:
${solution}

Return ONLY valid JSON:
{
  "scores": {
    "feasibility": number,
    "creativity": number,
    "cost": number
  },
  "swot": {
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": []
  },
  "improvements": []
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // 🔥 fast + free
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    // 🔥 Clean JSON
    const cleanText = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Groq AI Error:", error);
    return null;
  }
}