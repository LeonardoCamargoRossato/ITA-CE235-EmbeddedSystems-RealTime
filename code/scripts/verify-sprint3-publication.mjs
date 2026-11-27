import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { setTimeout as sleep } from 'node:timers/promises';

const base = 'https://leonardocamargorossato.github.io/ITA-CE235-EmbeddedSystems-RealTime/';
const manifest = JSON.parse(await readFile(new URL('../../documentation/pdf-previews/manifest.json', import.meta.url), 'utf8'));
const doc = manifest.documents.find(d => d.key === 'sprint3-relatorio');
assert.ok(doc?.publishedSource);
const checks = [
  { path: doc.publishedSource.replace('code/public/', ''), expected: doc.sourceSha256, pdf: true },
  ...doc.pages.map(p => ({ path: p.path, expected: p.sha, pdf: false })),
];
for (let attempt = 1; attempt <= 8; attempt++) {
  try {
    for (const item of checks) {
      const response = await fetch(new URL(item.path, base), { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, item.path);
      const bytes = Buffer.from(await response.arrayBuffer());
      const hash = item.pdf ? createHash('sha256').update(bytes).digest('hex') : createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
      assert.equal(hash, item.expected, item.path);
      console.log('OK public asset:', item.path, hash);
    }
    console.log('All six public Sprint 3 assets match the approved report.');
    break;
  } catch (error) {
    if (attempt === 8) throw error;
    console.warn('Public deployment not yet verified:', String(error));
    await sleep(10000);
  }
}
