import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styled-media-query";
import axios from "axios";

import SlidingToggleBtn from "./components/Button";
import {
  CheckBoxContainer,
  LargeFilterBtn,
  ResetBtn,
  SmallFilterBtn,
} from "./components/Filter";
import Header from "./components/Header/Header";
import Request from "./components/Request";

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
`;

const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: start;
`;

const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

const FlexColumnFilter = styled(FlexColumn)`
  max-width: 98px;
  height: auto;
  flex-direction: column;
  justify-content: start;
  gap: 4px;
  &:nth-of-type(1) {
    max-width: 98px;
  }
  &:nth-of-type(2) {
    max-width: 76px;
  }
`;

const FlexRow = styled(Flex)`
  align-items: start;
  max-height: 32px;

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
    margin-bottom: 64px;
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

const Filter = styled(FlexCenter)`
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 16px;
  ${media.greaterThan("medium")`
    min-width: 1130px;
  `}
  ${media.lessThan("medium")`
    grid-template-columns: auto;
  `}
`;

interface RequestData {
  amount: number;
  client: string;
  count?: number;
  docs?: number;
  due: string;
  id: number;
  material: string[];
  method: string[];
  status: string;
  title: string;
}

function App() {
  const [toggleClicked, setToggleClicked] = useState<boolean>(false);
  const [reqList, setReqList] = useState<RequestData[]>([]);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [method, setMethod] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);

  function handleToggleOnOff(): void {
    setToggleClicked(!toggleClicked);
  }

  const materialList: string[] = [
    "알루미늄",
    "탄소강",
    "구리",
    "합금강",
    "강철",
  ];
  const process: string[] = ["밀링", "선반"];

  useEffect((): void => {
    async function getRequests(): Promise<void> {
      try {
        const { data }: { data: RequestData[] } = await axios.get(
          "http://localhost:3000/requests"
        );
        setReqList(data);
      } catch (error) {}
    }
    getRequests();
  }, []);

  const handleDropdown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { textContent } = e.target as HTMLDivElement;
    if (e.type === "mouseleave") setDropdown(null);
    if (e.type === "mouseenter") setDropdown(textContent);
  };

  return (
    <>
      <Header />
      <Page>
        <FlexColumn>
          <Title>들어온 요청</Title>
          <Desc>파트너에게 딱 맞는 요청서를 찾아보세요.</Desc>{" "}
          <FlexRows>
            <FlexRow>
              <FlexColumnFilter
                onMouseEnter={handleDropdown}
                onMouseLeave={handleDropdown}
              >
                <LargeFilterBtn>가공방식</LargeFilterBtn>
                {dropdown === "가공방식" && (
                  <CheckBoxContainer
                    filterName={dropdown}
                    list={process}
                    filter={method}
                    setFilter={setMethod}
                  />
                )}
              </FlexColumnFilter>
              <FlexColumnFilter
                onMouseEnter={handleDropdown}
                onMouseLeave={handleDropdown}
              >
                <SmallFilterBtn>재료</SmallFilterBtn>
                {dropdown === "재료" && (
                  <CheckBoxContainer
                    filterName={dropdown}
                    list={materialList}
                    filter={material}
                    setFilter={setMaterial}
                  />
                )}
              </FlexColumnFilter>
              <Filter>
                <ResetBtn />
              </Filter>
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
            {reqList.map((el) => {
              return <Request key={el.id} data={el} />;
            })}
          </Grid>
        </FlexColumn>
      </Page>
    </>
  );
}

export default App;
