import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// SHA-1 digests of Create React App's template favicon.ico, logo192.png and logo512.png.
const TEMPLATE_ICONS = new Set([
  '1120538c77ad1f28a89243b4b53fe2ac16cc3bc6',
  '7f4f2d68782a7fafceda84554ecab9b489877500',
  '46915f9d02694ed49bfc7a9534947684103dc3fe',
]);

test("uses the portfolio's own browser and app icons, not the Create React App logo", () => {
  const publicDir = path.join(__dirname, '..', 'public');
  const manifest = JSON.parse(fs.readFileSync(path.join(publicDir, 'manifest.json'), 'utf8'));
  const files = new Set(['favicon.ico', 'logo192.png', ...manifest.icons.map((icon) => icon.src)]);
  for (const file of files) {
    const digest = crypto.createHash('sha1').update(fs.readFileSync(path.join(publicDir, file))).digest('hex');
    expect(TEMPLATE_ICONS.has(digest)).toBe(false);
  }
});
