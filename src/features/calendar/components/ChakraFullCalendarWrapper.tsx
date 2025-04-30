import { Box } from "@chakra-ui/react";

export function ChakraFullCalendarWrapper(props: React.PropsWithChildren) {
  const bgColor = "colors.white";
  const borderColor = "colors.gray.200";
  const todayBgColor = "colors.teal.50";
  const eventBgColor = "colors.teal.500";
  const eventTextColor = "colors.white";
  const hoveredBg = "colors.gray.100";

  return (
    <Box
      css={{
        "--fc-border-color": borderColor,
        "--fc-page-bg-color": bgColor,
        "--fc-neutral-bg-color": bgColor,
        "--fc-today-bg-color": todayBgColor,
        "--fc-event-bg-color": eventBgColor,
        "--fc-event-border-color": eventBgColor,
        "--fc-event-text-color": eventTextColor,
        "--fc-list-event-hover-bg-color": hoveredBg,
        "--fc-button-text-color": eventTextColor,
        "--fc-button-bg-color": "colors.teal.500",
        "--fc-button-border-color": "colors.teal.500",
        "--fc-button-hover-bg-color": "colors.teal.600",
        "--fc-button-hover-border-color": "colors.teal.600",
        "--fc-button-active-bg-color": "colors.teal.600",
        "--fc-button-active-border-color": "colors.teal.600",
      }}
    >
      {props.children}
    </Box>
  );
}
