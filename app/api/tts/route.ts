import { NextResponse } from 'next/server';
import axios from 'axios';

interface TTSRequestBody {
  input: string;
  text: string;
  lang?: string;
}

export async function POST(req: Request) {
    const { input, lang }: TTSRequestBody = await req.json();
    const text = input;
    const language = lang === 'tamil' ? 'ta-IN' : 'ml-IN';
        
    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!apiKey) {
        return new NextResponse('API key missing', { status: 500 });
    }

    try {
        const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
            input: { text },
            voice: {
            languageCode: language,
            ssmlGender: 'NEUTRAL',
            },
            audioConfig: {
            audioEncoding: 'MP3',
            },
        }
        );

        const audioContent = response.data.audioContent;
        return new NextResponse(Buffer.from(audioContent, 'base64'), {
        headers: {
            'Content-Type': 'audio/mpeg',
        },
        });
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error('TTS error:', error.response?.data || error.message);
    } else if (error instanceof Error) {
        console.error('TTS error:', error.message);
    } else {
        console.error('TTS error:', 'Unknown error occurred');
    }
    return new NextResponse('TTS failed', { status: 500 });
    }
}