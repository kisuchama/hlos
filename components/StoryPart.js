import Cameo from "./Cameo"

export default function StoryPart({ part }) {
    var pt = part.part.toString()
    if (pt.length == 1) {
        pt = '0' + pt
    }

    const partCameos = []
    var h = ''
    for ( var i=0; i < part.cameos.length; i++) {
        partCameos.push('tag' + part.cameos[i].hero.name)
    }

    return (
        <div className={`flex flex-row mx-2 h-20 items-center justify-start partDiv ${partCameos.join(' ')}`}>
            <h2 className="text-4xl font-display font-bold leading-0 -mt-2 mr-4 w-[66px]">{pt}</h2>
            {part.cameos.map((c, i) => (
                <div key={i}>
                    {c.hero.chibi ? (
                        <Cameo cameo={c} />
                    ) : (<></>)}
                </div>
            ))}
        </div>
    )
}