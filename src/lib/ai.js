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

export async function evaluateSolutionAgainstProblem({
  problemTitle,
  problemDescription,
  problemConstraints,
  problemExpectedOutcomes,
  problemRequirements,
  solutionText,
}) {
  if (!process.env.GROQ_API_KEY) return null;

  const prompt = `
You are an expert evaluator for a crowd-powered problem solving platform.

Evaluate the submitted solution against the problem requirements and expected outcomes.

Return ONLY valid JSON with this exact shape:
{
  "scores": {
    "feasibility": number,
    "creativity": number,
    "effectiveness": number
  },
  "summary": string,
  "strengths": string[],
  "risks": string[],
  "suggestions": string[]
}

Scoring guidance:
- feasibility: practical to build + realistic assumptions
- creativity: novelty and insight
- effectiveness: how well it meets requirements/outcomes/constraints

Problem Title:
${problemTitle}

Problem Description:
${problemDescription}

Requirements:
${problemRequirements || ""}

Constraints:
${problemConstraints || ""}

Expected Outcomes:
${problemExpectedOutcomes || ""}

Solution:
${solutionText}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const text = completion.choices?.[0]?.message?.content || "";
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Groq evaluate error:", e);
    return null;
  }
}