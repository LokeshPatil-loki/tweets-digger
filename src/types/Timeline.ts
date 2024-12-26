import { Entry } from "./Entry";

export type Instruction = {
  type: string;
  entries: Entry[];
};

export type Timeline = {
  instructions: Instruction[];
};

export type SearchTimeline = {
  timeline: Timeline;
};

export type SearchByRawQuery = {
  search_timeline: SearchTimeline;
};

export type Data = {
  search_by_raw_query: SearchByRawQuery;
};

export type RootObject = {
  data: Data;
};
