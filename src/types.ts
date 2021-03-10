import {NavigatorScreenParams} from '@react-navigation/native';

/**Navigation types */

export type UntilListStackParamList = {
  UntilList: undefined;
};

export type SinceListStackParamList = {
  SinceList: {since: boolean};
};

export type RootTabParamList = {
  SinceListStack: NavigatorScreenParams<SinceListStackParamList>;
  UntilListStack: NavigatorScreenParams<UntilListStackParamList>;
};

export type RootStackParamList = {
  RootTab: NavigatorScreenParams<RootTabParamList>;
  CreateCounter: undefined;
  EmojiPicker: undefined;
};
/**End Navigation types */

export type Counter = {
  key: string;
  name: string;
  date: string;
};

export type ListItemType = {
  key: string;
  differenceInCalendarDays: number;
} & Counter;
