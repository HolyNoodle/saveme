// React
import React, { useEffect, useRef } from "react";

// Thrid party
import { Animated, Easing, Modal as ReactModal } from "react-native";
import styled from "styled-components/native";
import { SpacedRow } from ".";

const StyleOverlay = styled(Animated.View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyleModalContent = styled(Animated.View)`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  border-color: ${({ theme }) => theme.ACTIVE_COLOR};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  border-width: 1px;
  border-radius: 12px;
`;
const Footer = styled.View`
  width: 100%;
  flex: 0 0 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;
const Content = styled(Animated.View)`
  flex: 1;
  width: 100%;
`;

const Modal = ({ children, actions, visible, ...props }) => {
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const overlayColor = overlayAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"],
  });

  return (
    <ReactModal {...props} visible={visible} animationType={'slide'}>
      <StyleOverlay style={{ backgroundColor: overlayColor }}>
        <StyleModalContent>
          <Content>{children}</Content>
          <Footer>
            <SpacedRow>{actions}</SpacedRow>
          </Footer>
        </StyleModalContent>
      </StyleOverlay>
    </ReactModal>
  );
};

export default Modal;
