import prisma from '../../lib/prisma'
import Layout, { siteTitle } from '../../components/Layout'
import Head from 'next/head'
import Chapter from '../../components/db/Chapters'
import dynamic from 'next/dynamic'

export async function getStaticProps() {
    const story = await prisma.mainStory.findMany({
        orderBy: [
            {season: 'asc'},
            {chapter: 'asc'},
        ],
        select: {
            season: true,
            chapter: true,
            name: true,
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
        },
    })

    return {
        props: { story }
    }
}

const DynamicFilter = dynamic(() => import('../../components/db/Filter'), {
    ssr: false,
})

export default function StoryIndex({ story }) {
    return (
        <Layout pageTitle="main story">            
            <DynamicFilter page='mainStory' />
            <h1 className='text-6xl font-bold font-display text-center mb-16'>Main Story</h1>
            <div className="filter-container">
              {story.map((c, i) => (
                  <Chapter key={i} chapter={c} />
              ))}
            </div>
        </Layout>
    )
}