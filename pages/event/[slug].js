import prisma from '../../lib/prisma'
import StoryPart from "../../components/StoryPart";
import Layout from '../../components/layout'
import Head from 'next/head'
import Image from "next/image"
import Date from '../../components/date';

export async function getStaticProps({ params }) {
    const event = await prisma.event.findUnique({
        where: {
            slug: params.slug
        },
        select: {
            name: true,
            nameJp: true,
            slug: true,
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
                            <span><Date dateString={event.startDate} /> → <Date dateString={event.endDate} /></span>
                            <p className="py-4">Fetch event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend id ante a mollis. Quisque laoreet auctor venenatis. Ut ligula metus, sagittis ac bibendum eu, dapibus et justo. Nam suscipit sagittis dolor, at accumsan eros congue quis. Fusce sit amet elit eros. Phasellus ultricies risus sit amet metus molestie porta.</p>
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