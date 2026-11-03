import { 
  SITE_INFO as DEFAULT_SITE_INFO, 
  PROGRAMS as DEFAULT_PROGRAMS, 
  FACILITIES as DEFAULT_FACILITIES, 
  NEWS_DATA as DEFAULT_NEWS, 
  GALLERY_ITEMS as DEFAULT_GALLERY, 
  PPDB_FEES as DEFAULT_PPDB_FEES,
  GalleryItem 
} from '../data/siteData';
import { api } from './apiClient';

export interface PPDBApplicant {
  id: string;
  registrationNumber: string;
  fullName: string;
  gender: 'Laki-laki' | 'Perempuan';
  nisn: string;
  birthPlace: string;
  birthDate: string;
  parentName: string;
  phone: string;
  address: string;
  programChoice: string;
  status: 'Menunggu Verifikasi' | 'Lolos Berkas' | 'Diterima' | 'Ditolak';
  registeredAt: string;
  notes?: string;
}

export interface PPDBStep {
  num: string;
  title: string;
  desc: string;
}

export interface PPDBFeeItem {
  item: string;
  amount: string;
  note: string;
}

export interface PPDBSettings {
  heroImage: string;
  whatsappNumber: string;
  formUrl: string;
  brochurePdfUrl: string;
  steps: PPDBStep[];
  fees: PPDBFeeItem[];
}

const DEFAULT_PPDB_SETTINGS: PPDBSettings = {
  heroImage: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80",
  whatsappNumber: "0838-4847-8150",
  formUrl: "https://forms.gle/almursyid-ppdb",
  brochurePdfUrl: "https://forms.gle/almursyid-ppdb",
  steps: [
    {
      num: '01',
      title: 'Pendaftaran Online',
      desc: 'Mengisi formulir pendaftaran online resmi atau langsung datang ke sekretariat pondok di Way Lalaan Tanggamus.'
    },
    {
      num: '02',
      title: "Tes Baca Qur'an & Wawancara",
      desc: "Uji kemampuan membaca Al-Qur'an dasar, tes potensi akademik, serta wawancara kesiapan santri dan wali santri."
    },
    {
      num: '03',
      title: 'Pengumuman Kelulusan',
      desc: 'Hasil kelulusan disampaikan melalui WhatsApp resmi panitia dan surat keputusan penerimaan santri baru.'
    },
    {
      num: '04',
      title: 'Daftar Ulang & Masuk Asrama',
      desc: 'Penyelesaian administrasi daftar ulang, pengambilan seragam, dan penyerahan santri ke asrama pondok.'
    }
  ],
  fees: DEFAULT_PPDB_FEES
};

const STORAGE_KEYS = {
  SITE_INFO: 'almursyid_site_info_v1',
  NEWS: 'almursyid_news_v1',
  GALLERY: 'almursyid_gallery_v1',
  PROGRAMS: 'almursyid_programs_v1',
  FACILITIES: 'almursyid_facilities_v1',
  PPDB: 'almursyid_ppdb_v1',
  PPDB_SETTINGS: 'almursyid_ppdb_settings_v1',
};

// Dispatch custom event saat ada mutasi data
const dispatchStoreUpdate = (key: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('almursyid_store_updated', { detail: { key } }));
  }
};

