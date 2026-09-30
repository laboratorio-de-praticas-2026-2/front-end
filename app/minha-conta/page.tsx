'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import CoreShell from '../components/CoreShell';
import {api,User} from '../lib/core';
export default function MinhaConta(){const [u,setU]=useState<User|null>(null);useEffect(()=>{api<User>('auth/me').then(setU).catch(()=>{});},[]);return <CoreShell><div className="core-heading"><div><h1>Minha conta</h1><p>Seus dados e serviços em um só lugar.</p></div></div><section className="core-panel"><h2>Dados do perfil</h2><p className="my-4">{u?.nome}</p><p>{u?.email}</p><div className="core-cards"><Link className="core-service" href="/busca"><h3>Consultar CPF / CNPJ</h3><p>Consulte seu cadastro e as empresas vinculadas à sua conta.</p></Link><Link className="core-service" href="/servicos"><h3>Catálogo de serviços</h3><p>Conheça os serviços contábeis e seus honorários.</p></Link></div></section></CoreShell>}
