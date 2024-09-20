import { generate } from '@genkit-ai/ai';
import { gemini15Flash } from '@genkit-ai/vertexai';
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { TextTranscriptionInputType, TextTranscriptionOutputType } from "../utils/types";

export class TextTranscriptionChain extends Runnable<TextTranscriptionInputType, TextTranscriptionOutputType, RunnableConfig> {
	lc_namespace: string[] = ["TextTranscriptionChain"];

	async invoke(input: TextTranscriptionInputType): Promise<TextTranscriptionOutputType> {
		const { audioLink } = input;
		console.log('Transcribing audio...');

		if (!audioLink) {
			throw new Error('Audio link is required');
		};

		const llmResponse = await generate({
			model: gemini15Flash,
			prompt: [
				{
					media: {
						url: audioLink,
						contentType: "audio/mpeg"
					}
				},
				{
					text: "You are a helpful assistant that produces a clean and accurate transcript from the provided audio link."
				}
			],
		});

		const textResponse = llmResponse.text();

		return {
			text:	textResponse
		}
	}
};