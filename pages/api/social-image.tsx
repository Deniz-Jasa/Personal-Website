import * as React from 'react';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

const interRegularFontP = fetch(
  new URL('../../public/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const interBoldFontP = fetch(
  new URL('../../public/fonts/Inter-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: 'experimental-edge'
};

export default async function OGImage(req: NextRequest) {
  const [interRegularFont, interBoldFont] = await Promise.all([
    interRegularFontP,
    interBoldFontP
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1F2027',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          color: 'white'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 900,
            height: 465,
            display: 'flex',
            flexDirection: 'column',
            border: '16px solid rgba(0,0,0,0.3)',
            borderRadius: 8,
            zIndex: '1',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              fontSize: 70,
              fontWeight: 700,
              fontFamily: 'Inter'
            }}
          >
            Deniz Jasarbasic
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegularFont,
          style: 'normal',
          weight: 400
        },
        {
          name: 'Inter',
          data: interBoldFont,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
