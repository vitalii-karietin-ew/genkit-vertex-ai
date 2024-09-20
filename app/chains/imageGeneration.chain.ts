import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { ImageGenerationInputType, ImageGenerationOutputType } from "../utils/types";
import { generate } from "@genkit-ai/ai";
import { imagen2 } from "@genkit-ai/vertexai";

export class ImageGenerationChain extends Runnable<ImageGenerationInputType, ImageGenerationOutputType, RunnableConfig> {
	lc_namespace: string[] = ["ImageGenerationChain"];

	async invoke(input: ImageGenerationInputType): Promise<ImageGenerationOutputType> {
		const { prompt } = input;
		console.log('Generating image....');
		const mediaResponse = await generate({
			model: imagen2,
			prompt,
			output: { format: "media" }
		});

		const media = mediaResponse.media();
		if (media === null) throw new Error("No media generated");

		return media;
	}
}