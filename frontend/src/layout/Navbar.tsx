import {
  Container,
  Flex,
  Heading,
  HStack,
  Square,
  IconButton,
  VStack,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  Portal,
  Show,
  Button,
} from "@chakra-ui/react";
import { LuPower, LuMenu } from "react-icons/lu";

import { actionCreators, useAppDispatch, useAppSelector } from "@/common/store";
import { toaster } from "@/components/chakra/toaster";
import { TalanLogo } from "@/components/TalanLogo";
import { isConnected } from "@/features/auth/auth.selector";
import { clearStorage } from "@/features/auth/auth.service";

export function Navbar() {
  const isUserConnected = useAppSelector(isConnected);
  const dispatch = useAppDispatch();
  const { open, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const onLogout = () => {
    clearStorage();
    dispatch(actionCreators.auth.logout());
    toaster.create({
      title: "Déconnexion réussie",
      type: "success",
    });
    onClose();
  };

  return (
    <Flex bg="white" position={"sticky"} top={0} zIndex={1000}>
      <Container paddingBlock={4}>
        <HStack justifyContent={"space-between"}>
          <TalanLogo height={"50px"} />

          <Show when={!isMobile}>
            <Heading as={"h1"} size={"6xl"} color="teal" fontWeight={"bold"}>
              Book a match
            </Heading>
          </Show>
          {/* Menu desktop */}
          <Show when={!isMobile}>
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
          </Show>
          <Show when={isMobile}>
            <IconButton
              aria-label="Menu"
              onClick={onOpen}
              variant="ghost"
              colorScheme="teal"
            >
              <LuMenu size={24} />
            </IconButton>
          </Show>
        </HStack>
      </Container>

      {/* Drawer pour menu mobile */}
      <Drawer.Root open={open} placement="end" onOpenChange={onClose}>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Body>
                <VStack gap={6} align="stretch">
                  <TalanLogo />
                  <Heading as={"h1"} size={"md"} color="teal">
                    Talan CUP #6
                  </Heading>

                  {isUserConnected && (
                    <Button colorPalette={"red"} onClick={onLogout}>
                      <LuPower />
                      Déconnexion
                    </Button>
                  )}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  );
}
