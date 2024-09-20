import { NextResponse } from "next/server";
import { gemini15Flash } from '@genkit-ai/vertexai';
import { generate } from '@genkit-ai/ai';

export async function POST(request: Request) {
  const body = await request.json();
  const { textToSummarize } = body;

	if (!textToSummarize) {
		return NextResponse.json({ error: "Missing textToSummarize parameter" }, { status: 400 });
	};

  try {
		const llmResponse = await generate({
			model: gemini15Flash,
			prompt: "Summarize the following text: " + textToSummarize,
		});

		return NextResponse.json(llmResponse.text());
  } catch (error) {
		console.error("Error processing while the summarization:", error);
		return NextResponse.json({ error: "Error processing while the summarization" }, { status: 500 });
  };
};
