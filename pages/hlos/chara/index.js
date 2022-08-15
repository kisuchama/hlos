import prisma from "../../../lib/prisma";
import Head from "next/head";
import Layout, { siteTitle } from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const allCharaData = await prisma.hero.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      name: true,
      surname: true,
      hex: true,
      substance: true,
      sector: { select: { location: true } },
      _count: { select: { cards: true } },
    }
  })

  return {
    props: {allCharaData}
  }
}

export default function CharaIndex({ allCharaData }) {
  return (
    <Layout pageTitle="characters">

      <h1 className="text-4xl font-display font-bold mb-8">Characters</h1>
      
      {allCharaData.map((c, i) => (
        <Link href={`/hlos/chara/${c.name.toLowerCase()}`} key={i}><a className={`flex flex-row items-center space-x-2.5 ${c.substance ? 'mb-2' : 'mb-4'}`}>
          {c.substance ? (
          <Image
            src={`/images/substance/${c.name.toLowerCase()}.png`}
            alt={c.substance}
            width={36}
            height={36}
          />
          ) : (<></>)}
          <h1 className="text-xl link-underline">{(c.name != 'Junior') ? c.name + ' ' : '' }{c.surname}</h1>
        </a></Link>
      ))}

    </Layout>
  )
}