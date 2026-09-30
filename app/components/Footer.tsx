import Link from 'next/link';

const links = [
  {href:'/', label:'Início'},
  {href:'/servicos', label:'Serviços e honorários'},
  {href:'/busca', label:'Busca por CPF/CNPJ'},
  {href:'/faq', label:'Dúvidas'},
  {href:'/login', label:'Área do cliente'},
];

export function Footer() {
  return <footer className="w-full bg-[#0d476d] text-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row justify-between gap-8">
      <div><Link href="/" className="text-xl font-extrabold leading-tight">PORTAL<br/>CONTÁBIL</Link><p className="text-slate-200 text-sm mt-3">Soluções contábeis para facilitar a gestão da sua empresa.</p></div>
      <nav aria-label="Links rápidos" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">{links.map(link=><Link key={link.href} href={link.href} className="hover:underline">{link.label}</Link>)}</nav>
    </div>
    <div className="bg-[#0a3755] px-6 lg:px-12 py-4 text-xs text-slate-300">© 2026 Portal Contábil. Todos os direitos reservados.</div>
  </footer>;
}
