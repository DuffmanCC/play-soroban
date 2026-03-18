export function randomNumber(min: number, max: number, includeZero = false) {
  if (includeZero) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (num === 0);
  return num;
}

export function beadsCol(num: number): boolean[] {
  switch (num) {
    case 1:
      return [false, false, true, true, true];

    case 2:
      return [false, false, false, true, true];

    case 3:
      return [false, false, false, false, true];

    case 4:
      return [false, false, false, false, false];

    case 5:
      return [true, true, true, true, true];

    case 6:
      return [true, false, true, true, true];

    case 7:
      return [true, false, false, true, true];

    case 8:
      return [true, false, false, false, true];

    case 9:
      return [true, false, false, false, false];

    default:
      return [false, true, true, true, true];
  }
}
