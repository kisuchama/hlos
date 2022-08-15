import Link from "next/link";

export default function Header({ page })  {
  const breadcrumbs = [];
  breadcrumbs.push(["hlos", "/"]);
  breadcrumbs.push(["page", "/pg"]);
  return (
    <header className="fixed top-0 z-40 w-full bg-white border-b-[3px] border-b-black ">
      <div className="container h-16 flex flex-row items-center justify-start font-display text-lg mx-auto">
        <Link href="/"><a className="font-bold">キス</a></Link>
        <span>&nbsp;/&nbsp;</span>
        <Link href="/hlos"><a>hlos</a></Link>
        <span>&nbsp;/&nbsp;</span>
        <span className="font-normal">{page ? page : ''}</span>
      </div>
    </header>
  )
}