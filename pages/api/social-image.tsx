import * as React from 'react';
import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'experimental-edge',
};
 
export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Deniz Jasarbasic
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
