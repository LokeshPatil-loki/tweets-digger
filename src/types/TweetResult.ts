import { UserLegacy } from "./UserLegacy";

export type TweetResult = {
  rest_id: string;
  legacy: UserLegacy;
  core: {
    user_results: {
      result: {
        legacy: {
          screen_name: string;
        };
      };
    };
  };
  quoted_status_result?: {
    result: TweetResult;
  };
};
