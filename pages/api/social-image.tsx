import * as React from 'react';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge'
};

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1F2027',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 900,
            height: 465,
            backgroundColor: '#fff',
            borderRadius: 8,
            border: '16px solid rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              fontSize: 70,
              fontWeight: 700
            }}
          >
            Deniz Jasarbasic
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
