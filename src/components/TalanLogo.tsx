import { Image, type ImageProps } from "@chakra-ui/react";

import talanLogo from "../assets/talan-logo.svg";

export function TalanLogo(props: ImageProps) {
  return <Image src={talanLogo} alt="Talan Logo" {...props} />;
}
