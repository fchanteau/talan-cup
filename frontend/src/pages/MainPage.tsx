import { Container } from "@chakra-ui/react";

import { useAppSelector } from "@/common/store";
import { isConnected } from "@/features/auth/auth.selector";
import { Login } from "@/features/auth/components/Login";
import Calendar from "@/features/calendar/components/Calendar";

export default function MainPage() {
  const isUserConnected = useAppSelector(isConnected);

  if (isUserConnected) {
    return (
      <Container maxWidth={"6xl"} marginTop={4}>
        <Calendar />
      </Container>
    );
  }

  return <Login />;
}
