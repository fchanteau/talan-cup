import { Container } from "@chakra-ui/react";

import Calendar from "@/features/calendar/components/Calendar";

export default function MainPage() {
  return (
    <Container maxWidth={"6xl"} marginTop={4}>
      <Calendar />
    </Container>
  );
}
