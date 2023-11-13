import React from "react";
import styled from "styled-components";

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return <ButtonStyled onClick={onClick}>{text}</ButtonStyled>;
};
const ButtonStyled = styled.div`
  background-color: red;
`;

export default Button;
