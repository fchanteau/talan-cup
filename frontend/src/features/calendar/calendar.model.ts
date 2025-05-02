import { z } from "zod";

export const useMatchSchema = () => {
  return z.object({
    homeTeam: z.string().nonempty("L'équipe à domicile est requise").array(),
    homePlayer: z.string().nonempty("Le joueur à domicile est requis"),
    awayTeam: z.string().nonempty("L'équipe à l'extérieur est requise").array(),
    awayPlayer: z.string().nonempty("Le joueur à l'extérieur est requis"),
  });
};

export type MatchSchema = z.infer<ReturnType<typeof useMatchSchema>>;
