import { z } from "zod";

export const useMatchSchema = () => {
  return z.object({
    homePlayer: z
      .string()
      .nonempty()
      .array()
      .min(1, "L'équipe à domicile est requise"),
    awayPlayer: z
      .string()
      .nonempty()
      .array()
      .min(1, "L'équipe à l'extérieur est requise"),
  });
};

export type MatchSchema = z.infer<ReturnType<typeof useMatchSchema>>;
