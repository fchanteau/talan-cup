import { Container, Flex, Heading, HStack } from "@chakra-ui/react";

import { TalanLogo } from "@/components/TalanLogo";

export function Navbar() {
  return (
    <Flex bg="white" position={"sticky"} top={0} zIndex={1000}>
      <Container paddingBlock={4}>
        <HStack justifyContent={"space-between"}>
          <TalanLogo height={"50px"} />
          <Heading as={"h1"} size={"6xl"} color="teal" fontWeight={"bold"}>
            Book a match
          </Heading>
          <Heading as={"h1"} size={"4xl"} color="teal">
            Talan CUP #6
          </Heading>
        </HStack>
      </Container>
    </Flex>
  );
}
