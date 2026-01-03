export default function TextArea({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Digite ou cole seu texto aqui..."
    />
  )
}
