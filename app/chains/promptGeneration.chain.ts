import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { PromptGenerationInputType, PromptGenerationOutputType } from "../utils/types";
import { generate } from "@genkit-ai/ai";
import { gemini15Flash } from "@genkit-ai/vertexai";

export class PromptGenerationChain extends Runnable<PromptGenerationInputType, PromptGenerationOutputType, RunnableConfig> {
	lc_namespace: string[] = ["PromptGenerationChain"];

	async invoke(input: PromptGenerationInputType): Promise<PromptGenerationOutputType> {
		const { text } = input;
		console.log('Generating prompt....');

		const llmResponse = await generate({
			model: gemini15Flash,
			prompt: `Generate a prompt for the blog post image related to this text: ${text}`,
		});

		return {
			prompt: llmResponse.text()
		}
	}
}