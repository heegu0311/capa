import styled from "styled-components";
import { LinePrimaryBtn, PrimaryBtn } from "../Button";

const Container = styled.div`
  height: 356px;
  width: 366px;
  border-radius: 4px;
  padding: 24px 16px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  &:hover {
    border: 1px solid #2196f3;
  }
`;

const Title = styled.div`
  height: 24px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const Partner = styled.div`
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const Due = styled.div`
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #939fa5;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  height: 0px;
  border-bottom: 1px solid #e5e5e5;
`;

const RequestTable = styled.table`
  width: 334px;
  height: auto;
  border-spacing: 0px 8px;
  margin: 24px 0px;
  font-size: 14px;
  tr {
    height: 20px;
    width: 334px;
    td:nth-of-type(1) {
      font-weight: 400;
      width: 102px;
    }
    td:nth-of-type(2) {
      font-weight: 700;
      width: 232px;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
`;

function Request() {
  return (
    <Container>
      <Title>자동차 시제품 제작</Title>
      <Partner>A 고객사</Partner>
      <Due>2020.12.14까지 납기</Due>
      <Divider />
      <RequestTable>
        <tr>
          <td>도면개수</td>
          <td>2개</td>
        </tr>
        <tr>
          <td>총 수량</td>
          <td>100개</td>
        </tr>
        <tr>
          <td>가공방식</td>
          <td>밀링, 선반</td>
        </tr>
        <tr>
          <td>재료</td>
          <td>알루미늄</td>
        </tr>
      </RequestTable>
      <FlexContainer>
        <PrimaryBtn>요청 내역 보기</PrimaryBtn>
        <LinePrimaryBtn>채팅하기</LinePrimaryBtn>
      </FlexContainer>
    </Container>
  );
}

export default Request;
