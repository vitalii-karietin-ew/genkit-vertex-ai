import axios from "axios";
import { NextResponse } from "next/server";
import { SummarizationChain, TextTranscriptionChain } from '@/app/chains';

export async function POST(request: Request) {
	const body = await request.json();
	const { audioLink } = body;

	if (!audioLink) {
		return NextResponse.json({ error: "Missing audioLink parameter" }, { status: 400 });
	};

	try {
		const transcriptionChain = new TextTranscriptionChain();
		const summarizationChain = new SummarizationChain();
	
		const chains = transcriptionChain.pipe(summarizationChain);
	
		const res = await chains.invoke({
			audioLink
		});
	
		return NextResponse.json({
			summary: res.text
		});
	} catch (error) {
		console.error("Error processing while speech-to-text:", error);
		return NextResponse.json({ error: "Error processing while speech-to-text" }, { status: 500 });
	};
};
