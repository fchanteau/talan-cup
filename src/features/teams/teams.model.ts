export type Team = {
  id: string;
  name: string;
};

export const TEAMS: Team[] = [
  { name: "AC Milan", id: "milan" },
  { name: "Arsenal", id: "arsenal" },
  { name: "Aston Villa", id: "aston_villa" },
  { name: "Atalanta", id: "atalanta" },
  { name: "Atlético Madrid", id: "atletico" },
  { name: "Barcelona", id: "barcelona" },
  { name: "Bayern Munich", id: "bayern" },
  { name: "Bayer Leverkusen", id: "leverkusen" },
  { name: "Benfica", id: "benfica" },
  { name: "Bologna", id: "bologna" },
  { name: "Borussia Dortmund", id: "dortmund" },
  { name: "Celtic", id: "celtic" },
  { name: "Club Brugge", id: "brugge" },
  { name: "Crvena Zvezda", id: "red_star" },
  { name: "Dinamo Zagreb", id: "dinamo" },
  { name: "FC Salzburg", id: "salzburg" },
  { name: "Feyenoord", id: "feyenoord" },
  { name: "Girona", id: "girona" },
  { name: "Inter Milan", id: "inter" },
  { name: "Juventus", id: "juventus" },
  { name: "Lille", id: "lille" },
  { name: "Liverpool", id: "liverpool" },
  { name: "Manchester City", id: "man_city" },
  { name: "Monaco", id: "monaco" },
  { name: "Paris-Saint-Germain", id: "psg" },
  { name: "PSV Eindhoven", id: "psv" },
  { name: "RB Leipzig", id: "leipzig" },
  { name: "Real Madrid", id: "real_madrid" },
  { name: "Shakhtar Donetsk", id: "shakhtar" },
  { name: "Slovan Bratislava", id: "slovan" },
  { name: "Sparta Prague", id: "sparta_prague" },
  { name: "Sporting CP", id: "sporting" },
  { name: "Stade Brestois", id: "brest" },
  { name: "Sturm Graz", id: "sturm_graz" },
  { name: "Stuttgart", id: "stuttgart" },
  { name: "Young Boys", id: "young_boys" },
];

export function selectTeamById(id: string): Team | undefined {
  return TEAMS.find((team) => team.id === id);
}
