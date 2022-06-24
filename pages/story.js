import prisma from '../lib/prisma'
import Layout from '../components/layout'
import Head from 'next/head'
import Chapter from '../components/Chapters'
import dynamic from 'next/dynamic'
import Script from 'next/script'

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

const DynamicFilter = dynamic(() => import('../components/Filter'), {
    ssr: false,
})

export default function StoryIndex({ story }) {
    return (
        <Layout>
            <Head>
                <title>Main Story</title>
            </Head>
            
            <DynamicFilter />
            <h1 className='text-6xl font-bold font-display text-center mb-16'>Main Story</h1>
            {story.map((c, i) => (
                <Chapter key={i} chapter={c} />
            ))}
        </Layout>
    )
}