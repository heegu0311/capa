import styled from "styled-components";
import { FiRotateCw } from "react-icons/fi";

const BaseFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
  width: 76px;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid #939fa5;
  &:hover {
    border: 1px solid #2196f3;
  }
`;

const SmallFilter = styled(BaseFilter)`
  width: 76px;
`;

const LargeFilter = styled(BaseFilter)`
  width: 98px;
`;

const TriangleDown = styled.div`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 5px solid #939fa5;
`;

export function SmallFilterBtn({ children }: { children: string }) {
  // TODO : 선택시 색상 필터 배경섹 변경
  return (
    <SmallFilter>
      {children}
      <TriangleDown />
    </SmallFilter>
  );
}

export function LargeFilterBtn({ children }: { children: string }) {
  // TODO : 선택시 색상 필터 배경섹 변경
  return (
    <LargeFilter>
      {children}
      <TriangleDown />
    </LargeFilter>
  );
}

const CheckBoxes = styled.div`
  height: auto;
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  border: 1px solid #939fa5;
  border-radius: 4px;
  padding: 17px 12px;
  gap: 9px;
  z-index: 10;
  background: var(--color-white);
  div {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  input {
    width: 18px;
    height: 18px;
    outline: 0px solid #939fa5;
    border-radius: 4px;
  }

  label {
    margin-left: 10px; //styleName: 14pt - 500;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

export function CheckBoxContainer({
  filterName,
  list,
  filter,
  setFilter,
}: {
  filterName: string;
  list: string[];
  filter: string[];
  setFilter: (active: string[]) => void;
}): JSX.Element {
  const addFilter = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked) filter.push(value);
    else {
      filter.splice(Number(filter.findIndex((el: string) => el === value)), 1);
    }
    setFilter(Array.from(new Set(filter)));
  };

  return (
    <CheckBoxes>
      {list.map(
        (el: string, idx: number): JSX.Element => (
          <div key={el}>
            <input
              type="checkbox"
              id={idx.toString()}
              name={filterName}
              value={el}
              onClick={addFilter}
            />
            <label htmlFor={idx.toString()}>{el}</label>
          </div>
        )
      )}
    </CheckBoxes>
  );
}

const FlexContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2196f3;
  span {
    margin-left: 8px;
  }
`;

export function ResetBtn(): JSX.Element {
  return (
    <FlexContainer>
      <FiRotateCw size={20} />
      <span>필터링 리셋</span>
    </FlexContainer>
  );
}
