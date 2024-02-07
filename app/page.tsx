import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import App from './App';

const frameMetadata = getFrameMetadata({
  input: {
    text: 'Enter 2 hex values separated with a comma (ex: ff00ff,9900ff)',
  },
  buttons: [
    {
      action: 'link',
      label: 'Create Image',
      target: `${NEXT_PUBLIC_URL}?bg=${'ffff00'}&fg=${'9900ff'}`,
    },
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'indexer.xyz',
  description: 'frame lab 1',
  openGraph: {
    title: 'indexer.xyz',
    description: 'frame lab 1',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <App />
    </>
  );
}
