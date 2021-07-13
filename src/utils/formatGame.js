export function FormatGame(gameType) {
  switch(gameType){
    case 'RANKED_FLEX_SR':
      return "FLEX";
    case 'RANKED_SOLO_5x5': 
      return "SOLO/DUO";
  }
}