import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function VoiceAssistant() {
  const { voiceAssistant, speak } = useAccessibility();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleVoiceCommand = () => {
    setIsListening(!isListening);

    if (!isListening) {
      speak('Assistente NR-1 ouvindo. Diga seu comando.');
      setTranscript('Ouvindo...');

      // Simulate voice recognition
      setTimeout(() => {
        setTranscript('Como posso ajudar?');
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
          setIsListening(false);
          setTranscript('');
        }, 2000);
      }, 2000);
    } else {
      setTranscript('');
    }
  };

  if (!voiceAssistant) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-6 right-24 z-50"
    >
      <div className="relative">
        {/* Main Button */}
        <button
          onClick={handleVoiceCommand}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
            isListening
              ? 'bg-gradient-to-br from-red-600 to-pink-600 shadow-2xl shadow-red-500/50 animate-pulse'
              : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/70 hover:scale-110'
          }`}
          aria-label={isListening ? 'Parar de ouvir' : 'Ativar assistente de voz'}
          title="Assistente de Voz NR-1"
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : isSpeaking ? (
            <Volume2 className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        {/* Pulse Animation */}
        {isListening && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-red-500/30"
            />
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-red-500/20"
            />
          </>
        )}

        {/* Status Badge */}
        {(isListening || isSpeaking) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full bg-slate-900/95 backdrop-blur-xl border border-purple-400/30 shadow-xl"
          >
            <div className="flex items-center gap-2">
              {isListening && (
                <>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['4px', '12px', '4px'] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 bg-red-400 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-red-300">{transcript}</span>
                </>
              )}
              {isSpeaking && (
                <>
                  <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-sm text-purple-300">{transcript}</span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Sparkles Effect */}
        {!isListening && !isSpeaking && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      <AnimatePresence>
        {!isListening && !isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -left-64 top-1/2 -translate-y-1/2 w-56 p-3 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-purple-400/30 shadow-xl"
          >
            <p className="text-xs text-gray-300 mb-2">
              <strong className="text-purple-400">Assistente NR-1</strong>
            </p>
            <p className="text-xs text-gray-400">
              Clique para ativar comandos de voz e navegação assistida.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
