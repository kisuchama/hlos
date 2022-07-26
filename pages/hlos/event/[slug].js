import prisma from "../../../lib/prisma";
import EventPart from "../../../components/db/EventPart";
import Card from "../../../components/db/Card";
import Layout, { siteTitle } from "../../../components/Layout";
import Head from "next/head";
import Image from "next/image";
import Date from "../../../components/Date";
import { CgArrowRight, CgCalendarToday } from "react-icons/cg";

export async function getStaticProps({ params }) {
  const event = await prisma.event.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      name: true,
      nameJp: true,
      slug: true,
      noCover: true,
      desc: true,
      startDate: true,
      endDate: true,
      attribute: {
        select: {
          name: true,
          color: true,
        },
      },
      sector: {
        select: {
          location: true,
        },
      },
      hero: {
        select: {
          name: true,
        },
      },
      parts: {
        select: {
          part: true,
          cameos: {
            select: {
              hero: {
                select: {
                  name: true,
                  chibi: true,
                },
              },
            },
          },
          translation: { select: { link: true } },
        },
      },
      translator: {
        select: {
          translator: {
            select: {
              name: true,
            },
          },
        },
      },
      cards: {
        select: {
          title: true,
          rarity: true,
          hero: { select: { name: true, surname: true } },
          event: {
            select: {
              name: true,
              slug: true,
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
                },
              },
            },
          },
        },
      },
    },
  });

  event.startDate = event.startDate.toISOString();
  event.endDate = event.endDate.toISOString();

  return {
    props: { event },
  };
}

export async function getStaticPaths() {
  const events = await prisma.event.findMany();

  return {
    paths: events.map((event) => ({
      params: {
        slug: event.slug,
      },
    })),
    fallback: false,
  };
}

export default function EventPage({ event }) {
  const regex = /[^a-z0-9 ]/g;
  const eventName = event.name.toLowerCase().replace(regex, "");
  let totalCards = event.cards.length;
  if (totalCards > 4) {
    totalCards = 4;
  }
  const eventTranslators = [];
  for (var k = 0; k < event.translator.length; k++) {
    eventTranslators.push(event.translator[k].translator.name);
  }
  // determine cover img src
  const coverImg = [];
  let featured = "";
  if (event.hero) {
    featured = event.hero.name.toLowerCase();
  }
  if (event.noCover) {
    coverImg.push(`/images/event/${event.slug}/${featured}-evo.jpg`);
  } else {
    coverImg.push(`/images/event/${event.slug}/main.jpg`);
  }
  return (
    <Layout event>
      <Head>
        <title>
          {siteTitle} / {eventName}
        </title>
      </Head>
      <section className="text-center lg:hidden mb-8">
        <h1 className="text-3xl leading font-display font-bold">
          {event.name}
        </h1>
        {event.nameJp ? (
          <h2 className="text-lg text-slate-400 leading-loose">
            {event.nameJp}
          </h2>
        ) : (
          <></>
        )}
      </section>
      <section className={`grid lg:grid-cols-12 gap-2 lg:gap-y-8`}>
        <div className="hidden lg:col-span-3 lg:block pr-4">
          <h1 className="text-4xl font-display font-bold">{event.name}</h1>
          {event.nameJp ? (
            <h2 className="text-lg text-slate-400 leading-loose mt-4">
              {event.nameJp}
            </h2>
          ) : (
            <></>
          )}
          {event.desc ? <p className="my-4">{event.desc}</p> : <></>}
          <div className="flex flex-row items-center justify-start mt-4">
            <CgCalendarToday className="text-slate-400" />
            <Date dateString={event.startDate} long={true} />
            <CgArrowRight className="text-slate-400" />
            <Date dateString={event.endDate} long={true} />
          </div>
          <div className="flex flex-row items-center justify-start mt-4">
            {/* EVENT TYPE */}
            {event.sector ? (
              <>
                <a className="uppercase text-xs bg-black border-[1px] border-black text-white px-3 py-1">
                  Sector
                </a>
                <a
                  className={`uppercase text-xs bg-${event.sector.location.toLowerCase()} border-[1px] border-black text-white px-3 py-1 mr-2`}
                >
                  {event.sector.location}
                </a>
              </>
            ) : (
              <></>
            )}
            {event.hero ? (
              <>
                <a className="uppercase text-xs bg-black border-[1px] border-black text-white px-3 py-1">
                  Hero
                </a>
                <a
                  className={`uppercase text-xs bg-${event.hero.name.toLowerCase()} border-[1px] border-black text-white px-3 py-1 mr-2`}
                >
                  {event.hero.name}
                </a>
              </>
            ) : (
              <></>
            )}

            {event.attribute ? (
              <a
                className={`uppercase text-xs bg-${event.attribute.color} border-[1px] border-${event.attribute.color} text-white px-3 py-1`}
              >
                {event.attribute.name}
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={`lg:col-span-9`}>
          <div className="imgCG">
            <Image
              src={coverImg[0]}
              alt={event.name}
              width={1024}
              height={630}
              quality={100}
              layout="responsive"
              priority
            />
          </div>
          <div className="mt-8 lg:hidden">
            <div className="flex flex-row items-center justify-start">
              <CgCalendarToday className="text-slate-400" />
              <Date dateString={event.startDate} long={true} />
              <CgArrowRight className="text-slate-400" />
              <Date dateString={event.endDate} long={true} />
            </div>
            {event.desc ? <p className="py-4">{event.desc}</p> : <></>}
          </div>
        </div>
        <div className="lg:col-span-12 flex flex-row items-center">
          <h2 className="text-3xl font-display font-bold leading-loose">
            Event Cards
          </h2>
          <hr className="border-0 ml-8 h-[3px] bg-slate-300 grow hidden lg:block" />
        </div>
        {event.cards.map((c, i) => (
          <div key={i} className={`lg:col-span-${12 / totalCards}`}>
            <Card card={c} eventPage={true} />
          </div>
        ))}
        <div className="lg:col-span-12 flex flex-row items-center">
          <h2 className="text-3xl font-display font-bold leading-loose">
            Event Story
          </h2>
          <hr className="border-0 ml-8 h-[3px] bg-slate-300 grow hidden lg:block" />
        </div>
        <div className="lg:col-span-12 divide-y divide-slate-300 divide-solid gap-4">
          {event.parts.map((p, i) => (
            <EventPart key={i} part={p} />
          ))}
        </div>
        {/* <div className="text-sm flex flex-row">
            {eventTranslators.map((t, i) => (
                <div key={i} className="flex flex-row items-center">
                <MdTranslate className="inline-block mx-1" /> <a href={`https://twitter.com/${t}`} className="link-underline">@{t}</a>
            </div>
            ))}
          </div> */}
      </section>
    </Layout>
  );
}
