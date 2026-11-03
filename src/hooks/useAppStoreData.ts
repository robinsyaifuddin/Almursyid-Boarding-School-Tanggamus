import { useState, useEffect } from 'react';
import { AppStore, PPDBApplicant, PPDBSettings } from '../services/appStore';
import { GalleryItem } from '../data/siteData';

export function useAppStoreData() {
  const [siteInfo, setSiteInfo] = useState(AppStore.getSiteInfo());
  const [news, setNews] = useState(AppStore.getNews());
  const [gallery, setGallery] = useState<GalleryItem[]>(AppStore.getGallery());
  const [programs, setPrograms] = useState(AppStore.getPrograms());
  const [facilities, setFacilities] = useState(AppStore.getFacilities());
  const [ppdbApplicants, setPPDBApplicants] = useState<PPDBApplicant[]>(AppStore.getPPDBApplicants());
  const [ppdbSettings, setPPDBSettings] = useState<PPDBSettings>(AppStore.getPPDBSettings());

  const reloadAll = () => {
    setSiteInfo(AppStore.getSiteInfo());
    setNews(AppStore.getNews());
    setGallery(AppStore.getGallery());
    setPrograms(AppStore.getPrograms());
    setFacilities(AppStore.getFacilities());
    setPPDBApplicants(AppStore.getPPDBApplicants());
    setPPDBSettings(AppStore.getPPDBSettings());
  };

  useEffect(() => {
    // 1. Initial background sync dari database Hostinger (Stale-While-Revalidate)
    AppStore.syncNewsFromApi();
    AppStore.syncGalleryFromApi();
    AppStore.syncPPDBFromApi();

    // 2. Event listener sinkronisasi antar tab/komponen
    const handleUpdate = () => {
      reloadAll();
    };

    window.addEventListener('almursyid_store_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // 3. Smart Realtime polling interval (setiap 12 detik cek data terbaru dari database)
    const interval = setInterval(() => {
      AppStore.syncNewsFromApi();
      AppStore.syncGalleryFromApi();
      AppStore.syncPPDBFromApi();
    }, 12000);

    return () => {
      window.removeEventListener('almursyid_store_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      clearInterval(interval);
    };
  }, []);

  return {
    siteInfo,
    news,
    gallery,
    programs,
    facilities,
    ppdbApplicants,
    ppdbSettings,
    reloadAll
  };
}
