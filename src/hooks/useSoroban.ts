import { beadsCol } from "../tools/helpers";

export default function useSoroban(data: number, columns: number) {
  const value = [false, true, true, true, true];
  const beads = Array(columns)
    .fill(null)
    .map(() => [...value]);

  data
    .toString()
    .split("")
    .reverse()
    .forEach((num, i) => {
      beads[i] = beadsCol(parseInt(num));
    });

  return {
    beads,
    sorobanSize: columns,
  };
}
