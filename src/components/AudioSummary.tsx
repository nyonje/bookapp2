import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Download, Clock, Headphones, Mic, Zap } from 'lucide-react';
import { TTSService } from './TTSService';
import { VoiceSelector } from './VoiceSelector';
import { OpenAIVoice } from '../config/api';

interface AudioSummaryProps {
  chapterId: number;
  title: string;
  duration: number; // in seconds
  audioUrl?: string; // Optional: for real audio files
  transcript: string;
}

export function AudioSummary({ chapterId, title, duration, audioUrl, transcript }: AudioSummaryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [generatingAudio, setGeneratingAudio] = useState(false);
  const [cachedAudioUrl, setCachedAudioUrl] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<OpenAIVoice>('alloy');
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const ttsService = TTSService.getInstance();

  // Local storage key for cached audio
  const cacheKey = `audio_chapter_${chapterId}_${selectedVoice}`;

  // Check for cached audio on component mount
  useEffect(() => {
    const checkCachedAudio = async () => {
      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const { audioBlob, timestamp } = JSON.parse(cachedData);
          // Check if cache is less than 24 hours old
          const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
          if (isValid && audioBlob) {
            // Convert base64 back to blob URL for reliable playback
            try {
              const response = await fetch(audioBlob);
              const blob = await response.blob();
              
              // Validate the blob is a valid audio file
              if (blob.size === 0 || !blob.type.startsWith('audio/')) {
                console.warn('⚠️ Invalid cached audio blob, removing from cache');
                localStorage.removeItem(cacheKey);
                return;
              }
              
              const blobUrl = URL.createObjectURL(blob);
              setCachedAudioUrl(blobUrl);
              setAudioGenerated(true);
              console.log('🎵 Found and loaded cached audio for chapter', chapterId, 'with voice', selectedVoice, '- Size:', blob.size, 'bytes');
            } catch (conversionError) {
              console.error('❌ Failed to convert cached audio:', conversionError);
              localStorage.removeItem(cacheKey);
              console.log('🗑️ Removed corrupted cache for chapter', chapterId);
            }
          } else {
            // Remove expired cache
            localStorage.removeItem(cacheKey);
            console.log('🗑️ Removed expired audio cache for chapter', chapterId);
          }
        }
      } catch (error) {
        console.error('Error loading cached audio:', error);
        localStorage.removeItem(cacheKey);
      }
    };

    checkCachedAudio();
  }, [chapterId, selectedVoice, cacheKey]);

  // Determine what type of audio we have
  const hasRealAudio = !!audioUrl;
  const hasCachedAudio = !!cachedAudioUrl;
  const aiTTSConfigured = ttsService.isConfigured();
  const canGenerateAudio = aiTTSConfigured && !audioGenerated;

  // Generate AI audio and cache it
  const generateAIAudio = async () => {
    if (!canGenerateAudio) return;

    setGeneratingAudio(true);
    try {
      // Set the selected voice before generating
      ttsService.setVoice(selectedVoice);
      
      console.log('🎤 Generating AI audio with voice:', selectedVoice);
      setGenerationProgress('Preparing audio generation...');
      
      const audioBlob = await ttsService.generateAudio(transcript);
      
      if (audioBlob) {
        console.log('🎵 Audio blob received:', {
          size: audioBlob.size,
          type: audioBlob.type
        });

        // Create blob URL for immediate playback (skip localStorage for now)
        const blobUrl = URL.createObjectURL(audioBlob);
        console.log('🔗 Blob URL created:', blobUrl);
        
        setCachedAudioUrl(blobUrl);
        setAudioGenerated(true);
        
        // Test the audio immediately
        if (audioRef.current) {
          audioRef.current.src = blobUrl;
          console.log('🎵 Audio src set to:', audioRef.current.src);
          
          // Wait for the audio to load
          audioRef.current.addEventListener('loadeddata', () => {
            console.log('✅ Audio loaded successfully, duration:', audioRef.current?.duration);
          }, { once: true });
          
          audioRef.current.addEventListener('error', (e) => {
            console.error('❌ Audio loading error:', e);
          }, { once: true });
          
          audioRef.current.load();
        }

        // Cache in localStorage (async, don't block playback)
        try {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Audio = reader.result as string;
            const cacheData = {
              audioBlob: base64Audio,
              timestamp: Date.now(),
              voice: selectedVoice,
              chapterId: chapterId
            };
            
            try {
              localStorage.setItem(cacheKey, JSON.stringify(cacheData));
              console.log('💾 Audio cached successfully');
            } catch (storageError) {
              console.warn('⚠️ Failed to cache audio:', storageError);
            }
          };
          reader.readAsDataURL(audioBlob);
        } catch (cacheError) {
          console.warn('⚠️ Caching failed:', cacheError);
        }
        
        console.log('✅ AI audio generated successfully');
      } else {
        throw new Error('No audio blob received from TTS service');
      }
    } catch (error) {
      console.error('❌ Failed to generate AI audio:', error);
      alert(`Failed to generate audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setGeneratingAudio(false);
      setGenerationProgress('');
    }
  };

  // Handle voice change
  const handleVoiceChange = (voice: OpenAIVoice) => {
    setSelectedVoice(voice);
    // Clear existing cached audio so it regenerates with new voice
    setCachedAudioUrl(null);
    setAudioGenerated(false);
    console.log('🎤 Voice changed to:', voice, '- audio will regenerate');
  };

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      console.log('📊 Audio loaded, duration:', audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [cachedAudioUrl]);



  const handlePlayPause = async () => {
    console.log('🎵 Play/Pause clicked:', { hasRealAudio, hasCachedAudio, audioGenerated });
    
    if (hasRealAudio || hasCachedAudio) {
      // Use real audio element
      if (audioRef.current) {
        if (isPlaying) {
          console.log('⏸️ Pausing audio...');
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          console.log('▶️ Playing audio...');
          console.log('🎵 Audio src:', audioRef.current.src);
          console.log('🎵 Audio readyState:', audioRef.current.readyState);
          console.log('🎵 Audio duration:', audioRef.current.duration);
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            console.log('✅ Audio started playing successfully');
          } catch (error) {
            console.error('❌ Audio playback failed:', error);
            console.log('🔍 Error details:', {
              name: error.name,
              message: error.message,
              audioSrc: audioRef.current.src,
              audioReadyState: audioRef.current.readyState
            });
            
            // Try to reload the audio element
            if (cachedAudioUrl) {
              console.log('🔄 Attempting to reload audio...');
              audioRef.current.load();
              setTimeout(async () => {
                try {
                  await audioRef.current!.play();
                  setIsPlaying(true);
                  console.log('✅ Audio played after reload');
                } catch (retryError) {
                  console.error('❌ Retry failed:', retryError);
                  const shouldClear = confirm('Audio playback failed. This might be due to corrupted cache. Would you like to clear the cache and regenerate the audio?');
                  if (shouldClear) {
                    console.log('🗑️ User chose to clear cache');
                    localStorage.removeItem(cacheKey);
                    setCachedAudioUrl(null);
                    setAudioGenerated(false);
                    setIsPlaying(false);
                    alert('Cache cleared. You can now regenerate the audio.');
                  }
                }
              }, 500);
            } else {
              alert('Failed to play audio. Please check your browser settings.');
            }
          }
        }
      }
    } else {
      console.log('⚠️ No audio available - please generate audio first');
      alert('Please generate audio first by clicking the "Generate Audio" button.');
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    setCurrentTime(newTime);
    
    if (useBrowserTTS) {
      // For TTS, we need to restart from the beginning
      // (Web Speech API doesn't support seeking)
      window.speechSynthesis.cancel();
      if (isPlaying) {
        startTextToSpeech();
      }
    } else if ((hasRealAudio || hasGeneratedAudio) && audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };



  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
      {/* Audio element for real or cached audio files */}
      {(hasRealAudio || hasCachedAudio) && (
        <audio
          ref={audioRef}
          src={audioUrl || cachedAudioUrl || undefined}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              // Duration would be set from actual audio file
            }
          }}
        />
      )}

      {/* AI Voice Selection */}
      {canGenerateAudio && (
        <VoiceSelector 
          selectedVoice={selectedVoice}
          onVoiceChange={handleVoiceChange}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Headphones className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Audio Summary</h3>
            <p className="text-sm text-slate-600 mt-1">{title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Clock className="w-4 h-4" />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Generate Audio Button */}
      {canGenerateAudio && (
        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-slate-200 text-center">
          <div className="mb-4">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Generate AI Audio</h4>
            <p className="text-sm text-slate-600">
              Create high-quality narration using OpenAI's advanced text-to-speech technology
            </p>
          </div>
          <button
            onClick={generateAIAudio}
            disabled={generatingAudio}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingAudio ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{generationProgress || 'Generating Audio...'}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Generate Audio</span>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Audio Controls */}
      {(hasRealAudio || hasCachedAudio) && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-4 mb-4">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div 
              className="bg-slate-200 rounded-full h-2 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-200 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full shadow-md" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume/Download/Regenerate */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200">
              <Volume2 className="w-4 h-4" />
            </button>
            {hasCachedAudio && (
              <button 
                onClick={() => {
                  if (cachedAudioUrl) {
                    const link = document.createElement('a');
                    link.href = cachedAudioUrl;
                    link.download = `chapter-${chapterId}-${selectedVoice}.mp3`;
                    link.click();
                  }
                }}
                className="p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
                title="Download audio"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            {audioGenerated && (
              <>
                <button 
                  onClick={generateAIAudio}
                  disabled={generatingAudio}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
                  title="Regenerate with current voice"
                >
                  Regenerate
                </button>
                <button 
                  onClick={() => {
                    console.log('🗑️ Clearing audio cache...');
                    localStorage.removeItem(cacheKey);
                    setCachedAudioUrl(null);
                    setAudioGenerated(false);
                    setIsPlaying(false);
                    console.log('✅ Cache cleared - you can now regenerate audio');
                  }}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors duration-200"
                  title="Clear cached audio and regenerate"
                >
                  🗑️ Clear Cache
                </button>
                <button 
                  onClick={() => {
                    console.log('🔍 Audio Debug Info:');
                    console.log('cachedAudioUrl:', cachedAudioUrl);
                    console.log('audioGenerated:', audioGenerated);
                    console.log('audioRef.current:', audioRef.current);
                    if (audioRef.current) {
                      console.log('src:', audioRef.current.src);
                      console.log('readyState:', audioRef.current.readyState);
                      console.log('duration:', audioRef.current.duration);
                      console.log('paused:', audioRef.current.paused);
                      console.log('currentTime:', audioRef.current.currentTime);
                      console.log('networkState:', audioRef.current.networkState);
                      console.log('error:', audioRef.current.error);
                    }
                  }}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200"
                  title="Debug audio info"
                >
                  🔍 Debug
                </button>
              </>
            )}
          </div>
        </div>

        {/* Transcript Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
          >
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </button>
        </div>
      </div>
      )}

      {/* Transcript */}
      {showTranscript && (
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <h4 className="font-medium text-slate-900 mb-3">Transcript</h4>
          <div className="prose prose-sm text-slate-700 max-h-64 overflow-y-auto">
            {transcript.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-3 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
          <div className="text-sm font-medium text-slate-900">Professional Narration</div>
          <div className="text-xs text-slate-600 mt-1">Clear, engaging voice</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
          <div className="text-sm font-medium text-slate-900">Key Points Highlighted</div>
          <div className="text-xs text-slate-600 mt-1">Focus on main concepts</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
          <div className="text-sm font-medium text-slate-900">Perfect for Commutes</div>
          <div className="text-xs text-slate-600 mt-1">Learn on the go</div>
        </div>
      </div>

      {/* Status Notice */}
      {audioGenerated && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-green-100 rounded-full">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900 mb-1">
                ✅ AI Audio Generated Successfully
              </p>
              <p className="text-sm text-green-800">
                High-quality audio generated with {selectedVoice} voice and cached for future use.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}