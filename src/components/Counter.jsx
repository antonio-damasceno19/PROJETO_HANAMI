export default function Counter({ text }) {
  const chars = text.length
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  return <p className="counter">Caracteres: {chars} | Palavras: {words}</p>
}
