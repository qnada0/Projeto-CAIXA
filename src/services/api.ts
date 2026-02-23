const BASE_URL = import.meta.env.VITE_CONTENT_API_BASE_URL || '';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        throw new ApiError(response.status, errorMessage, errorData);
      } catch {
        throw new ApiError(response.status, errorMessage);
      }
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }
      throw new ApiError(0, error.message);
    }

    throw new ApiError(0, 'Unknown error occurred');
  }
}
