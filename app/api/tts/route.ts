import { NextResponse } from 'next/server';
import axios from 'axios';

// Define the request body shape
interface TTSRequestBody {
  input: string;
  text: string;
  lang?: string;
}

export async function POST(req: Request) {
    let { input, lang}: TTSRequestBody = await req.json();
    const text = input
    if(lang == 'tamil'){
        lang = 'ta-IN';
    }else{
        lang = 'ml-IN';
    }
        
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
            languageCode: lang,
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
    } catch (error: any) {
        console.error('TTS error:', error?.response?.data || error.message);
        return new NextResponse('TTS failed', { status: 500 });
    }
}