export class ApiError extends Error { constructor(message:string,public status:number){super(message);} }
export async function api<T>(path:string, options:RequestInit = {}):Promise<T> {
  const response = await fetch(`/api/core/${path}`,{...options,headers:{'Content-Type':'application/json',...options.headers},cache:'no-store'});
  const data = response.status === 204 ? null : await response.json();
  if(!response.ok) throw new ApiError(Array.isArray(data?.message)?data.message.join(' '):data?.message || 'Não foi possível concluir a operação.',response.status);
  return data as T;
}
export const money = (value:string|number|null) => value===null?'Sob consulta':new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(value));
export const message = (e:unknown) => e instanceof Error ? e.message : 'Ocorreu um erro. Tente novamente.';
export type User = {id:number;nome:string;email:string;nivel:'cliente'|'administrador'};
export type Empresa = {id:number;razaoSocial:string;nomeFantasia:string|null;cnpj:string;regimeTributario:string;inscricaoEstadual?:string|null;inscricaoMunicipal?:string|null};
export type Perfil = User & {tipo:'PF'|'PJ';cpfCnpj:string|null;celular:string|null;empresas:Empresa[]};
export type Servico = {id:number;nome:string;descricao:string|null;valorBase:string|null;prazoEstimadoDias:number|null;ativo:boolean};
export type Anuncio = {id:number;titulo:string;conteudo:string;urlImagem:string|null;ativo:boolean};
