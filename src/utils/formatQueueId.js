export function FormatQueueId(queueId){
  switch(queueId){
    case(420):
      return "SOLO/DUO"
    case(440):
      return "FLEX"
    case(450):
      return "ARAM"
    case(1400):
      return "ULTRABOOK"
    default: 
      return queueId
  }
}