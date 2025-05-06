import { z } from "zod";

export const useLoginSchema = () => {
  return z.object({
    login: z.string().nonempty("Le nom d'utilisateur est requis"),
  });
};

export type LoginSchema = z.infer<ReturnType<typeof useLoginSchema>>;

export interface AuthState {
  isConnected: boolean;
  playerId?: string;
}
