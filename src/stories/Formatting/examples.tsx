import React, { useState } from 'react';
import { colorFromHueRange } from '.';

export const HueRangeExample = () => {
  const [hueRangeTest, setHueRangeTest] = useState(0);
  return (
    <div>
      <h1
        style={{
          color: colorFromHueRange({ from: 0, to: 120 }, hueRangeTest),
        }}
      >
        Hue Range Example (red to green)
      </h1>
      <input
        type='range'
        value={hueRangeTest}
        onChange={(e) => setHueRangeTest(+e.target.value)}
        min={0}
        max={1}
        step={1e-9}
      />
    </div>
  );
};
