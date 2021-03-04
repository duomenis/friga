import React, {FC, useLayoutEffect, useState} from 'react';
import {View, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {format} from 'date-fns';

import {useData} from '../../DataContext';
import {RootStackParamList} from '../../types';
import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';

import styles from './CreateCounter.styles';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const CreateCounter: FC<ViewProps> = ({navigation}) => {
  const {addCounter} = useData();
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy/MM/dd'));

  useLayoutEffect(() => {
    const handleAddButtonClick = () => {
      addCounter({key: nanoid(), name, date});
      navigation.goBack();
    };

    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={!name || !date}
          onPress={handleAddButtonClick}
          title="Add"
        />
      ),
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()} title="Cancel" />
      ),
    });
  }, [navigation, name, date, addCounter]);

  return (
    <View style={styles.container}>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <DatePicker
        name="datePicker"
        borderless
        value={date}
        placeholder="Date"
        onPress={() => null}
        onChangeText={(_, selectedDate) =>
          selectedDate && setDate(format(selectedDate, 'yyyy/MM/dd'))
        }
      />
    </View>
  );
};

export default CreateCounter;
