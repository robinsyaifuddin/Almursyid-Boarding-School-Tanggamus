import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramPage } from './pages/ProgramPage';
import { FacilityPage } from './pages/FacilityPage';
import { GalleryPage } from './pages/GalleryPage';
import { PPDBPage } from './pages/PPDBPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-emerald-700 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tentang-kami" element={<AboutPage />} />
            <Route path="/program" element={<ProgramPage />} />
            <Route path="/fasilitas" element={<FacilityPage />} />
            <Route path="/galeri" element={<GalleryPage />} />
            <Route path="/ppdb" element={<PPDBPage />} />
            <Route path="/berita" element={<NewsPage />} />
            <Route path="/berita/:slug" element={<NewsDetailPage />} />
            <Route path="/kontak" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
