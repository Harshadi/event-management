import { MouseEventHandler } from "react";

export interface IButton {
  text: string;
  notSelected?: boolean;
  onClick?: MouseEventHandler;
}

export interface ICard {
  event: IEvent;
  notSelected?: boolean;
  onClickBtn: Function;
}

interface IEvent {
  event_category: string;
  event_name: string;
  start_time: string;
  end_time: string;
  id: number;
}

export interface IEventPage {
  eventData: Array<IEvent>;
}
