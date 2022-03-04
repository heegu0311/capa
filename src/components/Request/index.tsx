import styled from "styled-components";
import { LinePrimaryBtn, PrimaryBtn } from "../Button";
import { Status } from "../Status";

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
  display: flex;
  justify-content: space-between;
  align-items: start;
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
  th {
    display: none;
  }
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

function Request({ data }: { data: RequestData }) {
  return (
    <Container>
      <Title>
        {data.title}
        {data.status === "상담중" && <Status>상담중</Status>}
      </Title>
      <Partner>{data.client}</Partner>
      <Due>{data.due}</Due>
      <Divider />
      <RequestTable>
        <tbody>
          <tr>
            <td>도면개수</td>
            <td>{`${data.docs || data.count}개`}</td>
          </tr>
          <tr>
            <td>총 수량</td>
            <td>{`${data.amount}개`}</td>
          </tr>
          <tr>
            <td>가공방식</td>
            <td>{data.method.join(", ")}</td>
          </tr>
          <tr>
            <td>재료</td>
            <td>{data.material.join(", ")}</td>
          </tr>
        </tbody>
      </RequestTable>
      <FlexContainer>
        <PrimaryBtn>요청 내역 보기</PrimaryBtn>
        <LinePrimaryBtn>채팅하기</LinePrimaryBtn>
      </FlexContainer>
    </Container>
  );
}

export default Request;
