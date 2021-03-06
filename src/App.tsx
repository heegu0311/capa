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
import Drawer from "./components/Header/Drawer";

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

const FlexContainer = styled(FlexColumn)`
  min-height: 880px;
  min-width: 1130;
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
  grid-template-columns: 366px 366px 366px;
  gap: 16px;
  ${media.greaterThan("medium")`
    min-width: 1130px;
  `}
  ${media.lessThan("medium")`
    grid-template-columns: auto;
  `}
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 1130px;
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #939fa5;
  ${media.lessThan("medium")`
    width: 366px;
  `}
`;

const DrawerWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: #323d45;
  opacity: 0.5;
  top: 0;
  left: 0;
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
  const [filteredList, setFilteredList] = useState<RequestData[]>([]);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [method, setMethod] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [menuClicked, setMenuClicked] = useState<boolean>(false);

  const materialList: string[] = [
    "????????????",
    "?????????",
    "??????",
    "?????????",
    "??????",
  ];
  const methodList: string[] = ["??????", "??????"];

  async function getRequests(): Promise<void> {
    try {
      const { data }: { data: RequestData[] } = await axios.get(
        "http://localhost:3001/requests"
      );
      setReqList(data);
    } catch (error) {}
  }

  useEffect((): void => {
    getRequests();
  }, []);

  const handleMenuOnOff = (): void => {
    setMenuClicked(!menuClicked);
  };

  const handleDropdown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { textContent } = e.target as HTMLDivElement;
    if (e.type === "mouseleave") setDropdown(null);
    if (e.type === "mouseenter") setDropdown(textContent);
  };

  const isSubsetOf = (base: string[], sample: string[]): boolean => {
    base.sort();
    sample.sort();

    const findItemInSortedArr = (
      item: string,
      arr: string[],
      from: number
    ): number => {
      for (let i = from; i < arr.length; i++) {
        if (item === arr[i]) return i;
        else if (item < arr[i]) return -1;
      }
      return -1;
    };

    let baseIdx = 0;
    for (let i = 0; i < sample.length; i++) {
      baseIdx = findItemInSortedArr(sample[i], base, baseIdx);
      if (baseIdx === -1) return false;
    }
    return true;
  };

  function handleToggleOnOff(): void {
    setToggleClicked(!toggleClicked);
  }

  useEffect(() => {
    const requests = reqList.filter((req) => {
      if (method.length && material.length) {
        // ?????????
        const reqConditions = req.method.concat(req.material);
        const conditions = method.concat(material);
        if (isSubsetOf(reqConditions, conditions))
          if (toggleClicked) {
            return req.status === "?????????" && req;
          } else return req;
      } else if (method.length && !material.length) {
        // ????????? (??????)
        if (isSubsetOf(req.method, method)) {
          if (toggleClicked) {
            return req.status === "?????????" && req;
          } else return req;
        }
      } else if (!method.length && material.length) {
        // ????????? (????????????)
        if (isSubsetOf(req.material, material)) {
          if (toggleClicked) {
            return req.status === "?????????" && req;
          } else return req;
        }
      } else {
        // ?????? ??????
        if (toggleClicked) {
          return req.status === "?????????" && req;
        } else return req;
      }
      return null;
    });
    setFilteredList(requests);
  }, [material, method, reqList, toggleClicked]);

  return (
    <>
      <Header handleMenuOnOff={handleMenuOnOff} />
      <Page>
        <FlexContainer>
          <Title>????????? ??????</Title>
          <Desc>??????????????? ??? ?????? ???????????? ???????????????.</Desc>{" "}
          <FlexRows>
            <FlexRow>
              <FlexColumnFilter
                onMouseEnter={handleDropdown}
                onMouseLeave={handleDropdown}
              >
                <LargeFilterBtn selected={Boolean(method.length)}>
                  ????????????
                </LargeFilterBtn>
                <CheckBoxContainer
                  filterName="????????????"
                  visible={dropdown === "????????????"}
                  filter={method}
                  list={methodList}
                  setFilter={setMethod}
                />
              </FlexColumnFilter>
              <FlexColumnFilter
                onMouseEnter={handleDropdown}
                onMouseLeave={handleDropdown}
              >
                <SmallFilterBtn selected={Boolean(material.length)}>
                  {material.length ? `??????(${material.length})` : "??????"}
                </SmallFilterBtn>
                <CheckBoxContainer
                  filterName="??????"
                  visible={dropdown?.includes("??????")}
                  filter={material}
                  list={materialList}
                  setFilter={setMaterial}
                />
              </FlexColumnFilter>
              <Filter>
                <ResetBtn setMethod={setMethod} setMaterial={setMaterial} />
              </Filter>
            </FlexRow>
            <FlexRow>
              <SlidingToggleBtn
                handleToggleOnOff={handleToggleOnOff}
                isToggled={toggleClicked}
              />
              <div>???????????? ????????? ??????</div>
            </FlexRow>
          </FlexRows>
          {filteredList.length ? (
            <Grid>
              {filteredList.map((req) => (
                <Request key={req.id} data={req} />
              ))}
            </Grid>
          ) : (
            <Empty>????????? ?????? ?????? ????????? ????????????.</Empty>
          )}
        </FlexContainer>
      </Page>
      {menuClicked && <DrawerWrapper onClick={handleMenuOnOff}></DrawerWrapper>}
      <Drawer menuClicked={menuClicked} />
    </>
  );
}

export default App;
