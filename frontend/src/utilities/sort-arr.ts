import { GraphData } from "../types/graph-component-types";

export const getSortArr = (arr: GraphData[], sortValue: number) => {
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

export const getSortArrLeft = (
  arr: GraphData[],
  sortValue: number,
  index: number
) => {
  if (index - 10 > 0) {
    const value = index - 10;
    const sortArr = arr.slice(value);
    return sortArr;
  }
  return arr;
};

export const getSortArrRight = (
  arr: GraphData[],
  sortValue: number,
  index: number
) => {
  if (index + 10 < arr.length) {
    const value = index + 10;
    const sortArr = arr.slice(value);
    return sortArr;
  }
  return arr;
};

export const getAvgArr = (arr: GraphData[], index: number) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + Number(arr[i]);
  }
  const avg = sum / index;
  if (Number.isNaN(avg)) {
      return 0;
  } else {
    const num = Number(avg + "e" + 3);
    const roundNum = Number(Math.round(num) + "e-" + 3);
    return avg;
  }
};
