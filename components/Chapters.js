import StoryPart from "./StoryPart"
import Image from "next/image"

export default function Chapter({ chapter }) {
    var ch = chapter.chapter.toString()
    if (ch.length == 1) {
        ch = '0' + ch
    }
    if (ch != '00' ) {
        ch = '.CH' + ch
    } else {
        ch = ''
    }
    return (
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div>
                <h2 className="text-4xl font-extrabold inline-block float-left leading-loose">PT{chapter.season}{ch} \/\/</h2>
                <Image
                    src={`/images/story/${chapter.season}-${chapter.chapter}.png`}
                    alt={chapter.name}
                    width={1490}
                    height={840}
                />
                <h2 className="text-4xl font-extrabold inline-block float-right leading-relaxed lg:sticky lg:top-4">{chapter.name}</h2>
            </div>
            <div>
                {chapter.parts.map((p, i) => (
                    <StoryPart key={i} part={p} />
                ))}
            </div>
        </div>
    )
}