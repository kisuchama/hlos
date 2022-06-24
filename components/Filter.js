import { MdFilterList } from "react-icons/md"
import { useState } from "react";
import Image from "next/image";

// export async function getStaticProps() {
//     const heroes = await prisma.hero.findMany({
//         // where: {
//         //     id: { lte: 16 },
//         // },
//         select: {
//             name: true,
//         },
//     })

//     return {
//         props: { heroes }
//     }
// }

export default function StoryFilter() {
    const [showFilters, setShowFilters] = useState(false);
    // const [showPart, setShowPart] = useState(false);
    function toggleFilters() {
        setShowFilters(!showFilters)
    }
    // function filterChara(chara) {
    //     setShowPart(!showPart)
    // }

    const heroes = [
        'Akira','Will','Brad','Oscar',
        'Ren','Gast','Victor','Marion',
        'Junior','Faith','Keith','Dino',
        'Gray','Billy','Asch','Jay']
    return (
        <>
            <button id="filterToggle" className={`fixed z-50 right-12 top-12 bg-black p-2 ${showFilters ? "mr-64" : ""}`} onClick={toggleFilters}>
                <MdFilterList className="text-4xl text-white" />
            </button>
            <div id="storyFilters" className={`h-screen w-full bg-white sm:w-80 fixed z-40 top-0 -right-80 overflow-x-hidden p-12 border-l-[3px] ${showFilters ? "mr-80" : ""}`}>
                <h1 className="text-3xl font-display uppercase">Filters</h1>
                <h2 className="text-2xl font-display mt-8">Characters</h2>
                <div className="grid grid-cols-4 mt-4 gap-2">
                {heroes.map((h, i) => (
                    <a key={i}>
                        <Image
                            src={`/images/chibi/${h.toLowerCase()}.png`}
                            alt={h.name}
                            width={66}
                            height={60} 
                        />
                    </a>
                ))}
                </div>
            </div>
        </>
    )
}