import {
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  Button,
} from "@chakra-ui/react";

import type {
  MenuProps,
  MenuButtonProps,
  MenuListProps,
  MenuItemProps,
} from "@chakra-ui/react";
import Icon from "./Icon";

export function Menu({ children, ...props }: MenuProps) {
  return <ChakraMenu {...props}>{children}</ChakraMenu>;
}

export function MenuButton({ children, ...props }: MenuButtonProps) {
  return (
    <ChakraMenuButton
      as={Button}
      borderWidth={2}
      borderColor={"gray.200"}
      rounded={"none"}
      rightIcon={<Icon name='Dropdown' />}
      {...props}
    >
      {children}
    </ChakraMenuButton>
  );
}

export function MenuList({ children, ...props }: MenuListProps) {
  return (
    <ChakraMenuList
      borderWidth={2}
      borderColor={"gray.200"}
      rounded={"none"}
      {...props}
    >
      {children}
    </ChakraMenuList>
  );
}

export function MenuItem({ children, ...props }: MenuItemProps) {
  return <ChakraMenuItem {...props}>{children}</ChakraMenuItem>;
}
