import useSWR from 'swr'
import Chapter from '../components/Chapters'
import Layout from '../components/layout'
import Head from 'next/head'

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default function StoryIndex() {
    const { data, error } = useSWR('/api/db/story', fetcher)

    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>

    return (
        <Layout>
            <Head>
                <title>Main Story</title>
            </Head>
            <h1 className='text-6xl font-extrabold uppercase text-center mb-12'>Main Story</h1>
            {data.map((c, i) => (
                <Chapter key={i} chapter={c} />
            ))}
        </Layout>
    )
}