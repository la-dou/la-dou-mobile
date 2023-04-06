import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import PrimaryTheme from '../theme/Primary';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';
import {adminGetUsers} from '../api/Admin';

type UserCardProps = {
  name: string;
  rating_as_customer: string;
  rating_as_driver: string;
  roll_no: string;
};
const UserCard = (data: UserCardProps) => {
  console.log(typeof data.rating_as_customer);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textBar}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <Text style={styles.textLabel}>Name: </Text>
          <Text style={styles.textStyle}>{data.name}</Text>
        </View>
        {/* add star in driver rating */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <Text style={styles.textLabel}>Customer: </Text>
          <Text style={styles.textStyle}>{data.rating_as_customer}</Text>
          {data.rating_as_customer === 'N/A' ? null : (
            // <Image
            //   source={require('../assets/images/star-filled.png')}
            //   style={{width: 15, height: 15, marginLeft: 5}}
            // />
            <Text>⭐️</Text>
          )}
        </View>

        {/* star */}
      </View>
      <View style={styles.textBar}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <Text style={styles.textLabel}>Roll No: </Text>
          <Text style={[styles.textStyle, {paddingLeft: 4}]}>
            {data.roll_no}
          </Text>
        </View>
        {/* add star in driver rating */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <Text style={styles.textLabel}>Driver: </Text>
          <Text style={styles.textStyle}>{data.rating_as_driver}</Text>
          {data.rating_as_driver === 'N/A' ? null : (
            // <Image
            //   source={require('../assets/images/star-filled.png')}
            //   style={{width: 15, height: 15, marginLeft: 5}}
            // />
            <Text style={{marginLeft: 5, alignSelf: 'flex-start'}}>⭐️</Text>
          )}
        </View>

        {/* star */}
      </View>
    </View>
  );
};

type SearchProps = NativeStackScreenProps<MainStackParamList, 'Search'>;
const Search: React.FC<SearchProps> = () => {
  const [searchVal, setSearchVal] = React.useState('');
  const [userList, setUserList] = React.useState<any>([]);
  const onChangeSetSearchVal = async (val: string) => {
    setSearchVal(val);
    const res = await adminGetUsers(val);
    setUserList(res);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/images/search-icon.png')}
          style={styles.image}
        />
        <TextInput
          // underlineColorAndroid="transparent"
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={PrimaryTheme.colors.primary}
          value={searchVal}
          onChangeText={onChangeSetSearchVal}
        />
      </View>
      {/* scrolll */}

      {userList.map((user: any) => (
        <UserCard {...user} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    marginTop: 90,
  },
  //card stylying
  searchContainer: {
    width: '94%',
    height: 50,
    backgroundColor: PrimaryTheme.colors.card,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  input: {
    height: 40,
    width: '100%',
    // no underline
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',

    color: PrimaryTheme.colors.primary,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  //card stylying
  cardContainer: {
    //scroll

    //for each card
    backgroundColor: '#262626',

    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CB4B47',
    width: '94%',
    height: 100,
    marginTop: 30,

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textBar: {
    //for each row
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    //for content
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    height: 15,
    fontWeight: '600',
    color: PrimaryTheme.colors.primary,
    lineHeight: 14,
    paddingLeft: 10,
  },
  textLabel: {
    //for label
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    height: 15,
    fontWeight: '400',
    color: PrimaryTheme.colors.primary,
    lineHeight: 14,
  },
});

export default Search;
