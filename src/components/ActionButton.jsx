export default function ActionButton({ label, onClick, secondary }) {
  return (
    <button className={secondary ? 'btn secondary' : 'btn'} onClick={onClick}>
      {label}
    </button>
  )
}
