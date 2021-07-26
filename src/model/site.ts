
export interface Site {
  id:                    string;
  name:                  string;
  deviceId:              string;
  projectReference:      string;
  productCode:           string;
  gps:                   Gps;
  firmwareVersion:       string;
  signal:                number;
  battery:               number;
  uploadFrequencyMinute: number;
  nextTelemetry:         string;
  lastTelemetry:         string;
  status:                string;
  inputs:                Input[];
}

export interface Gps {
  latitude:  number;
  longitude: number;
}

export interface Input {
  id:                     string;
  name:                   string;
  logicalName:            null | string;
  type:                   Type | null;
  terminalPosition:       number | null;
  calibration:            Calibration[] | null;
  unit:                   null | string;
  loggingIntervalSeconds: number | null;
  timeseries:             Timesery[];
  truncated:              boolean;
}

export interface Calibration {
  Key:   string;
  Value: string;
}

export interface Timesery {
  dateTime: Date;
  value:    number;
}

export enum Type {
  Analog = "Analog",
  CalculatedInput = "Calculated Input",
  Counter = "Counter",
  Sdi12 = "SDI12",
}
