import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import prisma from '../lib/prisma';

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
      <section className='mt-20 mb-10 max-w-xl mx-auto'>
        <p>mediocre proof of concept for a mobage story database/directory. mostly an exercise to figure out back-end and like serverless function stuff rn but i will be fancifying the fuck out of this now that I have an actual foundation</p>
        <ul className='list-disc leading-loose my-4 text-lg'>
          <li><Link href="/story"><a className='text-slate-400 underline underline-offset-4'>Main Story test</a></Link></li>
          <li><Link href="/event/sweet-spell"><a className='text-slate-400 underline underline-offset-4'>Event test</a></Link></li>
        </ul>
      </section>
      <section className='mb-20 max-w-xl mx-auto'>
        <table className='table-auto border-collapse w-full'>
          <thead className='bg-slate-200'>
            <tr>
              <th colSpan="3" className='px-6 py-3 font-semibold text-lg'>Total Main Story Appearances</th>
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
      </section>
    </Layout>
  );
}