import { useState } from 'react'
import TextArea from './components/TextArea'
import ActionButton from './components/ActionButton'
import Counter from './components/Counter'

export default function App() {
  const [text, setText] = useState('')

  return (
    <main className="container">
      <h1>TextFix</h1>
      <TextArea value={text} onChange={setText} />
      <div className="actions">
        <ActionButton label="MAIÚSCULAS" onClick={() => setText(text.toUpperCase())} />
        <ActionButton label="minúsculas" onClick={() => setText(text.toLowerCase())} />
        <ActionButton label="Remover Espaços" onClick={() => setText(text.replace(/\s+/g,' ').trim())} />
        <ActionButton label="Limpar" secondary onClick={() => setText('')} />
      </div>
      <Counter text={text} />
    </main>
  )
}
