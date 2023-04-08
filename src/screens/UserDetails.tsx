import {StyleSheet, Text, View, Switch} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import HrText from '../components/HrText';
import {MainStackParamList} from '../navigation/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {toggleCustomer, toggleDriver} from '../api/Admin';

export type DataRowProps = {
  label: string;
  value?: string;
  customValue?: any;
};
const DataRow: React.FC<DataRowProps> = ({label, value, customValue}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        // flex: 0.5,
        flexDirection: 'row',
        marginVertical: '2.5%',
        marginRight: '2.5%',
      }}>
      <Text
        style={{
          flex: 0.27,
          fontFamily: 'Montserrat-Regular',
          color: colors.primary,
          fontSize: 17,
        }}>
        {label}
      </Text>
      <View
        style={{
          flex: 0.73,
          marginLeft: '2.5%',
        }}>
        {customValue ? (
          customValue
        ) : (
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: colors.primary,
              fontSize: 17,
            }}
            numberOfLines={1}>
            {value}
          </Text>
        )}
      </View>
    </View>
  );
};

type UserDetailsProps = NativeStackScreenProps<
  MainStackParamList,
  'UserDetails'
>;
const UserDetails: React.FC<UserDetailsProps> = ({route}) => {
  const {colors} = useTheme();
  const [driverIsActive, setDriverIsActive] = React.useState<boolean>(
    !route.params.userDetails.deactivated_driver,
  );
  const [customerIsActive, setCustomerIsActive] = React.useState<boolean>(
    !route.params.userDetails.deactivated_customer,
  );
  console.log(route.params.userDetails);
  return (
    <View style={styles.container}>
      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        General Details
      </HrText>

      <DataRow label="Name" value={route.params.userDetails.name} />
      <DataRow
        label="Roll No"
        value={String(route.params.userDetails.roll_no)}
      />
      <DataRow label="Phone" value={route.params.userDetails.phone_number} />

      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Driver Details
      </HrText>
      <DataRow
        label="Status"
        customValue={
          <View
            style={[
              styles.toggleButtonContainer,
              {
                borderColor: driverIsActive ? colors.primary : colors.text,
                backgroundColor: driverIsActive ? colors.primary : colors.text,
              },
            ]}>
            <Switch
              trackColor={{false: colors.text, true: colors.primary}}
              thumbColor={'#000'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={async () => {
                const originalValue = driverIsActive;
                setDriverIsActive(!driverIsActive);
                try {
                  const res = await toggleDriver(
                    route.params.userDetails.roll_no,
                  );
                  console.log(res);
                } catch (error) {
                  console.log(error);
                  setDriverIsActive(originalValue);
                }
              }}
              value={driverIsActive}
              style={styles.toggleButton}
            />
          </View>
        }
      />
      <DataRow
        label="Rating"
        value={route.params.userDetails.rating_as_driver}
      />
      <DataRow
        label="Orders"
        value={String(route.params.userDetails.count_as_driver)}
      />
      <DataRow
        label="Total"
        value={'Rs. ' + String(route.params.userDetails.amount_as_driver)}
      />

      <HrText hrColor={colors.text} textStyle={{color: colors.text}}>
        Customer Details
      </HrText>
      <DataRow
        label="Status"
        customValue={
          <View
            style={[
              styles.toggleButtonContainer,
              {
                borderColor: customerIsActive ? colors.primary : colors.text,
                backgroundColor: customerIsActive
                  ? colors.primary
                  : colors.text,
              },
            ]}>
            <Switch
              trackColor={{false: colors.text, true: colors.primary}}
              thumbColor={'#000'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={async () => {
                const originalValue = customerIsActive;
                setCustomerIsActive(!customerIsActive);
                try {
                  const res = await toggleCustomer(
                    route.params.userDetails.roll_no,
                  );
                  console.log(res);
                } catch (error) {
                  console.log(error);
                  setCustomerIsActive(originalValue);
                }
              }}
              value={customerIsActive}
              style={styles.toggleButton}
            />
          </View>
        }
      />
      <DataRow
        label="Rating"
        value={route.params.userDetails.rating_as_customer}
      />
      <DataRow
        label="# Orders"
        value={String(route.params.userDetails.count_as_customer)}
      />
      <DataRow
        label="Total"
        value={'Rs. ' + String(route.params.userDetails.amount_as_customer)}
      />
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    marginTop: '20%',
  },
  toggleButtonContainer: {
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    width: 50,
  },
  toggleButton: {
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
});
