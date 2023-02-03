import { GraphData } from "../types/graph-component-types";

export const getSortArr = (arr: GraphData[],sortValue: number) => {
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

export const getSortArrLeft = (arr: GraphData[], sortValue: number,index: number) => {
    if ((index - 10) > 0) {
        const value = index - 10;
        const sortArr = arr.slice(value);
        return sortArr;
      }
      return arr;
  };

  export const getSortArrRight= (arr: GraphData[], sortValue: number,index: number) => {
    if ((index + 10) < arr.length) {
        const value = index + 10;
        const sortArr = arr.slice(value);
        return sortArr;
      }
      return arr;
  };
