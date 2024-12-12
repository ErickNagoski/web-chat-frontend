import styled from "styled-components";

export const MessageContainer = styled.div < { myMessage: boolean } > `
  align-items: center;
  display: flex;
  justify-content: ${(props) => (props.myMessage ? "flex-end" : "flex-start")};
`;

interface BubbleProps {
  user: boolean;
  isFirst: boolean;
  isLast: boolean;
  showAvatar?: boolean;
}

export const Bubble = styled.div<BubbleProps>`
  animation: 10ms 0.3s ease forwards;
  background-color: ${(props) => {
    return props.user ? "#80bfff" : "#f5f6f7";
  }};
  border-radius: ${(props) => {
    const { isFirst, isLast, user } = props;

    if (!isFirst && !isLast) {
      return user ? "18px 0 0 18px" : "0 18px 18px 0px";
    }

    if (!isFirst && isLast) {
      return user ? "18px 0 18px 18px" : "0 18px 18px 18px";
    }

    return props.user ? "18px 18px 0 18px" : "18px 18px 18px 0";
  }};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${(props) => {
    return props.user ? "#fff" : "#000";
  }};
  display: inline-block;
  font-size: 14px;
  max-width: 50%;
  min-width: 100px;
  margin: ${(props) => {
    const { isFirst, showAvatar, user } = props;

    if (!isFirst && showAvatar) {
      return user ? "-8px 46px 10px 0" : "-8px 0 10px 46px";
    }

    if (!isFirst && !showAvatar) {
      return user ? "-8px 0px 10px 0" : "-8px 0 10px 0px";
    }

    return "0 0 10px 0";
  }};
  overflow: hidden;
  position: relative;
  padding: 12px;
  transform: scale(1);
  transform-origin: ${(props) => {
    const { isFirst, user } = props;

    if (isFirst) {
      return user ? "bottom right" : "bottom left";
    }

    return user ? "top right" : "top left";
  }};
`;
