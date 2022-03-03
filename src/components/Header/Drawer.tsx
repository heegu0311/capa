import styled from "styled-components";
import LogoImage from "./LogoImage";
import Partner from "./Partner";

const Container = styled.div`
  height: 100vh;
  width: 280px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: -280px;
  background: white;
  &.side-drawer {
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
  }
  &.close {
    transform: translateX(0%);
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
`;

const NavControl = styled.div`
  width: 280px;
  height: calc(100vh - 44px);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 24px;
`;

function Drawer({ menuClicked }: { menuClicked: boolean }) {
  return (
    <>
      <Container className={menuClicked ? "side-drawer" : "side-drawer close"}>
        <LogoContainer>
          <LogoImage img="/images/logo_blue.png" />
        </LogoContainer>
        <NavControl>
          <Partner partnerName="파트너정밀가공" />
          <button>로그아웃</button>
        </NavControl>
      </Container>
    </>
  );
}

export default Drawer;
