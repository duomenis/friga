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
  CreateEvent: undefined;
  EditEvent: {event: Event};
  EmojiPicker: {onSelect: ({value}: {value: Icon}) => void};
};
/**End Navigation types */

export type Icon = keyof typeof nodeEmoji.emoji;

export type Event = {
  key: string;
  icon: Icon;
  name: string;
  date: string;
};

export type ListItemType = {
  key: string;
  differenceInCalendarDays: number;
} & Event;

export type scheme = 'light' | 'dark';
