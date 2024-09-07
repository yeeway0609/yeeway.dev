export default function SpotifyPlayer() {
  const songs = [
    '4vEPfqkEgL3ARGLS3Qdq2H',
    '4c2oEDopvep6mnJK25KzVE',
    '2FN7qaJcXH3HQfGeeBinbZ',
    '2RoYgkPzUY0vY7lhUuyus1',
    '4lR8sYGMGZPvthF2yUfo7T',
    '74X2u8JMVooG2QbjRxXwR8',
    '0y0uzuB1HxljAY2j0tLETp',
    '5KxTHd0r8eM6T2K65zxt2L',
    '3v5o91PrUtf0nmO6j8J7dZ',
    '4P5ozkI1bxiGxA5rZ27jlO',
  ]
  const randomIndex = Math.floor(Math.random() * songs.length)

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${songs[randomIndex]}?utm_source=generator&theme=0`}
      className="mt-1 rounded-lg"
      width="100%"
      height="80"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  )
}
