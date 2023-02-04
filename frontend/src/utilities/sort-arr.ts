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

export const getAvgSample = (arr: GraphData[]) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + Number(arr[i]);
  }
  const avg = sum / arr.length;
  if (Number.isNaN(avg)) {
    return 0;
  } else {
    const roundNum = Number(Math.round(Number(avg + "e" + 2)) + "e-" + 2);
    return roundNum;
  }
};

export const getHighestAndLowestSamples = (arr: GraphData[]) => {
  let min = 100;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let num = Number(arr[i]);
    if (i === 0) {
      min = num;
      max = num;
    } else {
      if (num < min) {
        min = num;
      }
      if (num > max) {
        max = num;
      }
    }
  }
  const roundMax = Number(Math.round(Number(max + "e" + 2)) + "e-" + 2);
  const roundMin = Number(Math.round(Number(min + "e" + 2)) + "e-" + 2);
  const highstAndLowest = {
    highest: roundMax,
    lowesest: roundMin,
  };
  return highstAndLowest;
};

export const isHighestOrLowestSamples = (
  sample: any,
  highest: number,
  lowest: number
) => {
  let min = lowest;
  let max = highest;

  if (Number(sample) < lowest) {
    min = Number(sample);
  }
  if (Number(sample) > highest) {
    max = Number(sample);
  }

  const roundMin = Number(Math.round(Number(min + "e" + 2)) + "e-" + 2);
  const roundMax = Number(Math.round(Number(max + "e" + 2)) + "e-" + 2);
  const highstAndLowest = {
    highest: roundMax,
    lowesest: roundMin,
  };
  return highstAndLowest;
};
