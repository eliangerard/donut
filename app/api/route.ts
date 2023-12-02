export async function GET() {
  const data = { hello: 'world' }

  return Response.json({ data })
}