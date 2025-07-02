import { Button, Card, Center, Field, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useLoginMutation } from "../auth.api";
import { type LoginSchema, useLoginSchema } from "../auth.model";
import { setToken } from "../auth.service";

import { actionCreators, useAppDispatch } from "@/common/store";
import { useToasterHandleError } from "@/hooks/useToaster";
import { type LoginRequest } from "@/types/TalanCupApi";

export function Login() {
  const dispatch = useAppDispatch();
  const loginSchema = useLoginSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const loginResponse = await login({
        login: data.login,
      } as LoginRequest).unwrap();

      setToken(loginResponse.token);
      dispatch(actionCreators.auth.login(loginResponse.playerId));
    } catch (error) {
      handleError(error!);
      reset();
    }
  };

  const handleError = useToasterHandleError();

  return (
    <Center flex={1}>
      <Card.Root>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Field.Root invalid={!!errors.login}>
                <Field.Label>Nom d'utilisateur</Field.Label>
                <Input {...register("login")} />
                <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
              </Field.Root>
              <Button type="submit" loading={isLoading}>
                Valider
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
