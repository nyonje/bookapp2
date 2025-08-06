import React, { useState, useRef, useEffect } from 'react';
import { API_CONFIG, OpenAIVoice } from '../config/api';

// Service for handling different TTS providers
export class TTSService {
  private static instance: TTSService;
  private apiKey: string | null = null;
  private provider: 'elevenlabs' | 'openai' | 'azure' = 'openai'; // Default to OpenAI
  private voice: OpenAIVoice = 'alloy';

  constructor() {
    // Auto-configure with OpenAI key
    this.apiKey = API_CONFIG.openai.apiKey;
    this.provider = 'openai';
  }

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  setApiKey(key: string, provider: 'elevenlabs' | 'openai' | 'azure' = 'openai') {
    this.apiKey = key;
    this.provider = provider;
  }

  setVoice(voice: OpenAIVoice) {
    this.voice = voice;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  getProvider(): string {
    return this.provider;
  }

  async generateAudio(text: string): Promise<Blob | null> {
    if (!this.apiKey) {
      throw new Error('API key not set. Please configure your TTS service.');
    }

    console.log('🎤 TTS Request:', {
      provider: this.provider,
      textLength: text.length,
      voice: this.voice
    });

    try {
      switch (this.provider) {
        case 'elevenlabs':
          return await this.generateElevenLabsAudio(text);
        case 'openai':
          return await this.generateOpenAIAudioWithChunking(text);
        case 'azure':
          return await this.generateAzureAudio(text);
        default:
          throw new Error('Unsupported TTS provider');
      }
    } catch (error) {
      console.error('❌ TTS Generation failed:', error);
      // Re-throw the error instead of returning null so we get better error messages
      throw error;
    }
  }

  private async generateElevenLabsAudio(text: string): Promise<Blob> {
    const voiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice (good for narration)
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey!,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    return await response.blob();
  }

  private async generateOpenAIAudioWithChunking(text: string): Promise<Blob> {
    const MAX_CHUNK_SIZE = 4000; // Leave some buffer below the 4096 limit
    
    if (text.length <= MAX_CHUNK_SIZE) {
      // Text is short enough, use single request
      return await this.generateOpenAIAudio(text);
    }

    console.log(`📝 Text too long (${text.length} chars), splitting into chunks...`);
    
    // Split text into chunks at sentence boundaries
    const chunks = this.splitTextIntoChunks(text, MAX_CHUNK_SIZE);
    console.log(`🔄 Split into ${chunks.length} chunks`);

    // Generate audio for each chunk
    const audioBlobs: Blob[] = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(`🎤 Generating chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
      const chunkBlob = await this.generateOpenAIAudio(chunks[i]);
      audioBlobs.push(chunkBlob);
    }

    // Combine all audio blobs
    console.log('🔗 Combining audio chunks...');
    const combinedBlob = new Blob(audioBlobs, { type: 'audio/mpeg' });
    console.log('✅ Combined audio generated successfully, total size:', combinedBlob.size, 'bytes');
    
    return combinedBlob;
  }

  private splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
    const chunks: string[] = [];
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      // If adding this sentence would exceed the limit, start a new chunk
      if (currentChunk.length + sentence.length + 1 > maxChunkSize) {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          // Single sentence is too long, split it by words
          const words = sentence.split(' ');
          let wordChunk = '';
          
          for (const word of words) {
            if (wordChunk.length + word.length + 1 > maxChunkSize) {
              if (wordChunk.trim()) {
                chunks.push(wordChunk.trim());
                wordChunk = word;
              } else {
                // Single word is too long, truncate it
                chunks.push(word.substring(0, maxChunkSize));
                wordChunk = '';
              }
            } else {
              wordChunk += (wordChunk ? ' ' : '') + word;
            }
          }
          
          if (wordChunk.trim()) {
            currentChunk = wordChunk;
          }
        }
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }

  private async generateOpenAIAudio(text: string): Promise<Blob> {
    console.log('Generating OpenAI audio with voice:', this.voice);
    
    const response = await fetch(API_CONFIG.openai.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: API_CONFIG.openai.model,
        input: text,
        voice: this.voice,
        response_format: API_CONFIG.openai.format,
        speed: API_CONFIG.openai.speed
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}: ${errorText}`);
    }

    const blob = await response.blob();
    console.log('OpenAI audio generated successfully, size:', blob.size, 'bytes');
    return blob;
  }

