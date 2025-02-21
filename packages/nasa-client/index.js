import data from './data';

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export async function getAvailableAstronauts(max) {
    const min = Math.min(Math.floor(Math.random() * (max - 1 + 1)) + 1, max - 1);
    const source = [...data];
    // const [, , , source = [ ...data ]] = await Promise.allSettled([
    //   fetch('https://xeno-canto.org/api/2/recordings?query=cnt:austria'),
    //   fetch('https://xeno-canto.org/api/2/recordings?query=troglodytes+troglod'),
    //   fetch('https://xeno-canto.org/api/2/recordings?query=bearded+bellbird+q:A'),
    // ]);

    for (let i = source.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [source[i], source[j]] = [source[j], source[i]];
    }

    await sleep(1000);

    return source.slice(min, max);
}
