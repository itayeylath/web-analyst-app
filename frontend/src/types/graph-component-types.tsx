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
    decimalRound: number
    sampleRate: number
    webName: string
    sortValue: number
}
export interface CharJSProps {
  graphObj: graphObj
  loading: boolean
}
export interface AvgProps {
  avg: number
}
