import db from '../../../../db';

export async function GET() {
  const { riddles} = db;
  const random = riddles[Math.floor(Math.random() * riddles.length)];

  return Response.json({ id: random.id })
}