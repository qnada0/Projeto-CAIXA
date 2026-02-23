import { fetchJson } from './api';
import type { VideoAsset } from '../types/content';

export async function refreshSignedVideoUrl(videoId: string): Promise<VideoAsset> {
  return fetchJson<VideoAsset>(`/api/videos/${videoId}/signed-url`, {
    method: 'POST',
  });
}

export function isExpired(expiresAt: string): boolean {
  try {
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    return now >= expiryDate;
  } catch {
    return false;
  }
}
