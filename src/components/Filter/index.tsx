import styled from "styled-components";
import { FiRotateCw } from "react-icons/fi";
import { useEffect, useState } from "react";

interface Props {
  selected: boolean;
}

const BaseFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
  width: 76px;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  letter-spacing: 0px;
  border: 1px solid #939fa5;
  &:hover {
    border: 1px solid #2196f3;
  }
`;

const SmallFilter = styled(BaseFilter)<Props>`
  width: ${({ selected }) => (selected ? "91px" : "76px")};
  background-color: ${({ selected }) => selected && "#1565C0"};
  color: ${({ selected }) => selected && "#ffffff"};
  * {
    border-top: ${({ selected }) =>
      selected ? "5px solid #ffffff" : "5px solid ##939fa5"} !important;
  }
`;

const LargeFilter = styled(BaseFilter)<Props>`
  width: 98px;
  background-color: ${({ selected }) => selected && "#1565C0"};
  color: ${({ selected }) => selected && "#ffffff"};
  * {
    border-top: ${({ selected }) =>
      selected ? "5px solid #ffffff" : "5px solid ##939fa5"} !important;
  }
`;

const TriangleDown = styled.div`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 5px solid #939fa5;
`;

export function SmallFilterBtn({
  children,
  selected,
}: {
  children: string;
  selected: boolean;
}) {
  // TODO : 선택시 색상 필터 배경섹 변경
  return (
    <SmallFilter selected={selected}>
      {children}
      <TriangleDown />
    </SmallFilter>
  );
}

export function LargeFilterBtn({
  children,
  selected,
}: {
  children: string;
  selected: boolean;
}) {
  // TODO : 선택시 색상 필터 배경섹 변경
  return (
    <LargeFilter selected={selected}>
      {children}
      <TriangleDown />
    </LargeFilter>
  );
}

const CheckBoxes = styled.div`
  height: auto;
  width: 130px;
  align-items: start;
  border: 1px solid #939fa5;
  border-radius: 4px;
  padding: 17px 12px;
  z-index: 10;
  background: var(--color-white);
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 9px;
  }
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
  filter,
  list,
  setFilter,
}: {
  filterName: string;
  filter: string[];
  list: string[] | null;
  setFilter: (active: string[]) => void;
}): JSX.Element {
  const [checkedItems, setCheckedItems] = useState<any>(new Set());
  const [bChecked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (filter.length) filter.forEach((el) => checkedItems.add(el));
  }, [checkedItems, filter]);

  const checkedItemHandler = (el: string, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.add(el);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(el)) {
      checkedItems.delete(el);
      setCheckedItems(checkedItems);
    }
    const sorted: string[] = Array.from(checkedItems);
    sorted.sort();
    setFilter(sorted);
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target as HTMLInputElement;
    setChecked(!bChecked);
    checkedItemHandler(value, checked);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <CheckBoxes>
      <form onSubmit={handleSubmit}>
        {list?.map(
          (el: string, idx: number): JSX.Element => (
            <div key={el}>
              {filter.includes(el) ? (
                <input
                  type="checkbox"
                  id={idx.toString()}
                  name={filterName}
                  value={el ?? ""}
                  onChange={checkHandler}
                />
              ) : (
                <input
                  type="checkbox"
                  id={idx.toString()}
                  name={filterName}
                  value={el ?? ""}
                  onChange={checkHandler}
                />
              )}
              <label htmlFor={idx.toString()}>{el}</label>
            </div>
          )
        )}
      </form>
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

export function ResetBtn({
  setMethod,
  setMaterial,
}: {
  setMethod: (active: string[]) => void;
  setMaterial: (active: string[]) => void;
}): JSX.Element {
  return (
    <FlexContainer
      onClick={() => {
        setMethod([]);
        setMaterial([]);
      }}
    >
      <FiRotateCw size={20} />
      <span>필터링 리셋</span>
    </FlexContainer>
  );
}
