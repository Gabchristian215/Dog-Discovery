import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchDog, banKey } from './dogApi.js';

function breed(id, name, hypoallergenic = false) {
  return { id, attributes: { name, life: { min: 10, max: 14 }, male_weight: { min: 20, max: 30 }, hypoallergenic, images: [{ url: `https://images.example/${id}.jpg`, attribution: { author: 'Photographer', license: 'CC BY', source_url: 'https://example.com/source' } }] } };
}

function mockApi(t, data, status = 200) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (...args) => {
    calls.push(args);
    return { ok: status === 200, status, json: async () => ({ data }) };
  });
  return calls;
}

test('each discovery fetches JSON and returns one matching photo with consistent attributes', async (t) => {
  const calls = mockApi(t, [breed('a', 'A'), breed('b', 'B')]);
  const dog = await fetchDog();
  assert.equal(dog.imageUrl, `https://images.example/${dog.id}.jpg`);
  assert.equal(dog.attributes[0].value, dog.name);
  assert.deepEqual(dog.attributes.map((a) => a.key), ['breed', 'life', 'male_weight', 'hypoallergenic']);
  assert.equal(dog.imageCredit.author, 'Photographer');
  await fetchDog();
  assert.equal(calls.length, 2);
});

test('all attribute bans are enforced and removing a ban makes the breed eligible immediately', async (t) => {
  mockApi(t, [breed('a', 'A'), breed('b', 'B', true)]);
  const ban = { key: 'hypoallergenic', value: 'No' };
  assert.equal((await fetchDog([ban])).id, 'b');
  assert.equal((await fetchDog([], ['b'])).id, 'a');
  await assert.rejects(fetchDog([{ key: 'life', value: '10–14 years' }]), /Remove a banned attribute/);
});

test('unseen breeds are preferred and last breed is avoided when history is exhausted', async (t) => {
  mockApi(t, [breed('a', 'A'), breed('b', 'B')]);
  assert.equal((await fetchDog([], ['a'])).id, 'b');
  assert.equal((await fetchDog([], ['a', 'b'])).id, 'a');
});

test('incomplete records cannot display invented metadata or missing images', async (t) => {
  const incomplete = breed('a', 'A');
  incomplete.attributes.images = [];
  mockApi(t, [incomplete]);
  await assert.rejects(fetchDog(), /no complete photos/);
});

test('HTTP failure is reported and a value ban is scoped to its attribute', async (t) => {
  mockApi(t, [], 429);
  await assert.rejects(fetchDog(), /429/);
  assert.notEqual(banKey({ key: 'breed', value: 'No' }), banKey({ key: 'hypoallergenic', value: 'No' }));
});
