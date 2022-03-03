import styled from "styled-components";

const BaseFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
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
    <>
      <SmallFilter>
        {children}
        <TriangleDown />
      </SmallFilter>
    </>
  );
}

export function LargeFilterBtn({ children }: { children: string }) {
  // TODO : 선택시 색상 필터 배경섹 변경
  return (
    <>
      <LargeFilter>
        {children}
        <TriangleDown />
      </LargeFilter>
    </>
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

export function CheckBoxContainer({ list }: { list: string[] }): JSX.Element {
  return (
    <CheckBoxes>
      {list.map(
        (el: string, idx: number): JSX.Element => (
          <div>
            <input
              type="checkbox"
              id={idx.toString()}
              name="vehicle1"
              value="Bike"
            />
            <label htmlFor={idx.toString()}>{el}</label>
          </div>
        )
      )}
    </CheckBoxes>
  );
}
