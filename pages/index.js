import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma';
import { CgReadme, CgAlarm, CgCardDiamonds, CgBolt } from 'react-icons/cg';

export async function getStaticProps() {
  const cameosCounted = await prisma.hero.findMany({
    select: {
      name: true,
      chibi: true,
      _count: {
        select: { mainCameos: true },
      },
    },
    orderBy: {
      mainCameos: {
        _count: 'desc'
      }
    },
  })

  return {
    props: { cameosCounted }
  }
}

export default function Home({ cameosCounted }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='my-10 max-w-xl mx-auto text-2xl md:text-5xl font-display flex flex-col gap-y-6 md:gap-y-12 items-center'>
        <Link href="/hlos/chara">
          <a className='hover:text-red-600 text-gold-400 transition duration-500 leading-relaxed md:-ml-48'>
            <CgBolt className='inline-block mr-4 text-3xl md:text-6xl ' />
            <span className="text-black link-underline link-main">Characters</span>
          </a>
        </Link>

        <Link href="/hlos/story">
          <a className='hover:text-red-600 text-gold-400 transition duration-500 leading-relaxed md:-mr-48'>
            <span className="text-black link-underline link-main link-right">Main Story</span>
            <CgReadme className='inline-block ml-4 text-3xl md:text-6xl' />
          </a>
        </Link>

        

        <Link href="/hlos/event">
          <a className='hover:text-red-600 text-gold-400 transition duration-500 leading-relaxed md:-ml-48'>
            <CgAlarm className='inline-block mr-4 text-3xl md:text-6xl' />
            <span className="text-black link-underline link-main">Events</span>
          </a>
        </Link>

        <Link href="/hlos/card">
          <a className='hover:text-red-600 text-gold-400 transition duration-500 leading-relaxed md:-mr-48'>  
            <span className="text-black link-underline link-main link-right">Cards</span>
            <CgCardDiamonds className='inline-block ml-4 text-3xl md:text-6xl ' />
          </a>
        </Link>

       
      </section>
      {/* <section className='mb-20 max-w-xl mx-auto'>
        <table className='table-auto border-collapse w-full'>
          <thead className='bg-slate-200'>
            <tr>
              <th colSpan="3" className='px-6 py-3 font-display text-lg'>Total Main Story Appearances</th>
            </tr>
            <tr>
              <th></th>
              <th className='px-6 py-3 text-left font-semibold uppercase'>Character</th>
              <th className='px-6 py-3 text-left font-semibold'>#</th>
            </tr>
          </thead>
          <tbody>
            {cameosCounted.map((h, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-100">
                <>
                  {h.chibi ? (
                    <td className='pl-6 pt-4 pb-2' width='88px'>
                      <Image
                        src={`/images/chibi/${h.name.toLowerCase()}.png`}
                        alt={h.name}
                        width={66}
                        height={60} 
                      />
                    </td>
                  ) : (<td height='88px' width='88px'></td>)}         
                </>
                <td className={`px-6 py-3 text-${h.name.toLowerCase()}`}>{h.name}</td>
                <td className='px-6 py-3 font-mono'>{h._count.mainCameos}</td>
              </tr>     
            ))}
          </tbody>
        </table>
      </section> */}
    </Layout>
  );
}