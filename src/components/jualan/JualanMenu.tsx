'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, Search, Tag } from 'lucide-react'

export default function JualanMenu() {
  // Memberitahu TypeScript bahwa materials adalah array of objects (any)
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchMaterials() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('materials')
          .select('id, name, type, note_position, price_per_gram_idr')
          .order('name', { ascending: true })

        if (error) {
          console.error('Gagal ambil data:', error)
        } else {
          // Kita gunakan type casting 'as any[]' agar TS tenang
          setMaterials((data as any[]) || [])
        }
      } catch (err) {
        console.error('System error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [])
  
  // ... sisa kode return Anda di bawah tetap sama

  // Fungsi Filter Pencarian
  const filteredMaterials = materials.filter((m: any) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Inventori Bahan Baku</h3>
          <p className="text-[0.65rem] font-bold text-slate-400">TOTAL: {materials.length} ITEMS TERDAFTAR</p>
        </div>
        
        {/* Bar Pencarian */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Cari bahan..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 py-10 text-center font-bold text-slate-400 animate-pulse">
            Membuka Lab... Mohon Tunggu
          </div>
        ) : (
          filteredMaterials.map((m: any) => (
            <div key={m.id} className="bg-white p-5 rounded-[25px] border border-slate-200 shadow-sm flex justify-between items-center hover:border-amber-500 transition-colors group">
              <div>
                <div className="text-[0.6rem] font-black text-amber-600 uppercase tracking-widest">{m.note_position || 'HEART'}</div>
                <div className="font-black text-slate-800 italic">"{m.name}"</div>
                <div className="text-[0.6rem] text-slate-400 font-bold mt-1 uppercase">{m.type}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-emerald-600">
                  Rp {m.price_per_gram_idr?.toLocaleString('id-ID')}
                </div>
                <div className="text-[0.5rem] font-bold text-slate-400 uppercase">Per Gram</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
