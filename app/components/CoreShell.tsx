'use client';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';
import { Search, BriefcaseBusiness, Megaphone, Users, LogOut, House } from 'lucide-react';
import { api, ApiError, message, User } from '../lib/core';

export function Brand(){return <span className="core-brand">PORTAL<br/>CONTÁBIL<small>— GRUPO BORTONE —</small></span>;}
export default function CoreShell({children,admin=false}:{children:React.ReactNode;admin?:boolean}){
 const [user,setUser]=useState<User|null>(null),[error,setError]=useState('');const router=useRouter(),path=usePathname();
 useEffect(()=>{let live=true;api<User>('auth/me').then(u=>{if(live)setUser(u)}).catch(e=>{if(!live)return;if(e instanceof ApiError&&e.status===401)router.replace('/login');else setError(message(e));});return()=>{live=false}},[router]);
 async function logout(){try{await api('auth/logout',{method:'POST'});router.replace('/login');router.refresh();}catch(e){setError(message(e));}}
 if(error&&!user)return <main className="core-empty"><p role="alert">{error}</p><button onClick={()=>location.reload()}>Tentar novamente</button></main>;
 if(!user)return <main className="core-empty" role="status">Carregando seu perfil…</main>;
 if(admin&&user.nivel!=='administrador')return <main className="core-empty"><h1>Acesso restrito</h1><p>Esta área é exclusiva para administradores.</p><Link href="/minha-conta">Voltar à minha conta</Link></main>;
 const links=user.nivel==='administrador'?[['/admin/servicos','Serviços',BriefcaseBusiness],['/admin/publicidade','Publicidade',Megaphone],['/admin/usuarios','Usuários',Users],['/busca','Busca',Search]] as const:[['/minha-conta','Minha conta',House],['/busca','Busca',Search],['/servicos','Serviços',BriefcaseBusiness]] as const;
 return <div className="core-shell"><aside className="core-sidebar"><Link href="/" aria-label="Portal Contábil"><Brand/></Link><nav>{links.map(([href,label,Icon])=><Link key={href} href={href} aria-current={path.startsWith(href)?'page':undefined}><Icon size={18}/>{label}</Link>)}</nav><div className="core-sidebar-bottom"><Link href="/">Voltar ao site</Link><button onClick={logout}><LogOut size={16}/>Sair</button><small>{user.nome}<br/>{user.nivel==='administrador'?'Administrador':'Cliente'}</small></div></aside><div className="core-workspace"><header className="core-topbar"><strong>Olá, {user.nome.split(' ')[0]}</strong><span>Portal Contábil</span><Link href="/busca"><Search size={17}/> Buscar</Link></header>{error&&<p role="alert" className="core-alert">{error}</p>}<main className="core-content">{children}</main></div></div>
}
