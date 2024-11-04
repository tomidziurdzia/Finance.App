// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const url =
    input instanceof URL
      ? input
      : new URL(input.toString(), window.location.origin);

  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`An error occurred: ${res.statusText}`);
  }
  return res.json() as Promise<JSON>;
}
