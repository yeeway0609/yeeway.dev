import Image from 'next/image'
import { getRatedMovies, getTmdbPosterUrl } from '@/lib/tmdb.server'

export default async function LibraryMoviesPage() {
  const data = await getRatedMovies({ page: '1', language: 'zh-TW', sort: 'created_at.asc' })

  if (!data) return

  const { results } = data

  return (
    <div>
      <ul className="xs:grid-cols-2 grid gap-6 sm:grid-cols-3 md:grid-cols-4">
        {results.map((movie) => {
          const posterUrl = getTmdbPosterUrl(movie.poster_path)
          return (
            <li key={movie.id}>
              <article className="bg-card text-card-foreground flex h-full flex-col overflow-hidden rounded-lg border shadow-xs transition-transform hover:scale-[1.02]">
                <div className="bg-muted relative aspect-[2/3] w-full shrink-0">
                  {posterUrl ? (
                    <Image
                      src={posterUrl}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 30rem) 50vw, (max-width: 48rem) 33vw, 25vw"
                    />
                  ) : (
                    <span className="text-muted-foreground flex size-full items-center justify-center text-sm">無海報</span>
                  )}
                  <span className="bg-primary text-primary-foreground absolute top-2 right-2 rounded px-2 py-0.5 text-sm font-medium">
                    {movie.rating} ★
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="leading-tight font-semibold">{movie.title}</h3>
                  {movie.release_date && <time className="text-muted-foreground mt-1 text-sm">{movie.release_date.slice(0, 4)}</time>}
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
