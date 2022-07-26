export default function EventTags({ event, header }) {
  return (
    <div className={`flex flex-row items-center justify-start mt-4 ${header ? 'xl:hidden' : ''}`}>
      {/* EVENT TYPE */}
      {event.sector ? (
        <>
          <a className="uppercase text-xs bg-black border-[1px] border-black text-white px-3 py-1">
            Sector
          </a>
          <a
            className={`uppercase text-xs bg-${event.sector.location.toLowerCase()} border-[1px] border-black text-white px-3 py-1 mr-2`}
          >
            {event.sector.location}
          </a>
        </>
      ) : (
        <></>
      )}
      {event.hero ? (
        <>
          <a className="uppercase text-xs bg-black border-[1px] border-black text-white px-3 py-1">
            Hero
          </a>
          <a
            className={`uppercase text-xs bg-${event.hero.name.toLowerCase()} border-[1px] border-black text-white px-3 py-1 mr-2`}
          >
            {event.hero.name}
          </a>
        </>
      ) : (
        <></>
      )}

      {event.attribute ? (
        <a
          className={`uppercase text-xs bg-${event.attribute.color} border-[1px] border-${event.attribute.color} text-white px-3 py-1`}
        >
          {event.attribute.name}
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}
