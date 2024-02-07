import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import App from './App';

const frameMetadata = getFrameMetadata({
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  input: {
    text: 'Enter 2 hex values separated with a comma (ex: ff00ff,9900ff)',
  },
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
