const fs = require('fs');
const path = require('path');

const siteRoot = path.join(__dirname, '..');
const repoRoot = path.join(siteRoot, '..');

const sources = [
  { from: 'personas-male', to: 'personas/personas-male' },
  { from: 'personas-female', to: 'personas/personas-female' },
  { from: 'personas-archetypes', to: 'personas/personas-archetypes' },
];

function copyDirectory(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true });
}

// This script only works on a local checkout that sits next to the sibling
// persona folders (personas-male/, personas-female/, personas-archetypes/).
// On Vercel (and any other CI that clones just this repo), those folders
// don't exist — the committed `personas/` directory in this repo is the
// canonical copy in that case, so skip syncing instead of failing the build.
if (!fs.existsSync(path.join(repoRoot, 'personas-male'))) {
  console.log('Sibling persona folders not found (not a local monorepo checkout) — skipping sync.');
  console.log('Using the persona data already committed in this repo.');
  process.exit(0);
}

for (const { from, to } of sources) {
  const sourcePath = path.join(repoRoot, from);
  const destinationPath = path.join(siteRoot, to);

  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipping ${from} -> ${to} (source not found)`);
    continue;
  }

  copyDirectory(sourcePath, destinationPath);
  console.log(`Synced ${from} -> ${to}`);
}
