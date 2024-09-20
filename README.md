# Podcast to Blog AI App

## Overview

The Podcast to Blog AI App is a full-stack application designed to transcribe, summarize, generate audio, and create visual content based on podcast episodes. The app leverages Google Cloud's Vertex AI, specifically the Gemini and Imagen models, to process and transform podcast content into engaging blog posts with multimedia elements. This project is built using Next.js and relies on the LangChain framework for efficient data handling and API integration.

## Demo

https://github.com/user-attachments/assets/34a4c4c4-f6e4-4630-ae59-44e5b8d727a8

## Preview

In progress...

## Features

- **Podcast Search and Retrieval**: Search for podcasts using the Podcast Index API.
- **Speech-to-Text Transcription**: Transcribe podcast episodes using Google Cloud's Vertex AI.
- **Text Summarization**: Summarize transcriptions using the Gemini model.
- **Text-to-Speech Conversion**: Convert summarized text into speech using Google Cloud Text-to-Speech.
- **Interactive Q&A**: Allow users to interact with the recognized text through a chat interface.
- **Real-Time Translation**: Translate summarized text into French using the Gemini model.
- **Image Generation**: Create images based on podcast content using Google Cloud's Imagen model.
- **Multi-Modal Output**: Display the generated title, image, audio, and translated text on the final result page.

## Tech Stack

- **[Next.js](https://nextjs.org/)**: React framework for server-rendered and statically-generated applications.
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces.
- **[LangChain](https://github.com/hwchase17/langchain)**: Framework for developing applications powered by language models.
- **[Google Cloud Vertex AI](https://cloud.google.com/vertex-ai)**: Suite of machine learning tools and APIs.
- **[Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech)**: API for converting text into natural-sounding speech.
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for making API requests.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Library for adding notifications to React applications.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- Google Cloud account with Vertex AI API enabled.
- Podcast Index account with API key and API secret.

### Setup

1. **Clone the repository**:

	```bash
	git clone https://github.com/your-username/podcast-to-blog-ai-app.git
	cd podcast-to-blog-ai-app
	```
2. **Install dependencies**:

	```bash
	npm install
	```

3. **Set up environment variables**:

	Create a .env.local file in the root directory and add the following:

	```
	NEXT_PUBLIC_BASE_URL=your_base_url
	GOOGLE_CLOUD_PROJECT_ID=your_google_cloud_project_id
	NEXT_PODCAST_INDEX_API_KEY=your_podcast_index_api_key
	NEXT_PODCAST_INDEX_API_KEY_SECRET=your_podcast_index_api_secret
	```

4. **Set up Google Cloud credentials**:

	Place your Google Cloud service account key file (key.json) in the root directory of the project.

5. **Start the development server**:

	```bash
	npm run dev
	```

## Usage

1. **Search for a Podcast**: Enter the podcast name (e.g., "EdTech Shorts") in the search bar to find a show using the Podcast Index API.

2. **Select a Podcast**: Choose the podcast to proceed with.

3. **Select an Episode**: Choose the episode from the results.

4. **Process the Episode**: Click the "Process episode" button.

5. **Transcription and Summarization**: The app will transcribe the selected episode and summarize the text using the Gemini model.

6. **Audio Generation**: The summarized text is converted to audio using Google Cloud Text-to-Speech.

7. **Interactive Q&A**: Users can ask questions related to the podcast episode's content via a chat interface.

8. **Translation**: Click on the translation button to convert the summarized text into French.

9. **Image Generation**: An image is generated based on the podcast content using Google Cloud's Imagen model.

## Models and APIs

- **Speech-to-Text**: Google Cloud Vertex AI
- **Text Summarization**: Gemini model
- **Text-to-Speech**: Google Cloud Text-to-Speech
- **Q&A**: Gemini model
- **Translation**: Gemini model
- **Image Generation**: Google Cloud Imagen model
