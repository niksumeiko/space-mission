import db from '../../../../../db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ riddle: string }> }
) {
  const riddleId = (await params).riddle
  const { riddles} = db;
  const target = riddles.find(({ id }) => id === riddleId);

  if (!target) {
    return new Response(null, { status: 404 });
  }

  return Response.json(target);
}
