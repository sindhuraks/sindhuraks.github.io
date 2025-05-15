import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';
import { MatrixRainingLetters } from "react-mdr";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Terminal() {
  const [history, setHistory] = useState([
    "Welcome to My Portfolio",
    "Type 'ls' to see available commands."
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const [resumePages, setResumePages] = useState(null);
  const [resumePageNumber, setResumePageNumber] = useState(1);

  const commands = {
    ls: () => (
      <div style={{ padding: 12 }}>
        Available commands: ls, whoami, projects, contact, resume, clear
      </div>
      ),
    whoami: () => (
      <div style={{ padding: 12 }}>
        Hello there! I'm Sindhura, a CS grad student at University of Florida.
      </div>
      ),
    projects: () => (
      <div style={{ padding: 12 }}>
        1. Portfolio
      </div>
      ),
    contact: () => (
      <>

      <div style={{ padding: 12 }}>
          <a href="mailto:sindhu.ss10@gmail.com">
            <FaEnvelope style={{ marginRight: 8 }} />
          </a>
          <span style={{ color: '#00ff00', margin: '0 10px' , width: 1, height: 24}}>|</span>
          <a href="https://www.linkedin.com/in/sindhura-k-subramanian/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={{ marginRight: 8 }} />
          </a>
          <span style={{ color: '#00ff00', margin: '0 10px', width: 1, height: 24 }}>|</span>
          <a href="https://github.com/sindhuraks" target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ marginRight: 8 }} />
          </a>    
      </div>
      </>
    ),
    clear: () => null,
    resume: () => (
        <div style={{ padding: 12 }}>
          <p style={{ color: '#00ff00', marginBottom: 10 }}>
            View or download my resume below:
          </p>
          <a
            href="/Sindhura_Kumbakonam_Subramanian_Resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#00ff00', textDecoration: 'underline', fontSize: '16px' }}
          >
            Open Resume
          </a>
          <span style={{ color: '#00ff00', margin: '0 10px' }}>|</span>
          <a
            href="/Sindhura_Kumbakonam_Subramanian_Resume.pdf"
            download
            style={{ color: '#00ff00', textDecoration: 'underline', fontSize: '16px' }}
          >
            Download Resume
          </a>
        </div>
    )
  };

  const availableCommands = Object.keys(commands);
  
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
    else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.trim()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
      else if (matches.length > 1) {
        setHistory(h => [...h, matches.join('    ')]);
      }
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
              style={{ background: 'transparent', color: '#00ff00', border: 'none', outline: 'none', fontSize: 16, fontFamily: 'Courier New, monospace', fontWeight: 'bold' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}