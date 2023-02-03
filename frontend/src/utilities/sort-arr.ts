import { GraphData } from "../types/graph-component-types";

export const getSortArr = (arr: GraphData[]) => {
  const sortValue = 35;
  if (arr.length > sortValue) {
    const value = arr.length - sortValue;
    const sortArr = arr.slice(value);
    return sortArr;
  }
  return arr;
};

export const getRoundArr = (arr: GraphData[], decimalRound: Number) => {
  let roundArr = [];
  for (let i = 0; i < arr.length; i++) {
    const num = Number(arr[i] + "e" + decimalRound);
    const roundNum = Number(Math.round(num) + "e-" + decimalRound);
    roundArr.push(roundNum);
  }
  return roundArr;
};
