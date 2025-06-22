import { forbidden, unauthorized } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { verifyImageToken } from '@/auth/image-token';
import { getStorageImageAsBase64 } from '@/gcp/storage';

type HandleProps = {
  params: Promise<{
    token: string;
  }>;
};

export const GET = async (request: NextRequest, { params }: HandleProps) => {
  const { token } = await params;
  const session = await auth();

  if (!session) {
    return unauthorized();
  }

  const decoded = verifyImageToken(token);

  if (!decoded || decoded.userId !== session.user.id) {
    return forbidden();
  }

  try {
    const imageBase64 = await getStorageImageAsBase64(decoded.gcsUri);
    const [header, base64] = imageBase64.split(',');
    const mimeType = header.split(':')[1].split(';')[0];
    const imageBuffer = Buffer.from(base64, 'base64');

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Could not load image' },
      { status: 500 }
    );
  }
};
