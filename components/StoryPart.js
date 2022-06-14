import Cameo from "./Cameo"

export default function StoryPart({ part }) {
    var pt = part.part.toString()
    if (pt.length == 1) {
        pt = '0' + pt
    }
    return (
        <>
            <div className="flex flex-row mx-2 h-20 items-center justify-start">
                <h2 className="text-4xl font-extrabold leading-0 -mt-2 mr-4">{pt}</h2>
                {part.cameos.map((c, i) => (
                    c.hero.chibi ? (
                     <Cameo key={i} cameo={c} />
                    ) : (<></>)
                ))}
            </div>
        </>
    )
}