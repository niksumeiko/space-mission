const data = require('data');

export async function getAvailableAstronauts(max) {
  const [, , , source = data] = await Promise.all([
    fetch('https://xeno-canto.org/api/2/recordings?query=cnt:austria'),
    fetch('https://xeno-canto.org/api/2/recordings?query=troglodytes+troglod'),
    fetch('https://xeno-canto.org/api/2/recordings?query=bearded+bellbird+q:A'),
  ]);

  return source.slice(0, max);
}
