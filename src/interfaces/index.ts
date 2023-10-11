import { MouseEventHandler } from "react";

export interface IButton {
  text: string;
  notSelected?: boolean;
  onClick?: MouseEventHandler;
  disabled: boolean;
}

export interface ICard {
  event: IEvent;
  notSelected?: boolean;
  onClickBtn: Function;
}

export interface IEvent {
  event_category?: string;
  event_name?: string;
  start_time: string;
  end_time: string;
  id?: number;
  selectedEvents?: Array<IEvent>;
  events?: Array<IEvent>;
}

export interface IEventPage {
  isSearched?: boolean;
  allEvents?: Array<IEvent>;
  filterData?: IEvent;
  selectedEvents?: Array<IEvent>;
  loading?: boolean;
}
