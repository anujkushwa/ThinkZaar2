export async function generateAIAnalysis(prompt) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
      success: true,
      score: 88,
      summary:
        "Your idea has strong market potential with good scalability. Improve execution planning and monetization model.",
      strengths: [
        "Clear problem statement",
        "Scalable business model",
        "Strong user demand",
      ],
      weaknesses: [
        "Competition exists",
        "Need better pricing strategy",
      ],
    };
  } catch (error) {
    return {
      success: false,
      message: "AI analysis failed",
    };
  }
};