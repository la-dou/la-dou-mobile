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
import InfoCard from '../components/InfoCard';

type SearchProps = NativeStackScreenProps<MainStackParamList, 'Search'>;
const Search: React.FC<SearchProps> = () => {
  const [searchVal, setSearchVal] = React.useState('');
  const [userList, setUserList] = React.useState<any>([]);
  const onChangeSetSearchVal = async (val: string) => {
    //console.log(val);
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

      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        {userList.map((item: any, index: any) => {
          return (
            <InfoCard
              //add onPress for eac card to navigate to user profile
              // each item in userList have UserSearch Model (see backend for model)
              // at the moment total amount is kept zero as db does not have amount info
              key={index}
              data={[
                {
                  title: 'Name: ',
                  data: item.name,
                },
                {
                  title: 'Customer: ',
                  data:
                    item.rating_as_customer === 'N/A'
                      ? 'N/A'
                      : item.rating_as_customer + '⭐️',
                },
                {
                  title: 'Roll No: ',
                  data: item.roll_no,
                },
                {
                  title: 'Driver: ',
                  data:
                    item.rating_as_driver === 'N/A'
                      ? 'N/A'
                      : item.rating_as_driver + '⭐️',
                },
              ]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 90,
    width: '100%',
    padding: 20,
  },
  //card stylying
  searchContainer: {
    width: '100%',
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
});

export default Search;
