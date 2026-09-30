'use client';
import {useEffect,useState} from 'react';
import {api,User} from '../lib/core';
export type TipoUsuario='admin'|'usuario';
export function useUsuarioAtual(){const [usuario,setUsuario]=useState<(User&{tipo:TipoUsuario})|null>(null),[carregando,setCarregando]=useState(true);useEffect(()=>{api<User>('auth/me').then(u=>setUsuario({...u,tipo:u.nivel==='administrador'?'admin':'usuario'})).catch(()=>setUsuario(null)).finally(()=>setCarregando(false));},[]);return {usuario,carregando};}
