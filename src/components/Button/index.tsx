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

interface Props {
  isToggled: boolean;
}

const SlidingToggle = styled.div<Props>`
  position: relative;
  width: 40px;
  height: 20px;
  margin: 2px 0px;
  padding: 2px 2px;
  div:nth-of-type(1) {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ isToggled }: { isToggled: boolean }): string =>
      isToggled ? "#2196f3" : "#F5F5F5"};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    margin: ${({ isToggled }: { isToggled: boolean }): string =>
      isToggled ? "-3px 0px 0px 17px" : "-3px 0px 0px -3px"};
    transition: 0.5s ease-in-out;

    /* &.target {
      margin: -3px 0px 0px -3px;
      transition: margin 0.3s ease-in-out;
    }

    &.toggled {
      margin: -3px 0px 0px 17px;
    } */
  }
  div:nth-of-type(2) {
    width: 34px;
    height: 14px;
    border-radius: 10px;
    background: ${({ isToggled }: { isToggled: boolean }): string =>
      isToggled ? "#bbdefb" : "#C2C2C2"};
    transition: 0.5s ease-in-out;
  }
`;
type click = {
  isToggled: boolean;
  handleToggleOnOff: () => void;
};
export function SlidingToggleBtn({ isToggled, handleToggleOnOff }: click) {
  return (
    <SlidingToggle isToggled={isToggled} onClick={handleToggleOnOff}>
      <div className="target toggled"></div>
      <div></div>
    </SlidingToggle>
  );
}

export default SlidingToggleBtn;
