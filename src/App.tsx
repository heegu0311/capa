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
    width: auto;
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
  const [filteredList, setFilteredList] = useState<RequestData[]>([]);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [method, setMethod] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);

  const materialList: string[] = [
    "알루미늄",
    "탄소강",
    "구리",
    "합금강",
    "강철",
  ];
  const methodList: string[] = ["밀링", "선반"];

  async function getRequests(): Promise<void> {
    try {
      const { data }: { data: RequestData[] } = await axios.get(
        "http://localhost:3000/requests"
      );
      setReqList(data);
    } catch (error) {}
  }

  useEffect((): void => {
    getRequests();
  }, []);

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
        // 교집합
        const reqConditions = req.method.concat(req.material);
        const conditions = method.concat(material);
        if (isSubsetOf(reqConditions, conditions))
          if (toggleClicked) {
            return req.status === "상담중" && req;
          } else return req;
      } else if (method.length && !material.length) {
        // 차집합 (재료)
        if (isSubsetOf(req.method, method)) {
          if (toggleClicked) {
            return req.status === "상담중" && req;
          } else return req;
        }
      } else if (!method.length && material.length) {
        // 차집합 (가공방식)
        if (isSubsetOf(req.material, material)) {
          if (toggleClicked) {
            return req.status === "상담중" && req;
          } else return req;
        }
      } else {
        // 필터 안됨
        if (toggleClicked) {
          return req.status === "상담중" && req;
        } else return req;
      }
      return null;
    });
    setFilteredList(requests);
  }, [material, method, reqList, toggleClicked]);

  return (
    <>
      <Header />
      <Page>
        <FlexContainer>
          <Title>들어온 요청</Title>
          <Desc>파트너에게 딱 맞는 요청서를 찾아보세요.</Desc>{" "}
          <FlexRows>
            <FlexRow>
              <FlexColumnFilter
                onMouseEnter={handleDropdown}
                onMouseLeave={handleDropdown}
              >
                <LargeFilterBtn selected={Boolean(method.length)}>
                  가공방식
                </LargeFilterBtn>
                <CheckBoxContainer
                  filterName="가공방식"
                  visible={dropdown === "가공방식"}
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
                  {material.length ? `재료(${material.length})` : "재료"}
                </SmallFilterBtn>
                <CheckBoxContainer
                  filterName="재료"
                  visible={dropdown?.includes("재료")}
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
              <div>상담중인 요청만 보기</div>
            </FlexRow>
          </FlexRows>
          {filteredList.length ? (
            <Grid>
              {filteredList.map((req) => (
                <Request key={req.id} data={req} />
              ))}
            </Grid>
          ) : (
            <Empty>조건에 맞는 견적 요청이 없습니다.</Empty>
          )}
        </FlexContainer>
      </Page>
    </>
  );
}

export default App;
