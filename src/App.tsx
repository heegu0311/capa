import { useState } from "react";
import styled from "styled-components";
import media from "styled-media-query";

import SlidingToggleBtn, {
  LinePrimaryBtn,
  PrimaryBtn,
} from "./components/Button";
import {
  CheckBoxContainer,
  LargeFilterBtn,
  ResetBtn,
  SmallFilterBtn,
} from "./components/Filter";
import Header from "./components/Header/Header";
import Request from "./components/Request";
import { Status } from "./components/Status";

const Page = styled.div`
  height: calc(100vh - 70px);
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.lessThan("medium")`
    height: calc(100vh - 44px);
    align-items: start;
  `}
`;

const Flex = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

const FlexColumnFilter = styled(FlexColumn)`
  max-width: 98px;
  max-height: 32px;
  flex-direction: column;
  justify-content: start;
  gap: 4px;
`;

const FlexRow = styled(Flex)`
  align-items: center;
  gap: 8px;
  div {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;

const FlexRows = styled(FlexRow)`
  gap: 20px;
  width: 100%;
  margin: 32px 0px;
  justify-content: space-between;
  ${media.lessThan("medium")`  
    align-items: start;
    flex-direction: column;
  `}
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  ${media.lessThan("medium")`
    padding-top:24px;
  `}
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 16px;
  ${media.lessThan("medium")`
    grid-template-columns: auto;
  `}
`;

function App() {
  const [toggleClicked, setToggleClicked] = useState<boolean>(false);

  const handleToggleOnOff = (): void => {
    setToggleClicked(!toggleClicked);
  };

  const materialList: string[] = [
    "알루미늄",
    "탄소강",
    "구리",
    "합금강",
    "강철",
  ];
  const process: string[] = ["밀링", "선반"];

  return (
    <>
      <Header></Header>
      <Page>
        <FlexColumn>
          <Title>들어온 요청</Title>
          <Desc>파트너에게 딱 맞는 요청서를 찾아보세요.</Desc>{" "}
          <FlexRows>
            <FlexRow>
              <FlexColumnFilter>
                <LargeFilterBtn>가공방식</LargeFilterBtn>
                {/* <CheckBoxContainer list={process} /> */}
              </FlexColumnFilter>
              <FlexColumnFilter>
                <SmallFilterBtn>재료</SmallFilterBtn>
                {/* <CheckBoxContainer list={materialList} /> */}
              </FlexColumnFilter>
            </FlexRow>
            <FlexRow>
              <SlidingToggleBtn
                handleToggleOnOff={handleToggleOnOff}
                isToggled={toggleClicked}
              />
              <div>상담중인 요청만 보기</div>
            </FlexRow>
          </FlexRows>
          <Grid>
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
            <Request />
          </Grid>
          {/* <>
<Header></Header>
<PrimaryBtn>요청 내역 보기</PrimaryBtn>
<LinePrimaryBtn>채팅하기</LinePrimaryBtn>
<Status>상담중</Status>
<ResetBtn />
</> */}
        </FlexColumn>
      </Page>
    </>
  );
}

export default App;
