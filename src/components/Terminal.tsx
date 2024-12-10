// src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { commandsPt, commandsEn } from '../commands';

type Language = 'pt' | 'en' | null;

interface Line {
  content: string;
  isHtml?: boolean;
}

const PROMPT = "usuario@maquina:~$ ";

const translations = {
  pt: {
    welcome: "Bem-vindo ao meu terminal pessoal!",
    helpMsg: "Digite 'help' para ver os comandos disponíveis.",
    langPrompt: "Selecione um idioma: [1] Português, [2] English",
    invalidOption: "Opção inválida",
    unrecognizedCmd: (cmd: string) => `Comando não reconhecido: ${cmd}`
  },
  en: {
    welcome: "Welcome to my personal terminal!",
    helpMsg: "Type 'help' to see the available commands.",
    langPrompt: "Select a language: [1] Português, [2] English",
    invalidOption: "Invalid option",
    unrecognizedCmd: (cmd: string) => `Command not recognized: ${cmd}`
  }
};

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Line[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [language, setLanguage] = useState<Language>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ao iniciar, pergunta o idioma
    setHistory([
      { content: "Selecione um idioma / Select a language: [1] Português, [2] English" }
    ]);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace') {
      setCurrentInput((prev) => prev.slice(0, -1));
      e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setCurrentInput((prev) => prev + e.key);
    } else if (e.key === 'Enter') {
      executeCommand(currentInput.trim());
    }
  };

  const executeCommand = (cmd: string) => {
    // Linha do usuário sempre texto puro
    setHistory(h => [...h, { content: PROMPT + cmd }]);

    if (language === null) {
      // Escolhendo idioma
      if (cmd === '1') {
        setLanguage('pt');
        setHistory(h => [
          ...h,
          { content: translations.pt.welcome },
          { content: translations.pt.helpMsg }
        ]);
      } else if (cmd === '2') {
        setLanguage('en');
        setHistory(h => [
          ...h,
          { content: translations.en.welcome },
          { content: translations.en.helpMsg }
        ]);
      } else {
        setHistory(h => [
          ...h,
          { content: translations.pt.invalidOption + " / " + translations.en.invalidOption }
        ]);
        setHistory(h => [
          ...h,
          { content: "Selecione um idioma / Select a language: [1] Português, [2] English" }
        ]);
      }
      setCurrentInput("");
      return;
    }

    // Já temos um idioma selecionado
    const currentCommands = language === 'pt' ? commandsPt : commandsEn;
    const t = translations[language];

    if (cmd === 'clear') {
      setHistory([]);
      setCurrentInput("");
      return;
    }

    if (cmd === '') {
      // Comando vazio
      setCurrentInput("");
      return;
    }

    const handler = currentCommands[cmd];
    if (handler) {
      const result = handler();
      if (result instanceof Promise) {
        result.then(r => {
          if (r) addHtmlLine(r);
        });
      } else {
        if (result) addHtmlLine(result);
      }
    } else {
      setHistory(h => [...h, { content: t.unrecognizedCmd(cmd) }]);
    }

    setCurrentInput("");
  };

  const addHtmlLine = (html: string) => {
    // Substitui \n por <br> para formatação
    const formatted = html.replace(/\n/g, "<br>");
    setHistory(h => [...h, { content: formatted, isHtml: true }]);
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        Daniel Figueroa
      </div>
      <div 
        className="terminal-body"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={containerRef}
        style={{ outline: "none"}}
      >
        {history.map((line, i) => (
          line.isHtml 
            ? <div key={i} dangerouslySetInnerHTML={{ __html: line.content }}></div>
            : <div key={i}>{line.content}</div>
        ))}
        <div>
          <span className="prompt">{PROMPT}</span>
          <span>{currentInput}</span>
          <span className="cursor"></span>
        </div>
      </div>
    </div>
  );
};
