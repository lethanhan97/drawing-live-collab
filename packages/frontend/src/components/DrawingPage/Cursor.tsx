import React from 'react';

export interface CursorProps {
  shouldDisplay: boolean;
  x: number;
  y: number;
  cursorDisplay: string;
}

export default function Cursor({
  x,
  y,
  shouldDisplay,
  cursorDisplay,
}: CursorProps) {
  const CURSOR_RADIUS = 5;
  const CURSOR_LABEL_PADDING = 20;
  const SVG_WIDTH = 200;
  const SVG_HEIGHT = CURSOR_RADIUS + 40;

  console.log('cursor display', cursorDisplay);

  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      fill="red"
      style={{
        position: 'absolute',
        left: x - SVG_WIDTH / 2,
        top: y - CURSOR_RADIUS,
        pointerEvents: 'none',
        visibility: shouldDisplay ? 'visible' : 'hidden',
      }}
    >
      <g>
        <circle cx={SVG_WIDTH / 2} cy={CURSOR_RADIUS} r={CURSOR_RADIUS} />
        <text
          x="50%"
          y={CURSOR_RADIUS * 2 + CURSOR_LABEL_PADDING}
          textAnchor="middle"
        >
          {cursorDisplay}
        </text>
      </g>
    </svg>
  );
}
