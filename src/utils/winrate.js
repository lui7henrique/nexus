import { aroundNumber } from "./aroundNumber";

export function winRate(wins, losses){
  const total = wins + losses 
  const winrate = wins * 100 / total 
  
  return aroundNumber(winrate, 1);
}