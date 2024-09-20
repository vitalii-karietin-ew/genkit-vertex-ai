import { generate } from "@genkit-ai/ai";
import { gemini15Flash } from "@genkit-ai/vertexai";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { TextTranslationInputType, TextTranslationOutputType } from "../utils/types";

export class TextTranslationChain extends Runnable<TextTranslationInputType, TextTranslationOutputType, RunnableConfig> {
	lc_namespace: string[] = ["TextTranslationChain"];

	async invoke(input: TextTranslationInputType): Promise<TextTranslationOutputType> {
		const { text } = input;
		console.log('Translation...');

		const llmResponse = await generate({
			model: gemini15Flash,
			prompt: "Translate the following text to French: " + text,
		});

		return {
			text: llmResponse.text()
		}
	}
};