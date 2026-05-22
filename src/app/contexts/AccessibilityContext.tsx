import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  screenReader: boolean;
  voiceAssistant: boolean;
  keyboardNav: boolean;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleScreenReader: () => void;
  toggleVoiceAssistant: () => void;
  speak: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '18px',
  xlarge: '22px'
};

const fontSizes: Array<'small' | 'medium' | 'large' | 'xlarge'> = ['small', 'medium', 'large', 'xlarge'];

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [screenReader, setScreenReader] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(true);

  // Speech synthesis
  const speak = (text: string) => {
    if (screenReader && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    speak(highContrast ? 'Modo alto contraste desativado' : 'Modo alto contraste ativado');
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      const newSize = fontSizes[currentIndex + 1];
      setFontSize(newSize);
      speak(`Tamanho de fonte aumentado para ${newSize === 'large' ? 'grande' : 'extra grande'}`);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      const newSize = fontSizes[currentIndex - 1];
      setFontSize(newSize);
      speak(`Tamanho de fonte reduzido para ${newSize === 'small' ? 'pequeno' : 'médio'}`);
    }
  };

  const resetFontSize = () => {
    setFontSize('medium');
    speak('Tamanho de fonte restaurado para médio');
  };

  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    speak(!screenReader ? 'Leitor de tela ativado' : 'Leitor de tela desativado');
  };

  const toggleVoiceAssistant = () => {
    setVoiceAssistant(!voiceAssistant);
    speak(!voiceAssistant ? 'Assistente de voz ativado' : 'Assistente de voz desativado');
  };

  // Apply font size to root
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', fontSizeMap[fontSize]);
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setKeyboardNav(true);
      }
    };

    const handleMouseDown = () => {
      setKeyboardNav(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        screenReader,
        voiceAssistant,
        keyboardNav,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleScreenReader,
        toggleVoiceAssistant,
        speak
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
