const BREEDS_URL = 'https://dogapi.dog/api/v2/breeds?filter[has_images]=true&page[size]=1000';

export function banKey(attribute) {
  return JSON.stringify([attribute.key, attribute.value]);
}

function range(value, unit) {
  if (!Number.isFinite(value?.min) || !Number.isFinite(value?.max)) return null;
  return `${value.min}–${value.max} ${unit}`;
}

function toDog(record) {
  const data = record?.attributes;
  if (!record?.id || !data?.name) return null;
  const image = Array.isArray(data.images) ? data.images.find((item) => /^https:\/\//.test(item?.url)) : null;
  const life = range(data.life, 'years');
  const weight = range(data.male_weight, 'kg');
  if (!image || !life || !weight || typeof data.hypoallergenic !== 'boolean') return null;
  return {
    id: record.id,
    name: data.name,
    description: data.description || '',
    imageUrl: image.medium || image.url,
    imageCredit: {
      author: image.attribution?.author || 'Wikimedia Commons contributor',
      license: image.attribution?.license || '',
      licenseUrl: image.attribution?.license_url || '',
      sourceUrl: image.attribution?.source_url || image.url,
    },
    attributes: [
      { key: 'breed', label: 'Breed', value: data.name },
      { key: 'life', label: 'Life span', value: life },
      { key: 'male_weight', label: 'Male weight', value: weight },
      { key: 'hypoallergenic', label: 'Hypoallergenic', value: data.hypoallergenic ? 'Yes' : 'No' },
    ],
  };
}

/** Every discovery requests live JSON, then selects a complete, unbanned breed. */
export async function fetchDog(bans = [], historyIds = [], signal) {
  let response;
  try {
    response = await fetch(BREEDS_URL, { signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('Could not reach the dog API. Check your connection and try again.');
  }
  if (!response.ok) throw new Error(`The dog API is unavailable (${response.status}). Please try again.`);
  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error('The dog API returned an unreadable response. Please try again.');
  }
  if (!Array.isArray(body?.data)) throw new Error('The dog API returned unexpected data. Please try again.');
  const banned = new Set(bans.map(banKey));
  const completeDogs = body.data.map(toDog).filter(Boolean);
  if (!completeDogs.length) throw new Error('The dog API has no complete photos available. Please try again later.');
  const eligible = completeDogs.filter((dog) => !dog.attributes.some((attribute) => banned.has(banKey(attribute))));
  if (!eligible.length) throw new Error('No dogs match your ban list. Remove a banned attribute to discover more dogs.');
  const seen = new Set(historyIds);
  let candidates = eligible.filter((dog) => !seen.has(dog.id));
  // Once every eligible breed has been seen, avoid immediately repeating the last result.
  if (!candidates.length) candidates = eligible.filter((dog) => dog.id !== historyIds.at(-1));
  if (!candidates.length) candidates = eligible;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
