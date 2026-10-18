import { execSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

// Browser stubs, installed before the build's code loads.
const store = new Map();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true, writable: true,
  value: {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k),
    clear: () => store.clear(),
  },
});
Object.defineProperty(globalThis, 'window', {
  configurable: true, writable: true,
  value: { location: { origin: 'http://localhost', pathname: '/', href: 'http://localhost/', search: '' } },
});

const cache = path.resolve('evals/.cache/aistudio');
execSync(`mkdir -p "${cache}" && unzip -q -o builds/aistudio.zip -d "${cache}"`);
const outfile = path.resolve('evals/.cache/aistudio-storage.mjs');
await build({
  entryPoints: [path.join(cache, 'src/utils/storage.ts')],
  bundle: true, format: 'esm', platform: 'node', outfile, logLevel: 'silent',
});
const s = await import(pathToFileURL(outfile).href);

const users = {
  alice: { id: 'u_alice', name: 'Alice' },
  bob: { id: 'u_bob', name: 'Bob' },
  carol: { id: 'u_carol', name: 'Carol' },
};

export const skipReason = false;
export const userId = async u => users[u].id;

export async function createTrip({ user, name }) {
  const t = s.createNewTrip(name, '', '', users[user]);
  return { creator: t.creatorId, token: t.inviteCode, link: t.inviteLink };
}

export async function joinTrip({ user, token }) {
  const r = s.joinTripWithCode(token, users[user]);
  return { ok: r.success, error: r.error };   // trip is left out of refusals on purpose
}

export async function myTrips({ user }) {
  return s.loadStoredTrips()
    .filter(t => t.members.some(m => m.userId === users[user].id))
    .map(t => t.name);
}