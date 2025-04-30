import { z } from "zod";

export const useMatchSchema = () => {
  return z.object({
    startDate: z.date(),
    endDate: z.date(),
    homeTeam: z.array(z.string().nonempty("L'équipe à domicile est requise")),
    homePlayer: z.string().nonempty("Le joueur à domicile est requis"),
    awayTeam: z.array(
      z.string().nonempty("L'équipe à l'extérieur est requise")
    ),
    awayPlayer: z.string().nonempty("Le joueur à l'extérieur est requis"),
  });
};

export type MatchSchema = z.infer<ReturnType<typeof useMatchSchema>>;
