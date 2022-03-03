import styled from "styled-components";
import media from "styled-media-query";

const Logo = styled.img`
  width: 153px;
  height: 20px;
  ${media.lessThan("medium")`
    width: 92px;
    height: 12px;
  `}
`;

function LogoImage({ img }: { img: string }) {
  return <Logo src={img} />;
}

export default LogoImage;
