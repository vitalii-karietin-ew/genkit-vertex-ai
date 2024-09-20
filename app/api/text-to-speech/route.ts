import { NextResponse } from "next/server";
import { TextToSpeechChain } from "@/app/chains";

export async function POST(request: Request) {
  const body = await request.json();
  const { textToSpeech } = body;

	if(!textToSpeech) {
		return NextResponse.json({ error: "Missing textToSpeech parameter" }, { status: 400 });
	};

	try {
  const textToSpeechChain = new TextToSpeechChain();

	const result = await textToSpeechChain.invoke({	text: textToSpeech });

	const response = result.audio;
	return new NextResponse(response);
	} catch (error) {
		console.error("Error processing while the text-to-speech:", error);
		return NextResponse.json({ message: "Error processing while the text-to-speech", error }, { status: 500 });
	};
};
