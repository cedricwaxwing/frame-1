import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  const colorsDefault: string = '0000ff,00ff00';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  const colors = message?.input ? message.input.split(',') : colorsDefault.split(',');

  if (message?.button === 3) {
    return NextResponse.redirect(`${NEXT_PUBLIC_URL}?bg=${colors[0]}&fg=${colors[1]}`, {
      status: 302,
    });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'link',
          label: `TEST ME: ${colors[0]}, ${colors[1]}`,
          target: `${NEXT_PUBLIC_URL}?bg=${colors[0]}&fg=${colors[1]}`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/park-2.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
