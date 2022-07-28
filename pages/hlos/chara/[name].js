import prisma from "../../../lib/prisma";
import Layout, { siteTitle } from "../../../components/Layout";
import Head from "next/head";
import Image from "next/image";
import Card from "../../../components/db/Card";

export async function getStaticProps({ params }) {
  const chara = await prisma.hero.findUnique({
    where: {
      name: params.name,
    },
    select: {
      name: true,
      surname: true,
      sector: { select: { location: true } },
      substance: true,
      cards: {
        select: {
          title: true,
          titleJp: true,
          hero: { select: { name: true, surname: true } },
          rarity: true,
          event: {
            select: {
              name: true,
              slug: true,
              startDate: true,
            },
          },
          translation: {
            select: {
              link: true,
              translator: { select: { name: true } },
            },
          },
          cameos: {
            select: {
              hero: {
                select: {
                  id: true,
                  name: true,
                  chibi: true,
                }
              }
            }
          }
        }
      }
    }
  })

  for (const card of chara.cards) {
    card.event.startDate = card.event.startDate.toISOString()
  }

  return {
    props: { chara },
  };
}

export async function getStaticPaths() {
  const charas = await prisma.hero.findMany();

  return {
    paths: charas.map((chara) => ({
      params: {
        name: chara.name.toLowerCase(),
      },
    })),
    fallback: false,
  }
}

export default function CharaPage({ chara }) {
  const regex = /[^a-z0-9 ]/g;
  const fullName = [];
  if (chara.name != 'Junior') {
    fullName.push(chara.name);
  }
  if (chara.surname) { fullName.push(chara.surname); }
  const hero = chara.name.toLowerCase()

  // sort cards from most recent
  const sort = function (prop, arr) {
    prop = prop.split('.');
    const len = prop.length;

    arr.sort(function (a, b) {
      let i = 0;
      while ( i < len ) {
        a = a[prop[i]];
        b = b[prop[i]];
        i++;
      }
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
    return arr;
  }

  sort('event.startDate', chara.cards);
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle} / {fullName.join(' ').toLowerCase().replace(regex, "")}</title>
      </Head>
      <div className="flex flex-row items-center space-x-2.5">
        {chara.substance ? (
        <Image
          src={`/images/substance/${hero}.png`}
          alt={chara.substance}
          width={64}
          height={64}
        />
        ) : (<></>)}
        <h1 className="text-4xl font-display font-bold">{fullName.join(' ')}</h1>
      </div>
      {/* <Image
        src={`/images/icon/${hero}.png`}
        alt={chara.substance}
        width={220}
        height={220}
      /> */}
      <div className="flex flex-row items-center">
          <h2 className="text-3xl font-display font-bold leading-loose">
            Cards
          </h2>
          <hr className={`border-0 ml-8 h-[3px] bg-${hero}/30 grow hidden lg:block`} />
        </div>
      <div className="grid gap-x-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {chara.cards.map((c, i) => (
            <Card key={i} card={c} eventPage={true} />          
        ))}
      </div>
    </Layout>
  )
}