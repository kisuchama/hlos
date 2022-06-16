import prisma from '../../lib/prisma'
import StoryPart from "../../components/StoryPart";
import Layout from '../../components/layout'
import Head from 'next/head'
import Image from "next/image"
import Date from '../../components/date';
import { CgArrowRight, CgCalendarToday } from 'react-icons/cg'

export async function getStaticProps({ params }) {
    const event = await prisma.event.findUnique({
        where: {
            slug: params.slug
        },
        select: {
            name: true,
            nameJp: true,
            slug: true,
            desc: true,
            startDate: true,
            endDate: true,
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
                },
            },
            cards: true,
        },
    })

    event.startDate = event.startDate.toISOString()
    event.endDate = event.endDate.toISOString()
    

    return {
        props: { event }
    }
}

export async function getStaticPaths() {
    const events = await prisma.event.findMany();

    return {
        paths: events.map((event) => ({
            params: {
                slug: event.slug
            }
        })),
        fallback: false
    };
}

export default function EventPage({ event }) {
    return (
        <Layout>
            <Head>
                <title>{event.name}</title>
            </Head>
            <h1 className="text-4xl font-extrabold text-center leading-loose">{event.name}</h1>
            <div className="grid lg:grid-cols-2 gap-8">
                <div>
                    <div className="lg:sticky lg:top-4">
                        <Image
                            src={`/images/${event.slug}/main.png`}
                            alt={event.name}
                            width={1280}
                            height={720}
                        />
                        <div className="my-4">
                            <div className="flex flex-row items-center justify-start">
                                <CgCalendarToday className="text-slate-500" /> 
                                <Date dateString={event.startDate} /> 
                                <CgArrowRight className="text-slate-500" /> 
                                <Date dateString={event.endDate} />
                            </div>
                            {event.desc ? (
                                <p className="py-4" dangerouslySetInnerHTML={{ __html: `${event.desc}`}}></p>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
                <div>
                    {event.parts.map((p, i) => (
                        <StoryPart key={i} part={p} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}