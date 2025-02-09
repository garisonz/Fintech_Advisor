import { NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, chatHistory } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get response from Gemini
    const response = await getChatResponse(message, chatHistory || []);

    if (!response) {
      throw new Error('No response from Gemini');
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}