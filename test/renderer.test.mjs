import test from 'node:test';
import assert from 'node:assert/strict';

import { renderField } from '../src/renderer.js';

test('heatmap buffer starts exactly at the field bounds, without a half-cell offset', () => {
  const drawCalls = [];
  const ctx = {
    save() {},
    restore() {},
    drawImage(...args) {
      drawCalls.push(args);
    },
  };
  const buffer = {};
  const field = { cols: 3, rows: 2, bounds: { minX: 10, minY: 20 }, opts: { cellSize: 8 } };
  const view = { scale: 2, toX: (x) => x * 2 + 5, toY: (y) => y * 2 + 7 };

  renderField(ctx, field, view, { buffer, opacity: 0.85 });

  assert.deepEqual(drawCalls, [[buffer, 25, 47, 48, 32]]);
});
