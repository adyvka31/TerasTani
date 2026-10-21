/**
 * Dashboard Tab 6: Quests & Kelurahan Community Leaderboard
 */
import { Award } from 'lucide-react';

export default function GamificationTab({
  user,
  userXP,
  missions = [],
  claimedQuests = [],
  onClaimQuest,
  leaderboard = [],
  isLoading = false,
}) {
  const displayMissions = missions;

  const medals = ['🥇', '🥈', '🥉'];
  const displayLeaderboard = leaderboard.map((row, idx) => {
    const isSelf = user && (row.id === user.id || row.email === user.email);
    const xpVal = row.xp_points !== undefined ? Number(row.xp_points) : (row.xp || 0);
    const kgVal = row.total_harvest_kg !== undefined ? `${parseFloat(row.total_harvest_kg).toFixed(1)} kg` : (row.kg || '0.0 kg');
    return {
      ...row,
      rank: idx + 1,
      medal: medals[idx] || `#${idx + 1}`,
      isSelf,
      nameDisplay: isSelf ? `${row.name} (Anda)` : row.name,
      xpDisplay: `${xpVal.toLocaleString('id-ID')} XP`,
      kgDisplay: kgVal,
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
            <Award className="w-3.5 h-3.5" />
            <span>Ekosistem Insentif Partisipatif RW</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Misi Budidaya & <span className="font-editorial-italic text-ochre-400">Peringkat Komunal</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
            Setiap setoran panen berkualitas dan pencatatan presisi menghasilkan Poin XP yang dapat ditukarkan dengan bibit unggul impor, nutrisi gratis dari dinas terkait, serta voucher diskon peralatan irigasi.
          </p>
        </div>
      </div>

      {/* Quests & Leaderboard Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Active Quests */}
        <div className="lg:col-span-6 bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
          <div className="pb-3 border-b-2 border-ink/10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase font-bold text-ink">
              Misi Harian & Mingguan
            </span>
            <span className="font-mono text-xs text-ochre-600 font-bold">Total XP: {userXP}</span>
          </div>

          <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-[460px] pr-1.5 scrollbar-thin">
            {isLoading ? (
              <div className="py-14 text-center text-graphite flex flex-col items-center justify-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-moss-700 animate-ping"></span>
                <span className="text-ink font-bold">Sinkronisasi Misi & Tantangan...</span>
                <span className="text-[11px] text-graphite">Memuat daftar tugas budidaya dari database</span>
              </div>
            ) : displayMissions.length === 0 ? (
              <div className="p-8 text-center text-graphite font-mono text-xs bg-ivory rounded-2xl border-2 border-dashed border-ink/20">
                Belum ada misi budidaya yang tersedia saat ini.
              </div>
            ) : (
              displayMissions.map((q) => {
                const isClaimed = claimedQuests.includes(q.id) || q.is_completed;
                const xpVal = q.reward_xp || q.xp || 50;
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-ivory border-2 border-ink/20 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            q.category === 'weekly' 
                              ? 'bg-moss-100 text-moss-800 border-moss-300' 
                              : 'bg-leaf-100 text-leaf-800 border-leaf-300'
                          }`}>
                            {q.category === 'weekly' ? 'Misi Mingguan' : 'Misi Harian'}
                          </span>
                          <span className="font-bold text-ink text-sm">{q.title}</span>
                        </div>
                        <span className="font-bold text-ochre-700 bg-ochre-100 px-2 py-0.5 rounded border border-ochre-300 text-[10px] shrink-0">
                          +{xpVal} XP
                        </span>
                      </div>
                      <p className="font-sans text-xs text-graphite leading-relaxed">{q.description || q.desc}</p>
                    </div>

                    <button
                      type="button"
                      disabled={isClaimed}
                      onClick={() => onClaimQuest(q.id, xpVal)}
                      className={`py-2 px-4 rounded-xl border-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer ${
                        isClaimed
                          ? 'bg-leaf-200 text-leaf-800 border-leaf-400 opacity-80 cursor-default'
                          : 'bg-ochre-400 text-ink border-ink hover:bg-ochre-300 shadow-[2px_2px_0px_0px_#171715]'
                      }`}
                    >
                      {isClaimed ? '✓ Hadiah XP Sudah Diklaim' : `Selesaikan & Klaim +${xpVal} XP`}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Leaderboard Kelurahan */}
        <div className="lg:col-span-6 bg-ivory border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
          <div className="pb-3 border-b-2 border-ink/10 flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-ink uppercase">Papan Peringkat Rawasari (Bulan Ini)</span>
            <span className="text-graphite">14 Klaster</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs overflow-y-auto max-h-[460px] pr-1.5 scrollbar-thin">
            {isLoading ? (
              <div className="py-14 text-center text-graphite flex flex-col items-center justify-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-ochre-600 animate-ping"></span>
                <span className="text-ink font-bold">Menghitung Papan Peringkat...</span>
                <span className="text-[11px] text-graphite">Sinkronisasi bobot panen & XP komunitas RW</span>
              </div>
            ) : displayLeaderboard.length === 0 ? (
              <div className="p-8 text-center text-graphite font-mono text-xs bg-white rounded-2xl border-2 border-dashed border-ink/20">
                Belum ada data peringkat klaster komunitas.
              </div>
            ) : (
              displayLeaderboard.map((row, idx) => (
                <div 
                  key={row.rank || row.id || idx} 
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between ${
                    row.isSelf || (user && row.id === user.id)
                      ? 'bg-ochre-400/30 border-ochre-600 font-bold' 
                      : 'bg-white border-ink/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-graphite w-6 text-center">
                      {row.medal || `#${row.rank || idx + 1}`}
                    </span>
                    <div>
                      <span className="text-ink text-xs block">{row.nameDisplay || row.name}</span>
                      <span className="text-graphite text-[10px] block">
                        Panen: {row.kgDisplay || `${row.total_harvest_kg || 0} kg`}
                      </span>
                    </div>
                  </div>

                  <span className="text-ochre-700 font-bold bg-white px-2.5 py-1 rounded border border-ink/15 text-xs">
                    {row.xpDisplay || `${row.xp_points || 0} XP`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
