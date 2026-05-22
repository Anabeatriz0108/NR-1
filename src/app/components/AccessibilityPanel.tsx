import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Accessibility,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Type,
  Mic,
  X,
  Plus,
  Minus,
  RotateCcw,
  Keyboard
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    fontSize,
    screenReader,
    voiceAssistant,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleScreenReader,
    toggleVoiceAssistant,
    speak
  } = useAccessibility();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      speak('Painel de acessibilidade aberto');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleToggle}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
        aria-label="Abrir painel de acessibilidade"
        title="Acessibilidade"
      >
        <Accessibility className="w-7 h-7 text-white" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Panel Content */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-slate-900/95 to-blue-950/95 backdrop-blur-2xl border-r border-blue-400/30 shadow-2xl z-[70] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 p-6 border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Accessibility className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Acessibilidade</h2>
                      <p className="text-sm text-gray-400">Recursos inclusivos</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Fechar painel"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 space-y-6">
                {/* Screen Reader */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {screenReader ? <Volume2 className="w-5 h-5 text-blue-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                      <div>
                        <h3 className="font-bold">Leitor de Tela</h3>
                        <p className="text-xs text-gray-400">Narração de elementos</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleScreenReader}
                      className={`relative w-14 h-7 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        screenReader ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gray-700'
                      }`}
                      aria-label={screenReader ? 'Desativar leitor de tela' : 'Ativar leitor de tela'}
                      aria-checked={screenReader}
                      role="switch"
                    >
                      <motion.div
                        animate={{ x: screenReader ? 28 : 2 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                  {screenReader && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 rounded-lg bg-blue-500/10 border border-blue-400/30"
                    >
                      <p className="text-xs text-blue-300">
                        ✓ Elementos serão narrados ao passar o mouse
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* High Contrast */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {highContrast ? <Eye className="w-5 h-5 text-blue-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                      <div>
                        <h3 className="font-bold">Alto Contraste</h3>
                        <p className="text-xs text-gray-400">Melhor visibilidade</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleHighContrast}
                      className={`relative w-14 h-7 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        highContrast ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gray-700'
                      }`}
                      aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
                      aria-checked={highContrast}
                      role="switch"
                    >
                      <motion.div
                        animate={{ x: highContrast ? 28 : 2 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Type className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-bold">Tamanho da Fonte</h3>
                      <p className="text-xs text-gray-400">Atual: {fontSize === 'small' ? 'Pequena' : fontSize === 'medium' ? 'Média' : fontSize === 'large' ? 'Grande' : 'Extra Grande'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decreaseFontSize}
                      disabled={fontSize === 'small'}
                      className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2"
                      aria-label="Diminuir fonte"
                    >
                      <Minus className="w-4 h-4" />
                      <span className="text-sm font-medium">A-</span>
                    </button>
                    <button
                      onClick={resetFontSize}
                      className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2"
                      aria-label="Resetar fonte"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={increaseFontSize}
                      disabled={fontSize === 'xlarge'}
                      className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2"
                      aria-label="Aumentar fonte"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">A+</span>
                    </button>
                  </div>
                </div>

                {/* Voice Assistant */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mic className={`w-5 h-5 ${voiceAssistant ? 'text-blue-400' : 'text-gray-400'}`} />
                      <div>
                        <h3 className="font-bold">Assistente de Voz</h3>
                        <p className="text-xs text-gray-400">Comandos por voz</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleVoiceAssistant}
                      className={`relative w-14 h-7 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        voiceAssistant ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gray-700'
                      }`}
                      aria-label={voiceAssistant ? 'Desativar assistente de voz' : 'Ativar assistente de voz'}
                      aria-checked={voiceAssistant}
                      role="switch"
                    >
                      <motion.div
                        animate={{ x: voiceAssistant ? 28 : 2 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                  {voiceAssistant && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 rounded-lg bg-blue-500/10 border border-blue-400/30"
                    >
                      <p className="text-xs text-blue-300 mb-2">
                        ✓ Assistente NR-1 pronto para ajudar
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Keyboard className="w-3 h-3" />
                        <span>Use comandos de voz para navegar</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-blue-400" />
                    Navegação por Teclado
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li>• <kbd className="px-1.5 py-0.5 rounded bg-white/10">Tab</kbd> - Navegar entre elementos</li>
                    <li>• <kbd className="px-1.5 py-0.5 rounded bg-white/10">Enter</kbd> - Ativar botão/link</li>
                    <li>• <kbd className="px-1.5 py-0.5 rounded bg-white/10">Esc</kbd> - Fechar modais</li>
                    <li>• <kbd className="px-1.5 py-0.5 rounded bg-white/10">Setas</kbd> - Navegar em listas</li>
                  </ul>
                </div>

                {/* Compatibility */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold mb-3 text-sm">Compatível com:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      NVDA
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      JAWS
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      VoiceOver
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      TalkBack
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
