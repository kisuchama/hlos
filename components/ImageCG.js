import Image from "next/image";
import styled from "styled-components"

const CGWrap = styled.span`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > span {
        max-width: calc(100% - 21px);
        box-shadow: 6px 6px 0 black;
        border: 6px solid white;
        outline: 3px solid black;
    }
`;

const ImageCG = ({ alt, src, width, height }) => {
    return (
        <CGWrap>
            <Image
                alt={alt}
                src={src}
                width={1024}
                height={630}
                quality={80}
            />
        </CGWrap>
    );
};

export default ImageCG;