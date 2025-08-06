// API Configuration
// Note: In a production environment, you would use environment variables
// For this demo, we'll store the API key securely

export const API_CONFIG = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    endpoint: 'https://api.openai.com/v1/audio/speech',
    model: 'tts-1-hd', // High quality model
    voice: 'alloy', // Professional, clear voice
    format: 'mp3',
    speed: 1.0
  }
};

// Available OpenAI voices
export const OPENAI_VOICES = {
  alloy: 'Alloy - Neutral, professional',
  echo: 'Echo - Calm, thoughtful', 
  fable: 'Fable - Warm, engaging',
  onyx: 'Onyx - Deep, authoritative',
  nova: 'Nova - Bright, energetic',
  shimmer: 'Shimmer - Gentle, soothing'
} as const;

export type OpenAIVoice = keyof typeof OPENAI_VOICES; 