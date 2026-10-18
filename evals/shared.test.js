import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as aistudio from './impl/aistudio.js';
import * as bolt from './impl/bolt.js';

const builds = { 'AI Studio': aistudio, 'bolt.new': bolt };

for (const [name, b] of Object.entries(builds)) {
  const opts = { skip: b.skipReason || false };

  test(`${name} F2-1: creator assigned and invite link given`, opts, async () => {
    const trip = await b.createTrip({ user: 'alice', name: `Test Trip ${Date.now()}` });
    assert.equal(trip.creator, await b.userId('alice'));
    assert.ok(trip.token, 'no invite token returned');
  });

  test(`${name} F2-2: invalid link refused, no trip details`, opts, async () => {
    const secret = `Secret Trip ${Date.now()}`;
    await b.createTrip({ user: 'alice', name: secret });
    const result = await b.joinTrip({ user: 'bob', token: 'FORGED-INVITE-999' });
    assert.equal(result.ok, false);
    assert.ok(!JSON.stringify(result).includes(secret), 'trip name leaked');
  });

  test(`${name} F2-3: one link, accepted from two different people`, opts, async () => {
    const trip = await b.createTrip({ user: 'alice', name: `Reuse Trip ${Date.now()}` });
    const first = await b.joinTrip({ user: 'bob', token: trip.token });
    const second = await b.joinTrip({ user: 'carol', token: trip.token });
    assert.equal(first.ok, true);
    assert.equal(second.ok, true);
  });

  test(`${name} F2-3: a member who joined can then see the trip`, opts, async () => {
    const tripName = `Visible Trip ${Date.now()}`;
    const trip = await b.createTrip({ user: 'alice', name: tripName });
    await b.joinTrip({ user: 'bob', token: trip.token });
    const names = await b.myTrips({ user: 'bob' });
    assert.ok(names.includes(tripName), 'joined member cannot see the trip');
  });
}