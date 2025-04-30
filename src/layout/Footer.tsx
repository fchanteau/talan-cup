import {
  Container,
  HStack,
  Icon,
  Link,
  Stack,
  type TextProps,
  Text,
  Box,
} from "@chakra-ui/react";
import { LuGithub, LuLinkedin, LuX } from "react-icons/lu";

import { TalanLogo } from "@/components/TalanLogo";

export function Footer() {
  return (
    <Box as={"footer"} bgColor={"teal"} marginTop={4}>
      <Container padding={5}>
        <Stack gap="6">
          <Stack direction="row" justify="space-between" align="center">
            <TalanLogo height="50px" />
            <HStack gap="4">
              {socialLinks.map(({ href, icon }, index) => (
                <Link
                  key={index}
                  href={href}
                  colorPalette="white"
                  target="_blank"
                >
                  <Icon size="md">{icon}</Icon>
                </Link>
              ))}
            </HStack>
          </Stack>
          <Copyright />
        </Stack>
      </Container>
    </Box>
  );
}

const socialLinks = [
  { href: "https://x.com", icon: <LuX /> },
  { href: "https://github.com/fchanteau", icon: <LuGithub /> },
  {
    href: "https://www.linkedin.com/in/fran%C3%A7ois-chanteau-2ab742153/",
    icon: <LuLinkedin />,
  },
];

const Copyright = (props: TextProps) => {
  return (
    <Text fontSize="sm" color="fg.muted" {...props}>
      &copy; {new Date().getFullYear()} Logo, Inc. All rights reserved.
    </Text>
  );
};
