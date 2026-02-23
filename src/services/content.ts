import { fetchJson } from './api';
import type { Trail } from '../types/content';

export async function getTrail(trailId: string): Promise<Trail> {
  return fetchJson<Trail>(`/api/trails/${trailId}`);
}
