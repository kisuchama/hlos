import prisma from '../../lib/prisma'
import Event from '../../components/Event'
import Head from 'next/head'
import Layout from '../../components/layout'

export async function getStaticProps() {
    const allEventsData = await prisma.event.findMany({
        orderBy: {
            startDate: 'desc',
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
            _count: {
                select: { parts: true },
            },
        },
    })

    for (const event of allEventsData) {
        event.startDate = event.startDate.toISOString()
        event.endDate = event.endDate.toISOString()
    }

    return {
        props: { allEventsData }
    }
}

export default function EventIndex({ allEventsData }) {
    return (
        <Layout>
            <Head>
                <title>Event Index</title>
            </Head>
            <h1 className="text-4xl leading-relaxed font-display font-bold mb-8">Event Index</h1>
            <div className="grid lg:grid-cols-2 gap-8">
                {allEventsData.map((e, i) => (
                    <Event key={i} event={e} />
                ))}
            </div>
        </Layout>
    )
}