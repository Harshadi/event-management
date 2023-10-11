import { IEvent } from "../interfaces";

export const checkOverlap = (
  start_time: string,
  end_time: string,
  selectedEvents: Array<IEvent>
) => {
  let isOverlap = true;
  if (!selectedEvents.length) return true;
  if (selectedEvents.length === 3) {
    alert("Hey champ sorry, can add max 3 events :(");
    return false;
  }
  selectedEvents.forEach((event: IEvent) => {
    if (
      (event.start_time <= start_time && event.end_time > start_time) ||
      (event.start_time <= end_time && event.end_time > end_time)
    ) {
      isOverlap = false;
      alert("Hey champ! sorry, your timings are overlapping!");
      return false;
    }
  });
  return isOverlap;
};

export const checkSearch = (name: string, searchVal: string) => {
  return name
    .toLowerCase()
    .split(" ")
    .join("")
    .includes(searchVal.toLowerCase().split(" ").join(""));
};
