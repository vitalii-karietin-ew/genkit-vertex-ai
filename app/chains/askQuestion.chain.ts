import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { AskQuestionInputType, AskQuestionOutputType } from "../utils/types";
import { generate } from "@genkit-ai/ai";
import { gemini15Flash } from "@genkit-ai/vertexai";

export class AskQuestionChain extends Runnable<AskQuestionInputType, AskQuestionOutputType, RunnableConfig> {
	lc_namespace: string[] = ["AskQuestionChain"];

	async invoke(input: AskQuestionInputType): Promise<AskQuestionOutputType> {
		const { question, context } = input;
		console.log('Answering....');

		const llmResponse = await generate({
			model: gemini15Flash,
			prompt: `Answer the following question based on the context provided: ${question}. Context: ${context}`,
		});

		const answer = llmResponse.text();

		return {
			answer
		}
	}
}