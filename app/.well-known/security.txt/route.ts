// security.txt - RFC 9116
// Standard for security vulnerability disclosure

export async function GET() {
  const content = `Contact: mailto:security@luxia.us
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: es, en
Canonical: https://luxia.us/.well-known/security.txt
Policy: https://luxia.us/security-policy
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
