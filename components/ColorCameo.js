export default function ColorCameo({ part }) {
  const allCameos = []
  let c = part.cameos;
  let h = '';
  for (let i = 0; i < c.length; i++) {
    h = c[i].hero;
    if (!allCameos.includes(h.name)) {
      allCameos.push(h.name);
    }
  }
  return (
    <div className={`filter-item storyPart ${partCameos.join(' ')}`}>
      <div className="partWrapper"><div className="partContent">
        
      </div></div>
    </div>
  )
}