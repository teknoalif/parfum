'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Search } from 'lucide-react'

export default function JualanMenu() {
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchMaterials() {
      setLoading(true)
      try {
        // SESUAIKAN KOLOM: id, name, type, note_position, price_per_gram_idr
        const { data, error } = await supabase
          .from('materials')
          .select('id, name, type, note_position, price_per_gram_idr')
          .order('name', { ascending: true })

        if (error) {
          console.error('Supabase Error:', error.message)
        } else {
          console.log('Data Berhasil Diambil:', data?.length, 'items')
          setMaterials((data as any[]) || [])
        }
      } catch (err) {
        console.error('System Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  // Fungsi Filter Pencarian
  const filteredMaterials = materials.filter((m: any) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Inventori Bahan Baku</h3>
          <p className="text-[0.65rem] font-bold text-slate-400">
            {loading ? 'MENGECEK DATABASE...' : `TOTAL: ${materials.length} ITEMS TERDAFTAR`}
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Cari bahan (Musk, Iso E, dll)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* GRID DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 py-20 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-black text-slate-400 text-xs uppercase tracking-widest animate-pulse">Membuka Lab Digital...</p>
          </div>
        ) : filteredMaterials.length > 0 ? (
          filteredMaterials.map((m: any) => (
            <div key={m.id} className="bg-white p-5 rounded-[25px] border border-slate-200 shadow-sm flex justify-between items-center hover:border-amber-500 transition-all group active:scale-95">
              <div>
                <div className="text-[0.55rem] font-black text-amber-600 uppercase tracking-[0.2em] mb-1">
                  {m.note_position || 'UNSET'}
                </div>
                <div className="font-black text-slate-800 italic text-sm">"{m.name}"</div>
                <div className="text-[0.6rem] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                  {m.type} • ID: {m.id}
                </div>
              </div>
              <div className="text-right border-l border-slate-100 pl-4">
                <div className="text-[0.5rem] font-black text-slate-400 uppercase mb-1">Harga Estimasi</div>
                <div className="text-sm font-black text-emerald-600 tracking-tighter">
                  Rp {m.price_per_gram_idr ? Math.round(m.price_per_gram_idr).toLocaleString('id-ID') : '0'}
                </div>
                <div className="text-[0.5rem] font-bold text-slate-300 uppercase">/ Gram</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-20 text-center bg-slate-50 rounded-[35px] border border-dashed border-slate-200">
             <p className="font-bold text-slate-400 text-xs">Bahan tidak ditemukan atau database kosong.</p>
          </div>
        )}
      </div>
    </div>
  )
}
