import Cameo from "../Cameo"
import { CgExternal } from "react-icons/cg"

export default function StoryPart({ part, season, chapter, event }) {
  // format part length
  var pt = part.part.toString()
  if (season) {
      pt = season + '.' + chapter + '.' + pt
  }

  // get cameos in part
  const partCameos = []
  for ( var i=0; i < part.cameos.length; i++) {
      partCameos.push('tag' + part.cameos[i].hero.name)
  }

  return (
    <>
      {event ? (
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
      ) : (
        <div className={`filter-item storyPart ${partCameos.join(' ')}`}>
            <div className="partWrapper"><div className="partContent flex flex-col justify-between">
              <h2 className="text-2xl font-display font-bold leading-0">{pt}</h2>
              <div className="w-7/8 flex flex-row justify-center items-center mx-auto justify-self-center">
                {part.cameos.map((c, i) => (
                  <div key={i}>
                      {c.hero.chibi ? (
                          <Cameo cameo={c} />
                      ) : (<></>)}
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-end">
                  <a href="#" className="hover:text-red-600 transition"><CgExternal className="text-3xl" /></a>
              </div>
            </div></div>
        </div>
      )}
    </>
  )
}

{/* <div className={`filter-item storyPart ${partCameos.join(' ')}`}>
    <div className="partWrapper"><div className="partContent flex flex-col justify-between">
      <h2 className="text-2xl font-display font-bold leading-0">{pt}</h2>
      <div className="w-7/8 flex flex-row justify-center items-center mx-auto justify-self-center">
        {part.cameos.map((c, i) => (
          <div key={i}>
              {c.hero.chibi ? (
                  <Cameo cameo={c} />
              ) : (<></>)}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end">
          <a href="#" className="hover:text-red-600 transition"><CgExternal className="text-3xl" /></a>
      </div>
    </div></div>
</div> */}