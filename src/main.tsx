import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/global.css';

function renderFatal(message: string) {
  const root = document.getElementById('root');
  if (!root) return;
  root.innerHTML = '';
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.inset = '0';
  el.style.background = '#0a0a0b';
  el.style.color = '#ff6b6b';
  el.style.zIndex = '999999';
  el.style.padding = '16px';
  el.style.fontFamily = 'monospace';
  el.style.fontSize = '12px';
  el.style.lineHeight = '1.5';
  el.style.overflow = 'auto';
  el.style.whiteSpace = 'pre-wrap';
  el.textContent = 'ДИАГНОСТИКА ОШИБКИ (main.tsx):\n' + message;
  root.appendChild(el);
}

try {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('#root не найден в DOM');
  }
  createRoot(container).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (e) {
  renderFatal(e instanceof Error ? `${e.message}\n${e.stack}` : String(e));
}
