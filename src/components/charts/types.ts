import { WeatherData } from "../../hooks/useWeatherData";

export interface DataRecord {
  [key: string]: string | number;
}

export interface Dimensions {
  height: number;
  width: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface BoundedDimensions extends Dimensions {
  boundedWidth: number;
  boundedHeight: number;
}

export type AccessorFunction<DataType> = (d: DataRecord) => DataType;
export type ScaledAccessorFunction = (d: DataRecord) => number;

//? Get the metrics from WeatherData which return a number
//? https://stackoverflow.com/questions/56863875/typescript-how-do-you-filter-a-types-properties-to-those-of-a-certain-type
export type NumberDataMetric<TDataSet> = {
  [K in keyof TDataSet]-?: TDataSet[K] extends number ? K : never;
}[keyof TDataSet];

export type StringDataMetric<TDataSet> = {
  [K in keyof TDataSet]-?: TDataSet[K] extends string ? K : never;
}[keyof TDataSet];
