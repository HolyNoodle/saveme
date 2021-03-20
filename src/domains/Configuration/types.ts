import { ObjectWithId } from "src/components/EntityList/types";

export interface Configuration {
  isMicrophoneRecorderEnabled?: boolean;
  isGoelocationRecorderEnabled?: boolean;
  isDevicesRecorderEnabled?: boolean;
  timeline?: Array<TimelineItem>;
}
export interface TimelineItem extends ObjectWithId {
  triggerTime: string;
  className: string;
  extra: any;
}