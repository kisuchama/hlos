import Link from "next/link"
import Image from "next/image"

export default function Cameo({ cameo }) {
    return (
        <Link href={`/cameos/${cameo.hero.name}`}>
            <a className="h-80px w-88px relative inline-block">
                <Image
                    src={`/images/chibi/${cameo.hero.name.toLowerCase()}.png`}
                    alt={cameo.hero.name}
                    width={66}
                    height={60} 
                />
            </a>
        </Link>
    )
}

// import React, { useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'

// export default function Cameo({ cameo }) {
//     const [isHovering, setIsHovered] = useState(false);
//     const onMouseEnter = () => setIsHovered(true);
//     const onMouseLeave = () => setIsHovered(false);
//     return (
//         <Link href={`/cameos/${cameo.hero.name}`}><a>
//         <div
//             className="h-80px w-88px -my-2 flex justify-center items-center duration-200"
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//         >
            
//                 {isHovering ? (
//                     <Image src={`https://res.cloudinary.com/kisu/image/upload/${cameo.hero.chibi}/hlos/${cameo.hero.name}/chibi.png`}
//                     alt={cameo.hero.name}
//                     width={70.4}
//                     height={64} />
//                 ) : (
//                     <Image src={`https://res.cloudinary.com/kisu/image/upload/${cameo.hero.chibi}/hlos/${cameo.hero.name}/chibi.png`}
//                     alt={cameo.hero.name}
//                     width={88}
//                     height={80} />
//                 )}
            
//         </div>
//         </a></Link>
//     )
// }