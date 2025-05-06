import { z } from "zod";

export const useMatchSchema = () => {
  return z.object({
    awayPlayer: z.string().nonempty("L'équipe à l'extérieur est requise"),
  });
};

export type MatchSchema = z.infer<ReturnType<typeof useMatchSchema>>;
