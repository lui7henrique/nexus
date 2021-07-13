export function formatRank (rank){
  switch(rank){
    case 'IRON':
      return 1;
    case 'BRONZE': 
      return 2;
    case 'SILVER': 
      return 3;
    case 'GOLD': 
      return 4;
    case 'PLATINUM': 
      return 5;
    case 'DIAMOND': 
      return 6;
    case 'MASTER': 
      return 7;
    case 'GRANDMASTER': 
      return 7;
  }
}