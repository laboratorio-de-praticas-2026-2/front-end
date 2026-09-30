'use client';
import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {api,message,User} from '../lib/core';
import {Brand} from '../components/CoreShell';
export default function Login(){
 const [error,setError]=useState(''),[busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError('');const f=new FormData(e.currentTarget);try{const {usuario}=await api<{usuario:User}>('auth/login',{method:'POST',body:JSON.stringify({email:f.get('email'),senha:f.get('senha')})});router.replace(usuario.nivel==='administrador'?'/admin/servicos':'/minha-conta');router.refresh();}catch(e){setError(message(e))}finally{setBusy(false)}}
 return <main className="core-auth"><section className="core-auth-left"><Link href="/" aria-label="Voltar ao início"><Brand/></Link><div className="core-auth-card"><h1>Login</h1><p>Acesse sua conta para continuar com nossos serviços.</p><form className="core-form" onSubmit={submit}><label>E-mail<input name="email" type="email" autoComplete="email" placeholder="Digite seu e-mail…" required maxLength={100}/></label><label>Senha<input name="senha" type="password" autoComplete="current-password" placeholder="Digite sua senha…" required/></label>{error&&<p className="core-alert" role="alert">{error}</p>}<button className="core-button" disabled={busy}>{busy?'Entrando…':'Entrar'}</button></form><div className="core-auth-links"><span>Não tem conta? <Link href="/cadastro">Cadastre-se</Link></span><Link href="/">Voltar ao site</Link></div></div></section><div className="core-auth-photo" role="img" aria-label="Profissional de contabilidade trabalhando no escritório"/></main>
}
