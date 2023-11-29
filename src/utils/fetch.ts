export async function get(url: string) {
  const res = await fetch(url);
  return await res.json();
}
