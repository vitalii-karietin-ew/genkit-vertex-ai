import { TextToSpeechInputType, TextToSpeechOutputType } from "../utils/types";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

export class TextToSpeechChain extends Runnable<TextToSpeechInputType, TextToSpeechOutputType, RunnableConfig> {
	lc_namespace: string[] = ["TextToSpeechChain"];

	async invoke(input: TextToSpeechInputType): Promise<TextToSpeechOutputType> {
		const { text } = input;
		console.log('Text to speech processing...');
		try {

			const client = new TextToSpeechClient();

			const request = {
				input: {
					text: text
				},
				voice: {
					languageCode: 'en-US',
				},
				audioConfig: {
					audioEncoding: 'MP3'
				}
			};
			const [response] = await client.synthesizeSpeech(request);

			const audioContent = Buffer.isBuffer(response.audioContent)
				? response.audioContent
				: Buffer.from(response.audioContent);

			return {
				audio: audioContent,
				text
			}
		} catch(e) {
			// TODO: Handle error
			console.log(e);
			throw new Error("Error while processing text to speech");
		}
	}
}