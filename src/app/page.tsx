'use client';

import { useState } from 'react';
import { BookOpen, FlaskConical, ShoppingBag, LayoutDashboard, Menu } from 'lucide-react';
import EdukasiMenu from '@/components/edukasi/EdukasiMenu';
import FormulaMenu from '@/components/formula/FormulaMenu';
import JualanMenu from '@/components/jualan/JualanMenu';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<'overview' | 'edukasi' | 'formula' | 'jualan'>('overview');

  const menuItems = [
    { id: 'overview', name: 'Ringkasan', icon: LayoutDashboard },
    { id: 'edukasi', name: 'Edukasi (LMS)', icon: BookOpen },
    { id: 'formula', name: 'Formula Architect', icon: FlaskConical },
    { id: 'jualan', name: 'Jualan & Stok', icon: ShoppingBag },
  ];

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-slate-800 antialiased font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold tracking-wider text-amber-400">PARFUM-CRAFT</h1>
            <p className="text-xs text-slate-400 mt-1">SaaS Edukasi & Formulasi</p>
          </div>
          
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/10' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          v1.0.0 — Dev Mode
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {activeMenu === 'overview' ? 'Selamat Datang di Lab Digital' : activeMenu}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Premium Member</p>
              <p className="text-xs text-amber-600 font-semibold">Angkatan 8</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-800">
              U
            </div>
          </div>
        </header>

        {/* CONTAINER DINAMIS */}
        <div className="p-8 max-w-7xl w-full mx-auto">
          {activeMenu === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-bold text-amber-400">Halo Perfumer!</h3>
                <p className="text-slate-300 mt-2 max-w-xl">
                  Siap meracik mahakarya hari ini? Akses formula rahasia Anda, pelajari modul eksklusif, atau pantau pergerakan harga bahan baku dari dasbor ini.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-medium text-slate-500">Total Formula Aktif</h4>
                  <p className="text-3xl font-bold mt-2 text-slate-900">12 Recipe</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-medium text-slate-500">Progress Kelas LMS</h4>
                  <p className="text-3xl font-bold mt-2 text-slate-900">Fase Olfaktori (85%)</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-medium text-slate-500">Bahan Baku Terdaftar</h4>
                  <p className="text-3xl font-bold mt-2 text-slate-900">642 Items</p>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'edukasi' && <EdukasiMenu />}
          {activeMenu === 'formula' && <FormulaMenu />}
          {activeMenu === 'jualan' && <JualanMenu />}
        </div>
      </main>

    </div>
  );
} 
