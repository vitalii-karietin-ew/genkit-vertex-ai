"use client";

import EpisodeDetails from "@/app/components/EpisodeDetails/EpisodeDetails";
import EpisodesList from "@/app/components/EpisodesList/EpisodesList";
import { ImageGenerationInputType, ImageGenerationOutputType } from "@/app/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Params = {
	guid: string;
};

type PageProps = {
	params: Params;
};

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const EpisodesPage = ({ params }: PageProps) => {
	const { guid } = params;
	const [loading, setLoading] = useState(true);
	const [episodes, setEpisodes] = useState<any>([]);
	const [selectedEpisode, setSelectedEpisode] = useState<string | undefined>();
	const [summary, setSummary] = useState<string | undefined>();
	const [audioUrl, setAudioUrl] = useState<string | undefined>();
	const [translatedSummary, setTranslatedSummary] = useState<string | undefined>();
	const [image, setImage] = useState<string | undefined>();
	const [summarizationLoading, setSummarizationLoading] = useState(false);
	const [translationLoading, setTranslationLoading] = useState(false);

  useEffect(() => {
    // Clean up the object URL on component unmount
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, []);

	useEffect(() => {
		setLoading(true);
		const fetchEpisodes = async () => {
			try {
				const { data } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/podcast-episodes?guid=${guid}`);
				setEpisodes(data.items);
			} catch (error) {
				toast("Something went wrong with fetching episodes...", {
					theme: "dark"
				});
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchEpisodes();
	}, [guid]);

	const onSelectEpisode = (episodeGuid: any) => {
		setSelectedEpisode(episodeGuid);

		// Reset state
		setSummary(undefined);
		setTranslatedSummary(undefined);
		setImage(undefined);
		setAudioUrl(undefined);
	}

	const onTranslateSummarization = async () => {
		setTranslationLoading(true);
		try {
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/translate`, {
				textToTranslate: summary,
			});
			setTranslatedSummary(data.translaion);

		} catch (error) {
			toast("Something went wrong with translation...", {
				theme: "dark"
			});
			console.error(error);
		} finally {
			setTranslationLoading(false);
		}
	};

	const onProcessEpisodeHandler = async () => {
		const audioLink = episodes.find((episode: any) => episode.guid === selectedEpisode)?.enclosureUrl;

		if (audioLink) {
			setSummarizationLoading(true);

			try {
				// Speech to text
				const { data: summaryResponse } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/speech-to-text`, {
					audioLink,
				});
				setSummary(summaryResponse.summary);

				// Text to speech
				const { data: audioResponse } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/text-to-speech`, {
					textToSpeech: summaryResponse.summary,
				},{
					responseType: "arraybuffer"
				});

				// create Blob from ArrayBuffer and use it as audio source
				const audioBlob = new Blob([audioResponse as Buffer], { type: 'audio/mp3' });
				const audioUrl = URL.createObjectURL(audioBlob);
				setAudioUrl(audioUrl);

				// Generate image
				const { data: imageResponse } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image-generation`, {
					prompt: summaryResponse.summary,
				});

				setImage(imageResponse.url);

			} catch (error) {
				toast("Something went wrong with episode processing...", {
					theme: "dark"
				});
				console.error(error);
			} finally {
				setSummarizationLoading(false);
			}
		}
	};

	return (
		<div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Episodes</h1>
      <div className="flex flex-wrap">
				<EpisodesList
					episodes={episodes}
					onSelectEpisode={onSelectEpisode}
					selectedEpisode={selectedEpisode}
					loading={loading}
				/>
				<EpisodeDetails
					selectedEpisode={selectedEpisode}
					summary={summary}
					image={image}
					audioUrl={audioUrl}
					summarizationLoading={summarizationLoading}
					translationLoading={translationLoading}
					translatedSummary={translatedSummary}
					episodes={episodes}
					loading={loading}
					onProcessEpisodeHandler={onProcessEpisodeHandler}
					onTranslateSummarization={onTranslateSummarization}
				/>
      </div>
    </div>
	);
};

export default EpisodesPage;