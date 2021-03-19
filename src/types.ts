import {NavigatorScreenParams} from '@react-navigation/native';
import nodeEmoji from 'node-emoji';

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
  CreateCounter: {icon?: keyof typeof nodeEmoji.emoji};
  EditCounter: {counter: Counter};
  EmojiPicker: undefined;
};
/**End Navigation types */

export type Counter = {
  key: string;
  icon: keyof typeof nodeEmoji.emoji;
  name: string;
  date: string;
};

export type ListItemType = {
  key: string;
  differenceInCalendarDays: number;
} & Counter;

export type scheme = 'light' | 'dark';
