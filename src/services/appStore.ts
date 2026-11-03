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
  // SITE INFO & PENGURUS
  getSiteInfo: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SITE_INFO);
      return data ? JSON.parse(data) : DEFAULT_SITE_INFO;
    } catch {
      return DEFAULT_SITE_INFO;
    }
  },
  syncSiteInfoFromApi: async (): Promise<typeof DEFAULT_SITE_INFO> => {
    try {
      const remoteInfo = await api.getSetting('site_info');
      if (remoteInfo && typeof remoteInfo === 'object') {
        localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(remoteInfo));
        dispatchStoreUpdate(STORAGE_KEYS.SITE_INFO);
        return remoteInfo;
      }
    } catch (e) {
      console.warn('Fallback local siteInfo:', e);
    }
    return AppStore.getSiteInfo();
  },
  saveSiteInfo: async (info: typeof DEFAULT_SITE_INFO) => {
    localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(info));
    dispatchStoreUpdate(STORAGE_KEYS.SITE_INFO);
    try {
      await api.saveSetting('site_info', info);
    } catch (err) {
      console.error('Remote save site_info failed:', err);
    }
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
        // Normalisasi struktur agar sesuai dengan yang diharapkan komponen frontend
        const normalized = remoteNews.map(item => ({
          id: String(item.id),
          title: item.title,
          slug: item.slug,
          category: item.category,
          subCategory: item.subCategory || 'Umum',
          summary: item.excerpt || item.summary || item.content || '',
          content: item.content || item.summary || item.excerpt || '',
          image: item.imageUrl || item.image_url || item.image || '',
          date: item.date || item.published_at || 'Baru saja',
          timeAgo: item.timeAgo || 'Baru saja',
          isFeatured: Boolean(item.isFeatured)
        }));
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(normalized));
        dispatchStoreUpdate(STORAGE_KEYS.NEWS);
        return normalized;
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
  createNewsRemote: async (item: any) => {
    const tempId = `berita-${Date.now()}`;
    const newItem = { ...item, id: tempId };
    const current = AppStore.getNews();
    const optimistic = [newItem, ...current];
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(optimistic));
    dispatchStoreUpdate(STORAGE_KEYS.NEWS);

    try {
      const res = await api.createNews({
        title: item.title,
        category: item.category,
        excerpt: item.summary || item.excerpt || '',
        content: item.content || item.summary || '',
        imageUrl: item.image || item.imageUrl || '',
        author: item.author || 'Humas Pesantren',
        date: item.date || 'Baru saja'
      });
      if (res && res.id) {
        await AppStore.syncNewsFromApi();
      }
    } catch (err) {
      console.error('Remote create news failed:', err);
    }
  },
  updateNewsRemote: async (id: string | number, item: any) => {
    const current = AppStore.getNews();
    const updated = current.map(n => String(n.id) === String(id) ? { ...n, ...item } : n);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.NEWS);

    try {
      await api.createNews({
        id: isNaN(Number(id)) ? undefined : Number(id),
        title: item.title,
        category: item.category,
        excerpt: item.summary || item.excerpt || '',
        content: item.content || item.summary || '',
        imageUrl: item.image || item.imageUrl || '',
        author: item.author || 'Humas Pesantren',
        date: item.date || 'Baru saja'
      });
      await AppStore.syncNewsFromApi();
    } catch (err) {
      console.error('Remote update news failed:', err);
    }
  },
  deleteNewsRemote: async (id: string | number) => {
    const current = AppStore.getNews();
    const updated = current.filter(item => String(item.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.NEWS);

    try {
      await api.deleteNews(id);
      await AppStore.syncNewsFromApi();
    } catch (err) {
      console.error('Remote delete news error:', err);
    }
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
        const normalized: GalleryItem[] = remoteGallery.map(item => ({
          id: String(item.id),
          title: item.title,
          category: item.category || 'Tahfidz & Ibadah',
          image: item.imageUrl || item.image_url || item.image || '',
          date: item.date || 'Terbaru',
          location: 'Pondok Pesantren Al-Mursyid',
          desc: item.desc || ''
        }));
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(normalized));
        dispatchStoreUpdate(STORAGE_KEYS.GALLERY);
        return normalized;
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
  createGalleryRemote: async (item: { title: string; category?: string; image: string }) => {
    const tempId = `gal-${Date.now()}`;
    const newItem: GalleryItem = {
      id: tempId,
      title: item.title,
      category: (item.category as any) || 'Tahfidz & Ibadah',
      image: item.image,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      location: 'Pondok Pesantren Al-Mursyid',
      desc: ''
    };
    const current = AppStore.getGallery();
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify([newItem, ...current]));
    dispatchStoreUpdate(STORAGE_KEYS.GALLERY);

    try {
      await api.createGalleryItem({
        title: item.title,
        category: item.category || 'Kegiatan',
        imageUrl: item.image
      });
      await AppStore.syncGalleryFromApi();
    } catch (err) {
      console.error('Remote gallery add error:', err);
    }
  },
  updateGalleryRemote: async (id: string | number, item: { title: string; category?: string; image: string }) => {
    const current = AppStore.getGallery();
    const updated = current.map(g => String(g.id) === String(id) ? { ...g, ...item } : g);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.GALLERY);

    try {
      await api.createGalleryItem({
        id: isNaN(Number(id)) ? undefined : Number(id),
        title: item.title,
        category: item.category || 'Kegiatan',
        imageUrl: item.image
      } as any);
      await AppStore.syncGalleryFromApi();
    } catch (err) {
      console.error('Remote gallery update error:', err);
    }
  },
  deleteGalleryRemote: async (id: string | number) => {
    const current = AppStore.getGallery();
    const updated = current.filter(item => String(item.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.GALLERY);

    try {
      await api.deleteGalleryItem(id);
      await AppStore.syncGalleryFromApi();
    } catch (err) {
      console.error('Remote gallery delete error:', err);
    }
  },

  // PROGRAM (Sync ke Backend Database Hostinger)
  getPrograms: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return data ? JSON.parse(data) : DEFAULT_PROGRAMS;
    } catch {
      return DEFAULT_PROGRAMS;
    }
  },
  syncProgramsFromApi: async (): Promise<any[]> => {
    try {
      const remotePrograms = await api.getPrograms();
      if (Array.isArray(remotePrograms) && remotePrograms.length > 0) {
        const normalized = remotePrograms.map(p => ({
          id: p.id,
          title: p.title,
          tagline: p.tagline || '',
          desc: p.description || p.desc || '',
          icon: p.icon || 'BookOpen',
          highlights: Array.isArray(p.highlights) ? p.highlights : [],
          image: p.image || ''
        }));
        localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(normalized));
        dispatchStoreUpdate(STORAGE_KEYS.PROGRAMS);
        return normalized;
      }
    } catch (e) {
      console.warn('Fallback local programs:', e);
    }
    return AppStore.getPrograms();
  },
  savePrograms: (programs: any[]) => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    dispatchStoreUpdate(STORAGE_KEYS.PROGRAMS);
  },
  saveProgramRemote: async (prog: any) => {
    const current = AppStore.getPrograms();
    const exists = current.some(p => p.id === prog.id);
    const updated = exists ? current.map(p => p.id === prog.id ? { ...p, ...prog } : p) : [...current, prog];
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.PROGRAMS);

    try {
      await api.saveProgram({
        id: prog.id,
        title: prog.title,
        tagline: prog.tagline,
        description: prog.desc || prog.description,
        icon: prog.icon || 'BookOpen',
        highlights: prog.highlights || []
      });
      await AppStore.syncProgramsFromApi();
    } catch (err) {
      console.error('Remote save program error:', err);
    }
  },
  deleteProgramRemote: async (id: string) => {
    const current = AppStore.getPrograms();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.PROGRAMS);

    try {
      await api.deleteProgram(id);
      await AppStore.syncProgramsFromApi();
    } catch (err) {
      console.error('Remote delete program error:', err);
    }
  },

  // FASILITAS (Sync ke Backend Database Hostinger)
  getFacilities: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      return data ? JSON.parse(data) : DEFAULT_FACILITIES;
    } catch {
      return DEFAULT_FACILITIES;
    }
  },
  syncFacilitiesFromApi: async (): Promise<any[]> => {
    try {
      const remoteFacilities = await api.getFacilities();
      if (Array.isArray(remoteFacilities) && remoteFacilities.length > 0) {
        const normalized = remoteFacilities.map(f => ({
          id: f.id,
          name: f.name,
          category: f.category || 'Umum',
          desc: f.description || f.desc || '',
          image: f.imageUrl || f.image_url || f.image || ''
        }));
        localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(normalized));
        dispatchStoreUpdate(STORAGE_KEYS.FACILITIES);
        return normalized;
      }
    } catch (e) {
      console.warn('Fallback local facilities:', e);
    }
    return AppStore.getFacilities();
  },
  saveFacilities: (facilities: any[]) => {
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    dispatchStoreUpdate(STORAGE_KEYS.FACILITIES);
  },
  saveFacilityRemote: async (fac: any, index?: number | null) => {
    const current = AppStore.getFacilities();
    let updated = [...current];
    if (index !== null && index !== undefined && index >= 0 && index < current.length) {
      updated[index] = { ...current[index], ...fac };
    } else {
      updated = [fac, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.FACILITIES);

    try {
      await api.saveFacility({
        id: fac.id,
        name: fac.name,
        category: fac.category,
        description: fac.desc || fac.description,
        imageUrl: fac.image || fac.imageUrl
      });
      await AppStore.syncFacilitiesFromApi();
    } catch (err) {
      console.error('Remote save facility error:', err);
    }
  },
  deleteFacilityRemote: async (indexOrId: number | string) => {
    const current = AppStore.getFacilities();
    let targetId: any = indexOrId;
    let updated = [...current];
    if (typeof indexOrId === 'number' && current[indexOrId]) {
      targetId = current[indexOrId].id || indexOrId;
      updated = current.filter((_, idx) => idx !== indexOrId);
    } else {
      updated = current.filter(f => String(f.id) !== String(indexOrId));
    }
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
    dispatchStoreUpdate(STORAGE_KEYS.FACILITIES);

    try {
      if (targetId) {
        await api.deleteFacility(targetId);
      }
      await AppStore.syncFacilitiesFromApi();
    } catch (err) {
      console.error('Remote delete facility error:', err);
    }
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

  // PPDB SETTINGS (Sync ke Database Hostinger)
  getPPDBSettings: (): PPDBSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PPDB_SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_PPDB_SETTINGS;
    } catch {
      return DEFAULT_PPDB_SETTINGS;
    }
  },
  syncPPDBSettingsFromApi: async (): Promise<PPDBSettings> => {
    try {
      const remoteSettings = await api.getSetting('ppdb_settings');
      if (remoteSettings && typeof remoteSettings === 'object' && remoteSettings.steps) {
        localStorage.setItem(STORAGE_KEYS.PPDB_SETTINGS, JSON.stringify(remoteSettings));
        dispatchStoreUpdate(STORAGE_KEYS.PPDB_SETTINGS);
        return remoteSettings;
      }
    } catch (e) {
      console.warn('Fallback local PPDB settings:', e);
    }
    return AppStore.getPPDBSettings();
  },
  savePPDBSettings: async (settings: PPDBSettings) => {
    localStorage.setItem(STORAGE_KEYS.PPDB_SETTINGS, JSON.stringify(settings));
    dispatchStoreUpdate(STORAGE_KEYS.PPDB_SETTINGS);

    try {
      await api.saveSetting('ppdb_settings', settings);
    } catch (err) {
      console.error('Remote save ppdb_settings error:', err);
    }
  },

  // Reset to default data
  resetAll: () => {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    dispatchStoreUpdate('all');
  }
};
