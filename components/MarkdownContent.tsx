'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headers
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-slate-900 mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">{children}</h3>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </a>
        ),

        // Bold and italic
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),

        // Code blocks
        pre: ({ children }) => (
          <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes('language-')
          if (isBlock) {
            return <code className="text-slate-100">{children}</code>
          }
          return (
            <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          )
        },

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 pr-4 py-3 my-4 text-slate-700 rounded-r-lg">
            {children}
          </blockquote>
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-slate-100">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-slate-200">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-slate-50">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-slate-600 border-b border-slate-100">
            {children}
          </td>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 my-4 text-slate-600">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 my-4 text-slate-600">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),

        // Horizontal rule
        hr: () => (
          <hr className="my-8 border-slate-200" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
