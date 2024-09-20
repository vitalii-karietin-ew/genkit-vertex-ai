
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { SummarizationInputType, SummarizationOutputType } from "../utils/types";
import { generate } from "@genkit-ai/ai";
import { gemini15Flash } from "@genkit-ai/vertexai";

export class SummarizationChain extends Runnable<SummarizationInputType, SummarizationOutputType, RunnableConfig> {
	lc_namespace: string[] = ["SummarizationChain"];

	async invoke(input: SummarizationInputType): Promise<SummarizationOutputType> {
		const { text } = input;
		console.log('Summarizing transcription...');

		const llmResponse = await generate({
			model: gemini15Flash,
			prompt: "Summarize the following text: " + text,
		});

		return {
			text: llmResponse.text()
		}
	}
}