import { BiBuildings } from "react-icons/bi";
import styled from "styled-components";

const Container = styled.div`
  min-width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Partner = ({ partnerName }: { partnerName: string }) => {
  return (
    <Container>
      <BiBuildings />
      <div>{partnerName}</div>
    </Container>
  );
};

export default Partner;
