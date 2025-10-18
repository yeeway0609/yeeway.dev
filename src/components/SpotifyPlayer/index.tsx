export function SpotifyPlayer() {
  const songs = [
    '68pyZjn31y1s2MKgoOu4ug', // 詩超絆
    '4i0HNuFEH6P6K4UnsY5uUh', // Blue Valentine
    '4vEPfqkEgL3ARGLS3Qdq2H', // Life Hack
    '4c2oEDopvep6mnJK25KzVE', // DNA by Yena
    '2FN7qaJcXH3HQfGeeBinbZ', // ちゅ、多様性。
    '2RoYgkPzUY0vY7lhUuyus1', // DASH
    '74X2u8JMVooG2QbjRxXwR8', // Perfect Night
    '0y0uzuB1HxljAY2j0tLETp', // Fancy by STAYC
    '5KxTHd0r8eM6T2K65zxt2L', // Winter Without You
    '3v5o91PrUtf0nmO6j8J7dZ', // Left Right
    '4P5ozkI1bxiGxA5rZ27jlO', // Bubble by STAYC
  ]
  const randomIndex = Math.floor(Math.random() * songs.length)

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${songs[randomIndex]}?utm_source=generator&theme=0`}
      className="mt-1 rounded-lg sm:w-[500px]"
      width="100%"
      height="80"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  )
}
