import { useState } from 'react';
import { ArrowUpRight, Eye, EyeOff, KeyRound, MapPinned, ShieldCheck } from 'lucide-react';
import { activateAccount, apiOrigin, login, restoreAdminSession, sendPasswordReset, setNewPassword } from '@/apps/cms/lib/api';

type Mode = 'login' | 'activate' | 'reset' | 'setpw';
const COPY: Record<Mode, { title: string; sub: string; button: string }> = {
  login: { title: 'Selamat datang', sub: 'Masuk untuk melanjutkan pekerjaan konten.', button: 'Masuk ke dashboard' },
  activate: { title: 'Aktifkan akun', sub: 'Pertama kali di sistem baru? Masukkan email petugas dan buat password baru. Kami kirim tautan verifikasi ke email itu.', button: 'Kirim tautan verifikasi' },
  reset: { title: 'Lupa password', sub: 'Masukkan email petugas. Kami kirim tautan untuk membuat password baru.', button: 'Kirim tautan' },
  setpw: { title: 'Buat password baru', sub: 'Email sudah terverifikasi. Tulis password baru untuk akun ini.', button: 'Simpan password' },
};

export default function LoginPage({onLogin,initialMode='login'}:{onLogin:(token:string)=>void;initialMode?:Mode}) {
  const [mode,setMode]=useState<Mode>(initialMode);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [visible,setVisible]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');
  const copy=COPY[mode];
  function switchMode(m:Mode){setMode(m);setError('');setNotice('');setPassword('');}
  async function submit(e:React.FormEvent){e.preventDefault();setError('');setNotice('');setBusy(true);try{
    if(mode==='login'){onLogin(await login(username,password));return;}
    if(mode==='activate'){if(password.length<8)throw new Error('Password minimal 8 karakter.');await activateAccount(username,password);setNotice('Tautan verifikasi sudah dikirim. Buka email Anda, klik tautannya, lalu masuk dengan password baru.');return;}
    if(mode==='reset'){await sendPasswordReset(username);setNotice('Jika email terdaftar, tautan untuk membuat password baru sudah dikirim.');return;}
    if(password.length<8)throw new Error('Password minimal 8 karakter.');
    await setNewPassword(password);
    window.history.replaceState(null,'','/cms/');
    const token=await restoreAdminSession();
    if(token)onLogin(token);else{setNotice('Password tersimpan, tetapi akun ini belum memiliki akses admin CMS.');}
  }catch(e){setError(e instanceof Error?e.message:'Layanan masuk tidak tersedia.');}finally{setBusy(false);}}
  const configured=Boolean(apiOrigin());
  return <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#f3eee5] px-4 py-8">
    <div className="absolute -right-24 -top-24 h-[440px] w-[440px] rounded-full border border-[#dfd0bb]/70"/><div className="absolute -right-8 -top-8 h-[310px] w-[310px] rounded-full border border-[#dfd0bb]/60"/><div className="absolute bottom-[-160px] left-[-100px] h-[380px] w-[380px] rounded-full border border-[#dfd0bb]/70"/>
    <div className="relative grid w-full max-w-[1000px] overflow-hidden rounded-[24px] border border-[#e5dacb] bg-[#fffdf9] shadow-[0_28px_90px_rgba(74,52,31,.12)] md:grid-cols-[1.04fr_.96fr]">
      <section className="relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-[#3a2e25] p-7 text-[#fffaf3] sm:p-10 md:min-h-[610px]">
        <div className="absolute right-[-70px] top-[-85px] h-[360px] w-[360px] rounded-full border border-[#c1a273]/25"/><div className="absolute right-[-15px] top-[-28px] h-[250px] w-[250px] rounded-full border border-[#c1a273]/20"/><div className="absolute bottom-14 right-8 h-[165px] w-[165px] rounded-full bg-[#756344]/20 blur-2xl"/>
        <div className="relative flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f2e5d2] text-[#70452b]"><img src={`${"/cms/"}Assets/Logo/nempo-new.webp`} alt="Nempo Organizer" className="h-8 w-8 object-contain" onError={e=>{e.currentTarget.style.display='none';}}/><span className="absolute text-sm font-bold">N</span></div><div><p className="text-sm font-bold tracking-tight">NEMPO ORGANIZER</p><p className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#c6b8a4]">Admin CMS Garut</p></div></div>
        <div className="relative mt-10 md:mt-0"><div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.24em] text-[#d6bb8f]"><MapPinned size={13}/> Garut, Jawa Barat</div><h1 className="max-w-md text-4xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-5xl">Ruang kerja yang menjaga Garut tetap <span className="font-normal italic text-[#d8bd92]">terhubung.</span></h1><p className="mt-5 max-w-sm text-sm leading-6 text-[#d2c6b9]">Kelola informasi destinasi, layanan lokal, agenda, dan berita dengan tenang dan akurat.</p></div>
        <div className="relative mt-10 flex items-center gap-2 text-[10px] tracking-wide text-[#b6a894] md:mt-0"><ShieldCheck size={14} className="text-[#d8bd92]"/> Akses khusus petugas Nempo Organizer</div>
      </section>
      <section className="flex flex-col justify-center px-6 py-9 sm:px-10 md:px-12">
        <div className="mb-8"><div className="mb-2 font-mono text-[10px] font-bold tracking-[.2em] text-[#9c7954]">PORTAL PETUGAS / 01</div><h2 className="text-2xl font-bold tracking-[-.04em] text-[#382d23]">{copy.title}</h2><p className="mt-1.5 text-sm text-[#8b7d6c]">{copy.sub}</p></div>
        
        <form onSubmit={submit} className="space-y-4">
          {mode!=='setpw'&&<label className="block"><span className="mb-1.5 block text-[11px] font-bold text-[#625343]">Email</span><input type="email" autoComplete="email" value={username} onChange={e=>setUsername(e.target.value)} required placeholder="email@contoh.com" className="h-11 w-full rounded-lg border border-[#e6dccf] bg-[#fcfaf6] px-3.5 text-sm text-[#3e3328] outline-none transition focus:border-[#a9845b] focus:ring-2 focus:ring-[#a9845b]/15"/></label>}
          {mode!=='reset'&&<label className="block"><span className="mb-1.5 block text-[11px] font-bold text-[#625343]">{mode==='login'?'Password':'Password baru'}</span><span className="relative block"><input autoComplete={mode==='login'?'current-password':'new-password'} minLength={mode==='login'?undefined:8} type={visible?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Masukkan password" className="h-11 w-full rounded-lg border border-[#e6dccf] bg-[#fcfaf6] px-3.5 pr-11 text-sm text-[#3e3328] outline-none transition focus:border-[#a9845b] focus:ring-2 focus:ring-[#a9845b]/15"/><button type="button" onClick={()=>setVisible(v=>!v)} aria-label={visible?'Sembunyikan password':'Tampilkan password'} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-[#9b8b78] hover:text-[#604a36]">{visible?<EyeOff size={16}/>:<Eye size={16}/>}</button></span></label>}
          {error&&<div className="rounded-lg border border-[#ead4c8] bg-[#fcf2ed] px-3 py-2.5 text-xs leading-5 text-[#8f4d3b]">{error}</div>}
          {notice&&<div role="status" className="rounded-lg border border-[#d6e2cf] bg-[#f2f7ee] px-3 py-2.5 text-xs leading-5 text-[#4c6a44]">{notice}</div>}
          <button disabled={busy||!configured} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#805538] text-xs font-bold text-white shadow-sm transition hover:bg-[#67432d] disabled:cursor-not-allowed disabled:opacity-50">{busy?<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"/>:<KeyRound size={15}/>}{copy.button}<ArrowUpRight size={14}/></button>
        </form>
        {mode!=='setpw'&&<div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-[#805538]">
          {mode!=='login'&&<button type="button" onClick={()=>switchMode('login')} className="hover:underline">Kembali ke masuk</button>}
          {mode!=='activate'&&<button type="button" onClick={()=>switchMode('activate')} className="hover:underline">Aktifkan akun</button>}
          {mode!=='reset'&&<button type="button" onClick={()=>switchMode('reset')} className="hover:underline">Lupa password</button>}
        </div>}
        <p className="mt-7 border-t border-[#eee6db] pt-5 text-center text-[10px] text-[#a19383]">Nempo Organizer · Sistem pengelolaan konten Garut</p>
      </section>
    </div>
  </main>;
}
