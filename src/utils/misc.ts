export const getNextId = (list: { id: number }[]): number => {
  return list[list.length - 1]?.id + 1 || 1;
}

export const chooseNumeralEnding = (amount: number, one: string, two: string, five: string) => {
  const last = amount % 10;

  if (last === 1) {
    return one;
  }

  if (last > 1 && last < 5) {
    return two;
  }

  return five;
}
