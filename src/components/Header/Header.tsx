import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import media from "styled-media-query";

import Partner from "./Partner";
import LogoImage from "./LogoImage";

const StyledNav = styled.div`
  position: relative;
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1565c0;
  padding: 0px 40px;
  * {
    color: white;
    font-size: 14px;
  }
  ${media.lessThan("medium")`
    height: 44px;
    padding: 0px 0px 0px 23px;
    justify-content: start;
    gap: 19px;
  `}
`;

const Menu = styled(GiHamburgerMenu)`
  width: 24px;
  height: 16px;
  ${media.greaterThan("medium")`
    display: none;
  `}
`;

const NavControl = styled.div`
  height: 20px;
  width: 208px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan("medium")`
    display: none;
  `}
`;

const Divider = styled.div`
  height: 14px;
  border-right: 2px solid var(--color-white);
`;

export default function Header({
  handleMenuOnOff,
}: {
  handleMenuOnOff: () => void;
}) {
  return (
    <StyledNav>
      <Menu onClick={handleMenuOnOff} />
      <LogoImage img="/images/logo.png" />
      <NavControl>
        <Partner partnerName="A 가공업체" />
        <Divider />
        <button>로그아웃</button>
      </NavControl>
    </StyledNav>
  );
}
