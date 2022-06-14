import prisma from '../../lib/prisma'

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
        <ul>
            {allEventsData.map((e, i) => (
                <Event key={i} event={e} />
            ))}
        </ul>
    )
}