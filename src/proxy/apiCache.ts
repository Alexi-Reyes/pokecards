type Fetcher<T> = () => Promise<T>;

const store: Record<string, unknown> = {};

const cacheProxy = new Proxy(store, {
  get(target, key: string) {
    return target[key];
  },
  set(target, key: string, value: unknown) {
    target[key] = value;
    return true;
  },
  has(target, key: string) {
    return key in target;
  },
});

export async function cachedFetch<T>(key: string, fetcher: Fetcher<T>): Promise<T> {
  if (key in cacheProxy) {
    return cacheProxy[key] as T;
  }
  const data = await fetcher();
  cacheProxy[key] = data;
  return data;
}
