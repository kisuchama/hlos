import { MdFilterList } from "react-icons/md"
import { useState } from "react";
import Image from "next/image";
// import Script from "next/script";

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
    const [showCameos, setShowCameos] = useState(false);
    function toggleFilters() {
        setShowFilters(!showFilters)
    }

    function filterChara(chara) {
        setShowCameos(!showCameos)
        const clearCameos = document.querySelectorAll(".partDiv")
        const cameoToggles = document.querySelectorAll(".charaToggle")
        
        clearCameos.forEach(part => {
            part.classList.add("invisible", "h-0")
            if (part.classList.contains('tag' + chara)) {
                part.classList.remove("invisible", "h-0")
            }
        })

        cameoToggles.forEach(button => {
            button.classList.add("bg-transparent")
            if(button.classList.contains('filter' + chara)) {
                button.classList.remove("bg-transparent")
            }
        })
    }

    const heroes = [
        'Akira','Will','Brad','Oscar',
        'Ren','Gast','Victor','Marion',
        'Junior','Faith','Keith','Dino',
        'Gray','Billy','Asch','Jay']
    return (
        <>
            {/* <Script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js"></Script> */}
            <button id="filterToggle" className={`fixed z-50 right-12 top-12 bg-black p-2 ${showFilters ? "mr-64" : ""}`} onClick={toggleFilters}>
                <MdFilterList className="text-4xl text-white" />
            </button>
            <div id="storyFilters" className={`h-screen w-full bg-white sm:w-80 fixed z-40 top-0 -right-full overflow-x-hidden p-12 border-l-[3px] ${showFilters ? "mr-80" : ""}`}>
                <h1 className="text-3xl font-display uppercase">Filters</h1>
                <h2 className="text-2xl font-display mt-8">Characters</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 mt-4 gap-y-4 sm:gap-2">
                {heroes.map((h, i) => (
                    <a key={i} className={`charaToggle filter${h} bg-${h.toLowerCase()} bg-transparent w-16 h-16 sm:w-14 sm:h-14 flex justify-center items-center rounded-full`} onClick={() => filterChara(h)}>
                        <Image
                            src={`/images/chibi/${h.toLowerCase()}.png`}
                            alt={h}
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