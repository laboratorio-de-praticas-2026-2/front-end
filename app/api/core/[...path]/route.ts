import { NextRequest, NextResponse } from 'next/server';

const allowed = /^(auth\/(login|logout|me)|clientes|contato\/cadastro-pj|header|servicos(?:\/admin(?:\/\d+(?:\/status)?)?)?|publicidade(?:\/admin(?:\/\d+(?:\/status)?)?)?|search\/(document|advanced)|admin\/usuarios(?:\/\d+)?)$/;
async function proxy(req: NextRequest, context: { params: Promise<{path: string[]}> }) {
  const path = (await context.params).path.join('/');
  if (!allowed.test(path)) return NextResponse.json({message:'Rota não encontrada.'},{status:404});
  const requestOrigin = req.headers.get('origin');
  let sameOrigin = false;
  if (requestOrigin) {
    try {
      const origin = new URL(requestOrigin);
      sameOrigin = origin.host === req.headers.get('host') && ['http:', 'https:'].includes(origin.protocol);
    } catch { /* Reject malformed Origin headers. */ }
  }
  if (!['GET','HEAD'].includes(req.method) && !sameOrigin) {
    return NextResponse.json({message:'Origem inválida.'},{status:403});
  }
  const token = req.cookies.get('core_session')?.value;
  const headers: Record<string,string> = {'Content-Type':'application/json'};
  if(token) headers.Authorization = `Bearer ${token}`;
  try {
    const upstream = await fetch(`${process.env.CORE_API_URL || 'http://127.0.0.1:3333'}/${path}${req.nextUrl.search}`, {
      method:req.method, headers, body:['GET','HEAD'].includes(req.method)?undefined:await req.text(), cache:'no-store', signal:AbortSignal.timeout(15000), redirect:'error',
    });
    const data = upstream.status === 204 ? null : await upstream.json();
    const login = path === 'auth/login' && upstream.ok;
    const result = new NextResponse(data === null ? null : JSON.stringify(login ? {usuario:data.usuario} : data), {status:upstream.status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
    if(login) result.cookies.set('core_session',data.accessToken,{httpOnly:true,secure:new URL(requestOrigin || req.url).protocol==='https:',sameSite:'lax',path:'/',maxAge:data.expiresIn});
    if(path==='auth/logout' || upstream.status===401) result.cookies.set('core_session','',{httpOnly:true,sameSite:'lax',path:'/',maxAge:0});
    return result;
  } catch { return NextResponse.json({message:'Não foi possível conectar ao servidor. Tente novamente.'},{status:502}); }
}
export {proxy as GET, proxy as POST, proxy as PATCH, proxy as DELETE};
