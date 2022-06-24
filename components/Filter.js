import { MdFilterList } from "react-icons/md"
import { useState } from "react";

export async function getStaticProps() {
    const heroes = await prisma.hero.findMany({
        where: {
            chibi: true,
        },
        select: {
            name: true,
        },
    })

    return {
        props: { heroes }
    }
}

export default function StoryFilter({ heroes }) {
    const [showMe, setShowMe] = useState(false);
    function toggleFilters() {
        setShowMe(!showMe)
    }
    return (
        <>
            <button id="filterToggle" className={`fixed z-50 right-12 top-12 bg-black p-2 ${showMe ? "mr-64" : ""}`} onClick={toggleFilters}>
                <MdFilterList className="text-4xl text-white" />
            </button>
            <div id="storyFilters" className={`h-screen w-full bg-white sm:w-80 fixed z-40 top-0 -right-80 overflow-x-hidden p-12 border-l-[3px] ${showMe ? "mr-80" : ""}`}>
                <h3 className="text-3xl font-display uppercase">Filters</h3>
                {/* {heroes.map((h, i) => (
                    <a key={i} className="h-80px w-88px relative inline-block">
                        <Image
                            src={`/images/chibi/${h.name}.png`}
                            alt={h.name}
                            width={66}
                            height={60} 
                        />
                    </a>
                ))} */}
            </div>
        </>
    )
}