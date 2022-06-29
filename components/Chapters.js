import StoryPart from "./StoryPart"
import StoryPartOld from "./StoryPart"
import Image from "next/image"

export default function Chapter({ chapter }) {
  // format chapter numbering
  var ch = chapter.chapter.toString()
  if (ch.length == 1) {
      ch = '0' + ch
  }
  if (ch != '00' ) {
      ch = '.CH' + ch
  } else {
      ch = ''
  }

  // add tags for story parts
  // const partCameos = []
  //   var h = ''
  //   for ( var i=0; i < part.cameos.length; i++) {
  //       partCameos.push('tag' + part.cameos[i].hero.name)
  //   }

  // add tags for chapters
  // get cameos in part
  const chCameos = []
  for ( var i=0; i < chapter.parts.length; i++) {
    var part = chapter.parts[i]
    for ( var j=0; j < part.cameos.length; j++) {
      if (!chCameos.includes('tag' + part.cameos[j].hero.name)) {
        chCameos.push('tag' + part.cameos[j].hero.name)
      }
    }
  }

  return (
    <>
      <div className={`filter-item storyPart ${chCameos.join(' ')}`}><div className="partWrapper"><div className="partContent">
        <img src={`/images/story/${chapter.season}-${chapter.chapter}.jpg`} alt={chapter.name} />
          {/* <Image
              src={`/images/story/${chapter.season}-${chapter.chapter}.jpg`}
              alt={chapter.name}
              width={1024}
              height={630}
          /> */}
      </div></div></div>
      {chapter.parts.map((p, i) => (
          <StoryPart key={i} part={p} season={chapter.season} chapter={chapter.chapter} />
      ))}
    </>
  )
}

// export function ChapterOld({ chapter }) {
//     var ch = chapter.chapter.toString()
//     if (ch.length == 1) {
//         ch = '0' + ch
//     }
//     if (ch != '00' ) {
//         ch = '.CH' + ch
//     } else {
//         ch = ''
//     }
//     return (
//         <div className="grid lg:grid-cols-2 gap-8 mb-20">
//             <div>
//                 <h2 className="text-4xl font-bold font-display float-left leading-loose">PT{chapter.season}{ch}</h2>
//                 <div className="partWrapper"><div className="partContent"><div className="imgCG">
//                     <Image
//                         src={`/images/story/${chapter.season}-${chapter.chapter}.jpg`}
//                         alt={chapter.name}
//                         width={1024}
//                         height={630}
//                         quality={100}
//                         priority
//                     />
//                 </div></div></div>
//                 <h2 className="text-4xl font-bold font-display block float-right leading-relaxed lg:sticky lg:top-4">{chapter.name}</h2>
//             </div>
//             <div>
//                 {chapter.parts.map((p, i) => (
//                     <StoryPartOld key={i} part={p} />
//                 ))}
//             </div>
//         </div>
//     )
// }
