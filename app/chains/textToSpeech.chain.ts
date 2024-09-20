import { TextToSpeechInputType, TextToSpeechOutputType } from "../utils/types";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

type SynthesizeSpeechRequest = {
	input: {
		text: string;
	};
	voice: {
		languageCode: string;
	};
	audioConfig: {
		audioEncoding: "MP3";
	};
};

export class TextToSpeechChain extends Runnable<TextToSpeechInputType, TextToSpeechOutputType, RunnableConfig> {
	lc_namespace: string[] = ["TextToSpeechChain"];

	async invoke(input: TextToSpeechInputType): Promise<TextToSpeechOutputType> {
		const { text } = input;
		console.log('Text to speech processing...');
		try {

			const client = new TextToSpeechClient();

			const request: SynthesizeSpeechRequest = {
				input: {
					text: text
				},
				voice: {
					languageCode: 'en-US',
				},
				audioConfig: {
					audioEncoding: "MP3"
				}
			};
			const [response] = await client.synthesizeSpeech(request);

			if (!response.audioContent) {
				throw new Error("No audio content returned from the text to speech service");
			};

			const audioContent1 = Buffer.isBuffer(response.audioContent)
				? response.audioContent
				: Buffer.from(response.audioContent);

			return {
				audio: audioContent1,
				text
			}
		} catch(e) {
			// TODO: Handle error
			console.log(e);
			throw new Error("Error while processing text to speech");
		}
	}
}