export type GraphLabels = number | string;
export type GraphData = number | string;

export interface Dataset {
  label: string;
  data: GraphData[] | [];
  backgroundColor: string;
}

export interface graphObj {
  labels: GraphLabels[] | [];
  datasets: Dataset[];
}

export interface GraphProps {
  decimalRound: number;
  sampleRate: number;
  webName: string;
  sortValue: number;
}
export interface CharJSProps {
  graphObj: graphObj;
  loading: boolean;
}
export interface AvgProps {
  avgData: number;
}
export interface HighestsampleProps {
  Highestsample: number;
}
export interface LowestSampleProps {
  LowestSample: number;
}
export interface ButtonRightProps {
  isPaginationRight: boolean;
  handelButtonRight: any;
}
export interface ButtonLeftProps {
  isPaginationLeft: boolean;
  handelButtonLeft: any;
}
export interface ButtonStopProps {
  isStopSample: boolean;
  handelButtonStop: any;
}
export interface ButtonPauseProps {
  isPauseSample: boolean;
  handelButtonPause: any;
}
export interface ButtonStartProps {
  isStartSample: boolean;
  handelButtonStart: any;
}
export interface ButtonEditProps {
  handelButtonEdit: any;
  handelRateChange: any,
  rateValue: string,
  isEditButtun: boolean
}export interface AddGraphProps {
  handelAddButton: any,
  isAddButton: boolean
}