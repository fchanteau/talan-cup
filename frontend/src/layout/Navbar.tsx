import { Container, Flex, Heading, HStack, Square } from "@chakra-ui/react";
import { LuPower } from "react-icons/lu";

import { actionCreators, useAppDispatch, useAppSelector } from "@/common/store";
import { TalanLogo } from "@/components/TalanLogo";
import { isConnected } from "@/features/auth/auth.selector";
import { clearStorage } from "@/features/auth/auth.service";

export function Navbar() {
  const isUserConnected = useAppSelector(isConnected);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(actionCreators.auth.logout());
    clearStorage();
  };

  return (
    <Flex bg="white" position={"sticky"} top={0} zIndex={1000}>
      <Container paddingBlock={4}>
        <HStack justifyContent={"space-between"}>
          <TalanLogo height={"50px"} />
          <Heading as={"h1"} size={"6xl"} color="teal" fontWeight={"bold"}>
            Book a match
          </Heading>
          <HStack gap={6}>
            <Heading as={"h1"} size={"4xl"} color="teal">
              Talan CUP #6
            </Heading>
            {isUserConnected && (
              <Square
                size="10"
                _hover={{
                  bg: "red.600",
                }}
                bg="red.500"
                color="white"
                cursor={"pointer"}
                onClick={onLogout}
              >
                <LuPower />
              </Square>
            )}
          </HStack>
        </HStack>
      </Container>
    </Flex>
  );
}
