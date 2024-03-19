import React, {Ref, forwardRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface IFocusableElementProps extends TouchableOpacityProps {
  onBlur?: () => void;
  onFocus?: () => void;
  onFocusOverrideStyle?: StyleProp<ViewStyle>;
  unFocusedOverrideStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  focusedStyle: {
    backgroundColor: "white",
  },
  style: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});
function FocusableElement(
  {
    children,
    onFocusOverrideStyle = {},
    unFocusedOverrideStyle = {},
    onBlur = () => undefined,
    onFocus = () => undefined,
    ...otherProps
  }: IFocusableElementProps,
  ref: Ref<TouchableOpacity>,
) {
  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const blurHandler = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={1}
      onFocus={focusHandler}
      onBlur={blurHandler}
      style={[
        styles.style,
        unFocusedOverrideStyle,
        isFocused ? styles.focusedStyle : {},
        isFocused ? onFocusOverrideStyle : {},
      ]}
      {...otherProps}>
      {children}
    </TouchableOpacity>
  );
}

export default forwardRef(FocusableElement);