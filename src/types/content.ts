export type VideoAsset = {
  id: string;
  title?: string;
  url: string;
  expiresAt: string;
  mimeType?: string;
  provider?: string;
};

export type Step = {
  id: string;
  title: string;
  description: string;
  video: VideoAsset;
};

export type Trail = {
  id: string;
  title: string;
  steps: Step[];
};
