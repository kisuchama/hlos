import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/Layout';
import prisma from '../lib/prisma';
import { CgReadme, CgAlarm } from 'react-icons/cg';

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
      <section className='my-10 max-w-xl mx-auto'>
        <p className='text-2xl text-red-600 font-display text-center uppercase'>major work in progress</p>
        <p className='my-8'>キス.moe is a work-in-progress unofficial <a href='https://helios-r.jp' className='link-underline'><strong>Helios Rising Heroes</strong></a> fansite created with the intent to fill the niche between wiki sites like Fandom and <a href='https://miraheze.org/' className='link-underline'>Miraheze</a>, databases like <a href='https://github.com/MagiCircles' className='link-underline'>MagiCircles</a>, and spreadsheets pinned in Discord servers. Post-launch, I hope to release a template for making similar database sites for other games.<br /><br />
        This story-oriented database aims to provide a quick and simple way to locate specific chapters players may want to (re)read based on criteria like the characters which appear in them and related event or card stories.<br /><br />
        The secondary goal is to visualize character cameo trends and provide data from which players can make informed predictions on upcoming events on main story focii.<br /><br />
        <strong>tl;dr:</strong> WIP ENG HeliosR story database with (future) fancy graphs</p>
        <ul className='my-4 leading-loose text-xl font-display'>
          <li>
            <CgReadme className="inline-block mr-2"/>
            <Link href="/hlos/story"><a className='link-underline leading-normal'>Main Story</a></Link>
          </li>
          <li>
            <CgAlarm className="inline-block mr-2"/>
            <Link href="/hlos/event"><a className='link-underline leading-normal'>Event Index</a></Link>
          </li>
        </ul>
      </section>
      <section className='mb-20 max-w-xl mx-auto'>
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
      </section>
    </Layout>
  );
}