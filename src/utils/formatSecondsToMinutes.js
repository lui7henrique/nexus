export function FormatSecondsToMinutes(seconds){
  const minutes = Math.floor(seconds / 60);
  const seconds2 = seconds % 60;

  return `${minutes}:${seconds2}`
}