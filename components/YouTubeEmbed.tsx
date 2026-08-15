// Embed responsive de YouTube para /insights — usa el dominio -nocookie (sin cookies de
// seguimiento hasta que el usuario le da play, mejor por privacidad y por Core Web Vitals).
export default function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ paddingTop: '56.25%', border: '1px solid var(--ed-line)' }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}
