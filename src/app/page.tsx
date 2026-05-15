'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, FlaskConical, ShoppingBag, LayoutDashboard, 
  Clock, Calendar, Sparkles, ChevronRight, GraduationCap, Store, FlaskRound 
} from 'lucide-react';
import EdukasiMenu from '@/components/edukasi/EdukasiMenu';
import FormulaMenu from '@/components/formula/FormulaMenu';
import JualanMenu from '@/components/jualan/JualanMenu';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<'overview' | 'edukasi' | 'formula' | 'jualan'>('overview');
  const [time, setTime] = useState({ masehi: '', hijriah: '', jam: '' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // 1. Format Jam
      const jam = now.toLocaleTimeString('id-ID', { hour12: false }).replace(/:/g, '.');
      
      // 2. Format Masehi
      const hariID = now.toLocaleDateString('id-ID', { weekday: 'long' });
      const hariCustom = hariID === 'Minggu' ? 'Ahad' : hariID;
      const masehi = `${hariCustom}, ${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;
      
      // 3. Logika Hijriah Presisi (Patokan: 19 April 2026)
      const tglPatokan = new Date('2026-04-19').setHours(0,0,0,0);
      const tglSekarang = new Date(now).setHours(0,0,0,0);
      const selisihHari = Math.floor((tglSekarang - tglPatokan) / 86400000);
      const tglHijriah = 1 + selisihHari + (now.getHours() >= 18 ? 1 : 0);
      const hijriah = `${tglHijriah} Dzulqa'dah 1447 H`;

      setTime({ masehi, hijriah, jam });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'overview', name: 'Ringkasan', icon: LayoutDashboard, color: 'bg-slate-900', light: 'bg-slate-100', text: 'text-slate-600' },
    { id: 'edukasi', name: 'Edukasi (LMS)', icon: GraduationCap, color: 'bg-emerald-600', light: 'bg-emerald-100', text: 'text-emerald-600' },
    { id: 'formula', name: 'Formula Architect', icon: FlaskRound, color: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-600' },
    { id: 'jualan', name: 'Jualan & Stok', icon: Store, color: 'bg-blue-600', light: 'bg-blue-100', text: 'text-blue-600' },
  ];

  return (
    <div className="flex h-screen bg-[#F0F9FF] text-slate-800 antialiased font-sans">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-72 bg-slate-900 text-slate-200 flex-col justify-between border-r border-slate-800">
        <div>
          <div className="p-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-500/20">
                <FlaskConical size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter text-white">PARFUM-CRAFT</h1>
                <p className="text-[0.6rem] text-slate-500 font-bold tracking-widest uppercase">Lab Digital v1.0</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as any)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800">
           <div className="bg-slate-800/50 p-4 rounded-2xl text-[0.65rem] text-slate-400 font-medium">
             ALIF REZKY © 2026
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* TOPBAR / NAVBAR (Mobile & Desktop) */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="lg:hidden bg-amber-500 p-2 rounded-lg">
              <FlaskConical size={18} color="white" />
            </div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              {activeMenu === 'overview' ? 'Dashboard' : activeMenu}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-tighter">Angkatan 8</p>
              <p className="text-xs font-bold text-amber-600">Premium Member</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-white shadow-sm flex items-center justify-center font-black text-amber-800">
              AR
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 max-w-[1200px] w-full mx-auto">
          
          {/* KONSEP JAM & HIJRIAH (Gaya kakalif.my.id) */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 bg-white p-5 rounded-[25px] border border-slate-200 text-center shadow-sm">
              <div className="text-[0.55rem] font-black text-slate-400 mb-1 tracking-widest flex items-center justify-center gap-1 uppercase">
                <Clock size={10} /> Waktu Lab
              </div>
              <div className="text-xl font-black text-slate-800 tracking-tighter">{time.jam}</div>
            </div>
            <div className="flex-1 bg-white p-5 rounded-[25px] border border-slate-200 text-center shadow-sm">
              <div className="text-[0.55rem] font-black text-slate-400 mb-1 tracking-widest flex items-center justify-center gap-1 uppercase">
                <Calendar size={10} /> Kalender
              </div>
              <div className="text-[0.85rem] font-black text-emerald-600 tracking-tight">{time.hijriah}</div>
            </div>
          </div>

          {activeMenu === 'overview' && (
            <div className="space-y-8">
              {/* HERO CARD */}
              <div className="bg-slate-900 rounded-[35px] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                  <FlaskConical size={250} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-amber-400" />
                    <span className="text-amber-400 font-black text-[0.65rem] tracking-[0.3em] uppercase">Ready to Craft</span>
                  </div>
                  <h3 className="text-3xl font-black italic leading-tight mb-4 max-w-md">
                    Siap meracik mahakarya parfum hari ini?
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mb-8 max-w-sm">
                    {time.masehi}. Akses modul eksklusif Angkatan 8 atau pantau formula rahasia Anda.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                      <div className="text-[0.6rem] font-black text-slate-400 mb-1 uppercase tracking-widest">Active Recipe</div>
                      <div className="text-2xl font-black">12</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                      <div className="text-[0.6rem] font-black text-slate-400 mb-1 uppercase tracking-widest">LMS Progress</div>
                      <div className="text-2xl font-black text-amber-400">85%</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                      <div className="text-[0.6rem] font-black text-slate-400 mb-1 uppercase tracking-widest">Materials</div>
                      <div className="text-2xl font-black">642</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* MENU NAVIGATION CARDS (Mobile-style but on Dashboard) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.filter(i => i.id !== 'overview').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id as any)}
                    className="bg-white p-6 rounded-[30px] border border-slate-200 flex flex-col items-start text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                  >
                    <div className={`${item.light} ${item.text} p-4 rounded-2xl mb-4`}>
                      <item.icon size={28} />
                    </div>
                    <div className="font-black text-slate-800 text-lg mb-1">{item.name}</div>
                    <div className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      Akses Modul <ChevronRight size={12} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            {activeMenu === 'edukasi' && <EdukasiMenu />}
            {activeMenu === 'formula' && <FormulaMenu />}
            {activeMenu === 'jualan' && <JualanMenu />}
          </div>
        </div>
      </main>

    </div>
  );
}
