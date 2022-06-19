import prisma from '../../lib/prisma'
import Event from '../../components/Event'
import Layout from '../../components/layout'

export async function getStaticProps() {
    const allEventsData = await prisma.event.findMany({
        orderBy: {
            startDate: 'asc',
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
            <h1 className="text-3xl leading-relaxed font-semibold">Event Index</h1>
            <ul className="list-disc leading-loose">
            {allEventsData.map((e, i) => (
                <Event key={i} event={e} />
            ))}
        </ul>
        </Layout>
    )
}