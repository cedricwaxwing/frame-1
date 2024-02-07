import { CanvasImageProvider } from './CanvasImageContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CanvasImageProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </CanvasImageProvider>
  );
}
