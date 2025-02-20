import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { randomBytes } from 'crypto';

const getRandomId = () => randomBytes(16).toString('hex');

const getRandomAnswer = (excludedAnswer?: string) => {
  return [
    'The quick brown fox',
    'A clever solution',
    'Imagination is key',
    'Hidden in plain sight',
    'A mysterious puzzle'
  ]
    .filter(ans => ans !== excludedAnswer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map(text => ({ id: getRandomId(), text }));
};

export async function POST(request: NextRequest) {
  if (request.headers.get('scope') !== 'license') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const status = formData.get('status');
  const contents = formData.get('contents');
  const onswer = formData.get('onswer');

  if (['DRAFT', 'READY'].includes(String(status)) === false) {
    return NextResponse.json(
      { message: 'Invalid status' },
      { status: 400 }
    );
  }

  if (String(onswer).length > 50) {
    return NextResponse.json(
      {
        errors: [{
          error: 'FIELD_TOO_LONG',
          scope: 'answer'
        }]
      },
      { status: 412 }
    );
  }

  const responseData = {
    id: getRandomId(),
    status: String(status),
    contents: String(contents),
    answers: [
      { id: getRandomId(), text: String(onswer) },
      ...getRandomAnswer(String(onswer))
    ]
  };

  return NextResponse.json(responseData, { status: 200 });
}