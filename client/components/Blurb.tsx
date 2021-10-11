type Props = {
  quote: string
}

export default function Blurb({quote}: Props) {
  return (
    <blockquote style={{background: '#eee', fontStyle: 'italic', fontSize: 20, padding: '20px'}}>
      {quote}
    </blockquote>
  )
}