  private async generateAzureAudio(text: string): Promise<Blob> {
    // Azure Cognitive Services TTS implementation
    const region = 'eastus'; // Configure your region
    const response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': this.apiKey!,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
      },
      body: `
        <speak version='1.0' xml:lang='en-US'>
          <voice xml:lang='en-US' xml:gender='Male' name='en-US-AriaNeural'>
            ${text}
          </voice>
        </speak>
      `,
    });

    if (!response.ok) {
      throw new Error(`Azure API error: ${response.statusText}`);
    }

    return await response.blob();
  }
}

// API Key Configuration Component
interface APIKeyConfigProps {
  onApiKeySet: (key: string, provider: string) => void;
  currentProvider: string;
}

export function APIKeyConfig({ onApiKeySet, currentProvider }: APIKeyConfigProps) {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'elevenlabs' | 'openai' | 'azure'>('elevenlabs');
  const [showConfig, setShowConfig] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim(), provider);
      setShowConfig(false);
      // Store in localStorage for persistence (be careful with API keys in production)
      localStorage.setItem('tts_api_key', apiKey.trim());
      localStorage.setItem('tts_provider', provider);
    }
  };

  useEffect(() => {
    // Load saved API key on mount
    const savedKey = localStorage.getItem('tts_api_key');
    const savedProvider = localStorage.getItem('tts_provider') as 'elevenlabs' | 'openai' | 'azure';
    if (savedKey && savedProvider) {
      setApiKey(savedKey);
      setProvider(savedProvider);
      onApiKeySet(savedKey, savedProvider);
    }
  }, [onApiKeySet]);

  const providerInfo = {
    elevenlabs: {
      name: 'ElevenLabs',
      description: 'High-quality AI voices, great for narration',
      pricing: '$1 for ~10,000 characters',
      signup: 'https://elevenlabs.io'
    },
    openai: {
      name: 'OpenAI TTS',
      description: 'Good quality, multiple voices available',
      pricing: '$15 per 1M characters',
      signup: 'https://platform.openai.com'
    },
    azure: {
      name: 'Azure Cognitive Services',
      description: 'Microsoft\'s TTS service',
      pricing: '$4 per 1M characters',
      signup: 'https://azure.microsoft.com/services/cognitive-services/speech-services/'
    }
  };

  if (!showConfig) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setShowConfig(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {currentProvider ? `Configure ${currentProvider}` : 'Setup AI Text-to-Speech'}
        </button>
        {currentProvider && (
          <p className="text-sm text-green-600 mt-2">
            ✅ {providerInfo[currentProvider as keyof typeof providerInfo]?.name} configured
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-slate-50 rounded-lg border">
      <h3 className="font-semibold text-slate-900 mb-4">Configure AI Text-to-Speech</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Choose TTS Provider
          </label>
          <div className="space-y-2">
            {Object.entries(providerInfo).map(([key, info]) => (
              <label key={key} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="radio"
                  name="provider"
                  value={key}
                  checked={provider === key}
                  onChange={(e) => setProvider(e.target.value as any)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-slate-900">{info.name}</div>
                  <div className="text-sm text-slate-600">{info.description}</div>
                  <div className="text-xs text-slate-500">Pricing: {info.pricing}</div>
                  <a 
                    href={info.signup} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Sign up here →
                  </a>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`Enter your ${providerInfo[provider].name} API key`}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="text-xs text-slate-500 mt-1">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Configuration
          </button>
          <button
            type="button"
            onClick={() => setShowConfig(false)}
            className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}