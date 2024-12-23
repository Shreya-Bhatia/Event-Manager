import { Time } from "@internationalized/date";

export interface Event {
  name: string;
  description: string;
  startTime: Time;
  endTime: Time;
}