export const AppStore = {
  // SITE INFO
  getSiteInfo: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SITE_INFO);
      return data ? JSON.parse(data) : DEFAULT_SITE_INFO;
    } catch {
      return DEFAULT_SITE_INFO;
    }
  },
  saveSiteInfo: (info: typeof DEFAULT_SITE_INFO) => {
    localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(info));
    dispatchStoreUpdate(STORAGE_KEYS.SITE_INFO);
  },

  // BERITA (Sync ke Backend Database Hostinger)
  getNews: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NEWS);
      return data ? JSON.parse(data) : DEFAULT_NEWS;
    } catch {
      return DEFAULT_NEWS;
    }
  },
  syncNewsFromApi: async (): Promise<any[]> => {
    try {
      const remoteNews = await api.getNews();
      if (Array.isArray(remoteNews) && remoteNews.length > 0) {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(remoteNews));
        dispatchStoreUpdate(STORAGE_KEYS.NEWS);
        return remoteNews;
      }
    } catch (e) {
      console.warn('Fallback local news:', e);
    }
    return AppStore.getNews();
  },
  saveNews: async (newsList: any[]) => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsList));
    dispatchStoreUpdate(STORAGE_KEYS.NEWS);
  },
  addNewsRemote: async (item: any) => {
    try {
      await api.createNews(item);
    } catch (err) {
      console.error('Remote save error:', err);
    }
    const current = AppStore.getNews();
    const updated = [item, ...current];
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.NEWS);
  },
  deleteNewsRemote: async (id: string | number) => {
    try {
      await api.deleteNews(id);
    } catch (err) {
      console.error('Remote delete error:', err);
    }
    const current = AppStore.getNews();
    const updated = current.filter(item => String(item.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.NEWS);
  },

  // GALERI (Sync ke Backend Database Hostinger)
  getGallery: (): GalleryItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return data ? JSON.parse(data) : DEFAULT_GALLERY;
    } catch {
      return DEFAULT_GALLERY;
    }
  },
  syncGalleryFromApi: async (): Promise<GalleryItem[]> => {
    try {
      const remoteGallery = await api.getGallery();
      if (Array.isArray(remoteGallery) && remoteGallery.length > 0) {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(remoteGallery));
        dispatchStoreUpdate(STORAGE_KEYS.GALLERY);
        return remoteGallery;
      }
    } catch (e) {
      console.warn('Fallback local gallery:', e);
    }
    return AppStore.getGallery();
  },
  saveGallery: (items: GalleryItem[]) => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
    dispatchStoreUpdate(STORAGE_KEYS.GALLERY);
  },
  addGalleryRemote: async (item: { title: string; category: string; imageUrl: string }) => {
    try {
      await api.createGalleryItem(item);
    } catch (err) {
      console.error('Remote gallery add error:', err);
    }
    const current = AppStore.getGallery();
    const updated = [item, ...current];
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.GALLERY);
  },
  deleteGalleryRemote: async (id: string | number) => {
    try {
      await api.deleteGalleryItem(id);
    } catch (err) {
      console.error('Remote gallery delete error:', err);
    }
    const current = AppStore.getGallery();
    const updated = current.filter(item => String(item.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.GALLERY);
  },

  // PROGRAM
  getPrograms: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return data ? JSON.parse(data) : DEFAULT_PROGRAMS;
    } catch {
      return DEFAULT_PROGRAMS;
    }
  },
  savePrograms: (programs: any[]) => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    dispatchStoreUpdate(STORAGE_KEYS.PROGRAMS);
  },

  // FASILITAS
  getFacilities: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      return data ? JSON.parse(data) : DEFAULT_FACILITIES;
    } catch {
      return DEFAULT_FACILITIES;
    }
  },
  saveFacilities: (facilities: any[]) => {
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    dispatchStoreUpdate(STORAGE_KEYS.FACILITIES);
  },

  // PPDB (Sync ke Database Hostinger)
  getPPDBApplicants: (): PPDBApplicant[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PPDB);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  syncPPDBFromApi: async (): Promise<PPDBApplicant[]> => {
    try {
      const remoteApplicants = await api.getPPDBApplicants();
      if (Array.isArray(remoteApplicants)) {
        localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(remoteApplicants));
        dispatchStoreUpdate(STORAGE_KEYS.PPDB);
        return remoteApplicants;
      }
    } catch (e) {
      console.warn('Fallback local PPDB:', e);
    }
    return AppStore.getPPDBApplicants();
  },
  savePPDBApplicants: (applicants: PPDBApplicant[]) => {
    localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(applicants));
    dispatchStoreUpdate(STORAGE_KEYS.PPDB);
  },
  addPPDBApplicant: async (applicant: Omit<PPDBApplicant, 'id' | 'registrationNumber' | 'registeredAt' | 'status'>) => {
    let regNum = `PPDB-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    let newId = `ppdb-${Date.now()}`;

    try {
      const res = await api.submitPPDB(applicant);
      if (res && res.registrationNumber) {
        regNum = res.registrationNumber;
        newId = String(res.id);
      }
    } catch (err) {
      console.error('Submit to Hostinger DB failed, saving locally:', err);
    }

    const list = AppStore.getPPDBApplicants();
    const newApplicant: PPDBApplicant = {
      ...applicant,
      id: newId,
      registrationNumber: regNum,
      status: 'Menunggu Verifikasi',
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    const updated = [newApplicant, ...list];
    localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.PPDB);
    return newApplicant;
  },
  updatePPDBStatusRemote: async (id: string, status: PPDBApplicant['status'], notes?: string) => {
    try {
      await api.updatePPDBStatus(id, status, notes);
    } catch (err) {
      console.error('Remote update status failed:', err);
    }
    const current = AppStore.getPPDBApplicants();
    const updated = current.map(item => item.id === id ? { ...item, status, notes: notes ?? item.notes } : item);
    localStorage.setItem(STORAGE_KEYS.PPDB, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.PPDB);
  },

  // PPDB SETTINGS
  getPPDBSettings: (): PPDBSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PPDB_SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_PPDB_SETTINGS;
    } catch {
      return DEFAULT_PPDB_SETTINGS;
    }
  },
  savePPDBSettings: (settings: PPDBSettings) => {
    localStorage.setItem(STORAGE_KEYS.PPDB_SETTINGS, JSON.stringify(settings));
    dispatchStoreUpdate(STORAGE_KEYS.PPDB_SETTINGS);
  },

  // Reset to default data
  resetAll: () => {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    dispatchStoreUpdate('all');
  }
};
