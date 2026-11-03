/**
 * API Client & Network Service
 * Terhubung ke backend Hostinger /api/ / backend/endpoints
 */

const API_BASE = import.meta.env.VITE_API_URL || '/backend/endpoints';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

// Token helper
export const getAuthToken = (): string | null => {
  return localStorage.getItem('almursyid_auth_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('almursyid_auth_token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('almursyid_auth_token');
  localStorage.removeItem('almursyid_admin_user');
};

export const isAuthenticated = (): boolean => {
  return Boolean(getAuthToken());
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle URL yang fleksibel jika endpoint sudah menyertakan backend atau belum
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const resJson: ApiResponse<T> = await response.json().catch(() => ({
    success: false,
    message: 'Gagal memproses respons dari server.',
    data: null as any
  }));

  if (!response.ok || !resJson.success) {
    throw new Error(resJson.message || `HTTP Error ${response.status}`);
  }

  return resJson.data;
}

export const api = {
  // Auth
  login: (credentials: { username: string; password: string }) => 
    request<{ token: string; user: any }>('/auth.php', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Berita
  getNews: (slug?: string) => 
    request<any[]>(`/news.php${slug ? `?slug=${encodeURIComponent(slug)}` : ''}`),
  
  createNews: (newsData: any) => 
    request<{ id: number; slug: string }>('/news.php', {
      method: 'POST',
      body: JSON.stringify(newsData),
    }),

  deleteNews: (id: string | number) => 
    request(`/news.php?id=${id}`, { method: 'DELETE' }),

  // Galeri
  getGallery: () => request<any[]>('/gallery.php'),
  
  createGalleryItem: (item: { title: string; category: string; imageUrl: string }) =>
    request<{ id: number }>('/gallery.php', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  deleteGalleryItem: (id: string | number) =>
    request(`/gallery.php?id=${id}`, { method: 'DELETE' }),

  // Programs
  getPrograms: () => request<any[]>('/programs.php'),

  saveProgram: (programData: any) =>
    request<{ id: string }>('/programs.php', {
      method: 'POST',
      body: JSON.stringify(programData),
    }),

  deleteProgram: (id: string) =>
    request(`/programs.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Facilities
  getFacilities: () => request<any[]>('/facilities.php'),

  saveFacility: (facilityData: any) =>
    request<{ id: number }>('/facilities.php', {
      method: 'POST',
      body: JSON.stringify(facilityData),
    }),

  deleteFacility: (id: string | number) =>
    request(`/facilities.php?id=${id}`, { method: 'DELETE' }),

  // Settings
  getSetting: (key: string) =>
    request<any>(`/settings.php?key=${encodeURIComponent(key)}`),

  saveSetting: (key: string, value: any) =>
    request<{ key: string }>('/settings.php', {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    }),

  // PPDB
  submitPPDB: (applicantData: any) =>
    request<{ id: number; registrationNumber: string; fullName: string }>('/ppdb.php', {
      method: 'POST',
      body: JSON.stringify(applicantData),
    }),

  getPPDBApplicants: () => request<any[]>('/ppdb.php'),

  updatePPDBStatus: (id: string, status: string, notes?: string) =>
    request('/ppdb.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status, notes }),
    }),

  // Realtime Sync Polling
  getRealtimeEvents: (lastId: number = 0) =>
    request<{ events: any[]; latestId: number; serverTime: string }>(`/realtime.php?last_id=${lastId}`),
};
