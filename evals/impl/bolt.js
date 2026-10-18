import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

function readEnv() {
  const p = process.env.BOLT_ENV || 'scratch/bolt/project/.env';
  const out = {};
  if (fs.existsSync(p)) {
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^(\w+)=(.*)$/);
      if (m) out[m[1]] = m[2].trim();
    }
  }
  return {
    url: process.env.VITE_SUPABASE_URL || out.VITE_SUPABASE_URL,
    key: process.env.VITE_SUPABASE_ANON_KEY || out.VITE_SUPABASE_ANON_KEY,
  };
}

const { url, key } = readEnv();
export const skipReason = url && key ? false
  : 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see README) to run against the live bolt.new backend';

const clients = {};
async function client(user) {
  if (clients[user]) return clients[user];
  const c = createClient(url, key, { auth: { persistSession: false } });
  const email = `hw6eval-${user}-${Date.now()}@example.com`;
  const { data, error } = await c.auth.signUp({ email, password: 'EvalPass123!' });
  if (error) throw error;
  if (!data.session) throw new Error('Sign-up gave no session (email confirmation may be on)');
  clients[user] = { c, id: data.user.id };
  return clients[user];
}

export const userId = async u => (await client(u)).id;

export async function createTrip({ user, name }) {
  const { c } = await client(user);
  const { data, error } = await c.rpc('create_trip', { p_name: name });
  if (error) throw error;
  return { creator: data.creator_id, token: data.invite_token };
}

export async function joinTrip({ user, token }) {
  const { c } = await client(user);
  const { data, error } = await c.rpc('join_trip', { p_invite_token: token });
  return error ? { ok: false, error: error.message } : { ok: true, tripId: data };
}

export async function myTrips({ user }) {
  const { c } = await client(user);
  const { data, error } = await c.from('trips').select('id, name');
  if (error) throw error;          // a 500 from the recursive policy lands here
  return data.map(t => t.name);
}