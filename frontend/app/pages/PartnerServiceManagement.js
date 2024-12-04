import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Modal, Pressable, Switch, Button } from "react-native";
import { __gstyles__ } from "../globalStylesheet";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const PartnerServiceManagement = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const handleConfirm = async (service, payment) => {
    navigator.navigate("PartnerLocate", {formData,payment: payment, partner: {...formData, legal_name: `${formData.first_name} ${formData.middle_name} ${formData.last_name}`}});
  };
  
  const handleNext = () => {
    navigator.navigate("EWallet", {formData});
  };

  const viewProfile = () => {
    navigator.navigate("Profile", {formData});
  }

  const viewDashboard = () => {
    navigator.navigate("PartnerDashboard", {formData});
  }

  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }

  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const acceptRequest = () => setIsModalVisible(prev => !prev);

  const [service, setService] = useState({
    cashIn: false,
    cashOut: false
  });

  const [schedule, setSchedule] = useState({
    sunday: {toggle: false, am: new Date(), pm: new Date()},
    monday: {toggle: false, am: new Date(), pm: new Date()},
    tuesday: {toggle: false, am: new Date(), pm: new Date()},
    wednesday: {toggle: false, am: new Date(), pm: new Date()},
    thursday: {toggle: false, am: new Date(), pm: new Date()},
    friday: {toggle: false, am: new Date(), pm: new Date()},
    saturday: {toggle: false, am: new Date(), pm: new Date()},
  });

  const toggleCashIn = () => setService(prev => ({...prev, cashIn: !prev.cashIn}));
  const toggleCashOut = () => setService(prev => ({...prev, cashOut: !prev.cashOut}));

  const toggleSunday = () => setSchedule(prev => ({...prev, sunday: {...prev.sunday, toggle: !prev.sunday.toggle}}));
  const toggleMonday = () => setSchedule(prev => ({...prev, monday: {...prev.monday, toggle: !prev.monday.toggle}}));
  const toggleTuesday = () => setSchedule(prev => ({...prev, tuesday: {...prev.tuesday, toggle: !prev.tuesday.toggle}}));
  const toggleWednesday = () => setSchedule(prev => ({...prev, wednesday: {...prev.wednesday, toggle: !prev.wednesday.toggle}}));
  const toggleThursday = () => setSchedule(prev => ({...prev, thursday: {...prev.thursday, toggle: !prev.thursday.toggle}}));
  const toggleFriday = () => setSchedule(prev => ({...prev, friday: {...prev.friday, toggle: !prev.friday.toggle}}));
  const toggleSaturday = () => setSchedule(prev => ({...prev, saturday: {...prev.saturday, toggle: !prev.saturday.toggle}}));

  const [edit, setEdit] = useState(new Date());

  const showMode = (currentMode, day, time) => {
    console.log(day);
    DateTimePickerAndroid.open({
      value: schedule[day][time],
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(selectedDate);
        setSchedule(prev => ({...prev, [day]: {...prev[day], [time]: selectedDate}}))
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = (day, time) => {
    showMode('time', day, time);
  };

  const toggleEditMode = () => setEdit(prev => !prev);

  return (
    <ImageBackground style={{flex: 1}} source={require("../../public/image/background.png")}>
      <View>
        <View style={[styles.header]} className={`flex-row items-center justify-between p-8`}>
            
          <Text className='self-start mt-24'>
            <Text style={styles.text} className='z-50 text-white font-bold'>
              <Text style={{fontSize: 26}}>Service Management{"\n"}</Text>
            </Text>
          </Text>

          
          <Image source={require("../../public/icn/notification-icn.png")}/>
        </View>
        
      </View>


      <View style={[styles.container, {borderTopStartRadius: 100}]}>
        <ScrollView style={{marginTop: 50}}>
          <View style={[styles.header, {flexDirection: 'row'}]}>
            <Text style={{maxWidth: 300, marginRight: 20}} className=' text-primary font-semibold text-xl'>Services</Text>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-8 mb-4'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row'>
                <Image source={require("../../public/icn/cashin.png")}/>
                <Text>
                  <Text className='text-base'>Cash In {"\n"}</Text>
                  <Text className='text-xs'>Available Money: <Text className='text-primary font-bold'>2000.00</Text></Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    ios_backgroundColor="#3e3e3e"
                    thumbColor={service.cashIn ? '#00113f' : '#f4f3f4'}
                    onValueChange={toggleCashIn}
                    value={service.cashIn}
                  >

                  </Switch>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                  <TouchableOpacity onPress={acceptRequest} style={__gstyles__.shadow} className='p-2 px-4 rounded-2xl'>
                    <Text className='text-xs text-primary'>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-8 mb-4'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row'>
                <Image source={require("../../public/icn/cashout.png")}/>
                <Text>
                  <Text className='text-base'>Cash Out {"\n"}</Text>
                  <Text className='text-xs'>Available Money: <Text className='text-primary font-bold'>0.00</Text></Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    ios_backgroundColor="#3e3e3e"
                    thumbColor={service.cashOut ? '#00113f' : '#f4f3f4'}
                    onValueChange={toggleCashOut}
                    value={service.cashOut}
                  >
                  </Switch>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                  <TouchableOpacity onPress={acceptRequest} style={__gstyles__.shadow} className='p-2 px-4 rounded-2xl'>
                    <Text className='text-xs text-primary'>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.header, {flexDirection: 'row'}]}>
            <Text style={{maxWidth: 300, marginRight: 20}} className=' text-primary font-semibold text-xl'>Business Hours</Text>
          </View>
          <View className='border border-gray-400 p-8 gap-4'>
            <Text style={{maxWidth: 300, marginRight: 20}} className=' text-primary font-semibold text-sm'>Set Standard Hours</Text>
            
            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Sunday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.sunday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleSunday}
                  value={schedule.sunday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.sunday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.sunday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("sunday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.sunday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("sunday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.sunday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Monday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.monday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleMonday}
                  value={schedule.monday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.monday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.monday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("monday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.monday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("monday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.monday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Tuesday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.tuesday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleTuesday}
                  value={schedule.tuesday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.tuesday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.tuesday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("tuesday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.tuesday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("tuesday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.tuesday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Wednesday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.wednesday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleWednesday}
                  value={schedule.wednesday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.wednesday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.wednesday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("wednesday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.wednesday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("wednesday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.wednesday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Thursday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.thursday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleThursday}
                  value={schedule.thursday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.thursday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.thursday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("thursday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.thursday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("thursday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.thursday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Friday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.friday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleFriday}
                  value={schedule.friday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.friday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.friday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("friday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.friday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("friday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.friday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', width: '100%'}}>
              <Text style={{maxWidth: 200}} className='text-xs'>Saturday</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  thumbColor={schedule.saturday.toggle ? '#00113f' : '#f4f3f4'}
                  onValueChange={toggleSaturday}
                  value={schedule.saturday.toggle}
                >
                </Switch>
                <Text>
                  {schedule.saturday.toggle ? 'Open' : 'Close'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap:8, opacity: schedule.saturday.toggle ? 1 : 0}}>
                <TouchableOpacity onPress={() => edit ? showTimepicker("saturday", "am") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.saturday.am.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
                <Text>To</Text>
                <TouchableOpacity onPress={() => edit ? showTimepicker("saturday", "pm") : null}>
                  <Text className='px-2 border border-gray-400'>{schedule.saturday.pm.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{justifyContent: 'flex-end', alignItems:"flex-end"}} >

              {!edit ? (
                <TouchableOpacity onPress={toggleEditMode} className='rounded-full px-4' style={[__gstyles__.shadow, {maxWidth: 100, justifyContent: 'center', alignItems: 'center'}]}>
                  <Text className='text-xs text-primary p-2 text-center'>Edit</Text>
                </TouchableOpacity>
              ): (
                <View className='flex-row gap-4 '>
                  <TouchableOpacity onPress={toggleEditMode} className='rounded-full px-4' style={[__gstyles__.shadow, {maxWidth: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00113f'}]}>
                    <Text className='text-xs bg-primary text-white p-2 text-center'>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleEditMode} className='rounded-full px-4' style={[__gstyles__.shadow, {maxWidth: 100, justifyContent: 'center', alignItems: 'center'}]}>
                    <Text className='text-xs text-primary p-2 text-center'>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start' onPress={viewTransactions} >
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} onPress={viewRequests}>
            <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={viewProfile}>
            <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
};

export default PartnerServiceManagement;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
      marginBottom: 20,
  },
  headerText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
  },
  buttonIcon: {
      marginLeft: 10,
  },
  footerBtnContainer: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  footerBtnLabel : {
    maxWidth: 100,
    fontSize: 10
  },
  footer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  resendText: {
      fontSize: 16,
      color: "#007BFF",
      textDecorationLine: "underline",
      marginVertical: 5,
  },
});
