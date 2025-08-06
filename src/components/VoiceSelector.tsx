import React from 'react';
import { OPENAI_VOICES, OpenAIVoice } from '../config/api';

interface VoiceSelectorProps {
  selectedVoice: OpenAIVoice;
  onVoiceChange: (voice: OpenAIVoice) => void;
}

export function VoiceSelector({ selectedVoice, onVoiceChange }: VoiceSelectorProps) {
  return (
    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="font-medium text-blue-900 mb-3">🎙️ Select AI Voice</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(OPENAI_VOICES).map(([voice, description]) => (
          <label
            key={voice}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedVoice === voice
                ? 'bg-blue-100 border-2 border-blue-300'
                : 'bg-white border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name="voice"
              value={voice}
              checked={selectedVoice === voice}
              onChange={(e) => onVoiceChange(e.target.value as OpenAIVoice)}
              className="text-blue-600"
            />
            <div>
              <div className="font-medium text-slate-900 capitalize">{voice}</div>
              <div className="text-sm text-slate-600">{description.split(' - ')[1]}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}