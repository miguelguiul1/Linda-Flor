import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProvaBotoes from './ProvaBotoes.tsx'

const prova = new URLSearchParams(window.location.search).get('provas')

createRoot(document.getElementById('root')!).render(
  <StrictMode>{prova === 'botoes' ? <ProvaBotoes /> : <App />}</StrictMode>,
)
