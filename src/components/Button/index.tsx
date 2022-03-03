import styled from "styled-components";

export const BaseBtn = styled.button`
  height: 32px;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  font-weight: 500;
`;

export const PrimaryBtn = styled(BaseBtn)`
  width: 108px;
  background: #2196f3;
  color: #ffffff;
`;

export const LinePrimaryBtn = styled(BaseBtn)`
  width: 76px;
  background: #ffffff;
  color: #2196f3;
  border: 1px solid #2196f3;
`;
