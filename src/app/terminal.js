import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';
import { MatrixRainingLetters } from "react-mdr";

const commands = {
  ls: () => "Available commands: help, whoami, projects, contact, clear",
  whoami: () => "Hello there! I'm Sindhura, a CS grad student at University of Florida.",
  projects: () => "1. Portfolio Website",
  contact: () => "Email: sindhu.ss10@gmail.com\n LinkedIn: https://www.linkedin.com/in/sindhura-k-subramanian/\nGitHub: https://github.com/sindhuraks",
  clear: () => null
};

export default function Terminal() {
  const [history, setHistory] = useState([
    "Welcome to My Portfolio",
    "Type 'ls' to see available commands."
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      setHistory(h => [...h, `sindhuraks@portfolio:~$ ${cmd}`]);
      if (cmd == 'clear') {
        setTimeout(() => setHistory([]), 0);
      } else if (commands[cmd]) {
        setHistory(h => [...h, commands[cmd]()]);
      } else if (cmd) {
        setHistory(h => [...h, `Command not found: ${cmd}`]);
      }
      setInput('');
    }
  };

  return (
    <div className="terminalOverlay">
      <MatrixRainingLetters
                custom_class="matrix-rain-bg"
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none"
                }}
            />
      <div className="terminalBox">
        <div className="terminal-inner" ref={terminalRef}>
          {history.map((line, idx) => (
            typeof line === 'string' ? (
              line.split('\n').map((subLine, subIdx) => (
                <div className="terminal__line" key={`${idx}-${subIdx}`}>
                  {subLine}
                </div>
              ))
            ) : (
              <div className="terminal__line" key={idx}>{line}</div>
            )
          ))}
          <div className="terminal__prompt">
            <span className="prompt">sindhuraks@portfolio:~$ </span>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInput}
              autoFocus
              style={{ background: 'transparent', color: '#00ff00', border: 'none', outline: 'none', fontSize: 18, fontFamily: 'Courier New, monospace' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}