import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='my-20 max-w-xl mx-auto'>
        <p>mediocre proof of concept for a mobage story database/directory. mostly an exercise to figure out back-end and like serverless function stuff rn but i will be fancifying the fuck out of this now that I have an actual foundation</p>
        <ul className='list-disc leading-loose my-4 text-lg'>
          <li><Link href="/story"><a className='text-blue-500 hover:underline hover:underline-offset-4'>Main Story</a></Link></li>
          <li><Link href="/event/sweet-spell"><a className='text-blue-500 hover:underline hover:underline-offset-4'>Event Story</a></Link></li>
        </ul>
      </section>
    </Layout>
  );
}