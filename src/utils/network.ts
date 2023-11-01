export const getApiResource = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('could not fetch: ', res.status);
      return Promise.reject('could not fetch: ' + res.status);
    }
    return Promise.resolve(await res.json());
  } catch (e) {
    if (e instanceof Error) {
      console.error('could not fetch: ', e?.message);
      return Promise.reject('could not fetch: ' + e?.message);
    }
  }
};
