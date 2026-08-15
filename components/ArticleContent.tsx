'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ArticleContentProps {
  content: string
}

// Renderer de Markdown para /insights — mismo sistema "editorial-luz" (tokens --ed-*) que
// services/cases. NO reutiliza el viejo components/MarkdownContent.tsx (estilos Tailwind
// slate/blue de la sección learning/, que no coinciden con la identidad vigente).
export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2
              className="font-editorial text-2xl md:text-3xl font-bold tracking-[-0.02em] mt-14 mb-5 pt-8"
              style={{ color: 'var(--ed-ink)', borderTop: '1px solid var(--ed-line)' }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-editorial text-xl font-bold tracking-[-0.01em] mt-8 mb-3" style={{ color: 'var(--ed-ink)' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: 'var(--ed-gray)' }}>
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="underline underline-offset-2 hover:opacity-80"
              style={{ color: 'var(--ed-accent)' }}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold" style={{ color: 'var(--ed-ink)' }}>
              {children}
            </strong>
          ),
          em: ({ children }) => <em style={{ color: 'var(--ed-ink)' }}>{children}</em>,
          blockquote: ({ children }) => (
            <blockquote
              className="my-8 pl-5 py-1 font-editorial text-lg md:text-xl font-medium leading-snug"
              style={{ borderLeft: '3px solid var(--ed-accent)', color: 'var(--ed-ink)' }}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-2 mb-5" style={{ color: 'var(--ed-gray)' }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-2 mb-5" style={{ color: 'var(--ed-gray)' }}>
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          hr: () => <hr className="my-10" style={{ borderColor: 'var(--ed-line)' }} />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-xl" style={{ border: '1px solid var(--ed-line)' }}>
              <table className="min-w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ backgroundColor: 'var(--ed-paper-2)' }}>{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr style={{ borderTop: '1px solid var(--ed-line)' }}>{children}</tr>,
          th: ({ children }) => (
            <th
              className="font-data text-left px-4 py-3 text-xs uppercase tracking-[0.1em]"
              style={{ color: 'var(--ed-gray)' }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="font-data px-4 py-3" style={{ color: 'var(--ed-ink)' }}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
