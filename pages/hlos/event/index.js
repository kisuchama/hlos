import prisma from '../../../lib/prisma'
import Event from '../../../components/db/Event'
import Head from 'next/head'
import Layout, { siteTitle } from '../../../components/Layout'
import dynamic from 'next/dynamic'
import Script from 'next/script'

export async function getStaticProps() {
    const allEventsData = await prisma.event.findMany({
        orderBy: {
            startDate: 'desc',
        },
        select: {
            name: true,
            slug: true,
            noCover: true,
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
            translator: {
                select: {
                    translator: {
                        select: {
                            name: true,
                        },
                    },
                },
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

const DynamicFilter = dynamic(() => import('../../../components/db/Filter'), {
    ssr: false,
})

export default function EventIndex({ allEventsData }) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle} / event index</title>
            </Head>

            <Script src="../../public/isotope-fit-columns.js" />

            <DynamicFilter page='eventIndex' />
            <h1 className="text-4xl font-display font-bold mb-8">Event Index</h1>
            <div className="filter-container">
                {allEventsData.map((e, i) => (
                    <Event key={i} event={e} />
                ))}
            </div>
        </Layout>
    )
}