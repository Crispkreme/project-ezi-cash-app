import React, { useEffect, useState } from 'react';
import { __gstyles__ } from "../globalStylesheet";
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function BusinessHour({ formData }) {

    const [edit, setEdit] = useState(false);
    const [schedule, setSchedule] = useState({
        sunday: { toggle: false, am: new Date(), pm: new Date() },
        monday: { toggle: false, am: new Date(), pm: new Date() },
        tuesday: { toggle: false, am: new Date(), pm: new Date() },
        wednesday: { toggle: false, am: new Date(), pm: new Date() },
        thursday: { toggle: false, am: new Date(), pm: new Date() },
        friday: { toggle: false, am: new Date(), pm: new Date() },
        saturday: { toggle: false, am: new Date(), pm: new Date() },
    });

    useEffect(() => {
      const getDt = async () => {
        const res = await fetch(`${process.env.BASE_URL}/get-business-hours/` + formData.user_detail_id);

        if(res.ok) {
          const body = await res.json();
          const dt = [...body.data];

          const sunday = dt.filter(d => d.day === 'Sunday');
          const monday = dt.filter(d => d.day === 'Monday');
          const tuesday = dt.filter(d => d.day === 'Tuesday');
          const wednesday = dt.filter(d => d.day === 'Wednesday');
          const thursday = dt.filter(d => d.day === 'Thursday');
          const friday = dt.filter(d => d.day === 'Friday');
          const saturday = dt.filter(d => d.day === 'Saturday');

          console.log(sunday);
          const sundayOpenDt = new Date();
          const sundayCloseDt = new Date();
          if(sunday.length > 0) {
            sundayOpenDt.setHours(sunday[0].open_at.split(":")[0], sunday[0].open_at.split(":")[1], sunday[0].open_at.split(":")[2])
            sundayCloseDt.setHours(sunday[0].close_at.split(":")[0], sunday[0].close_at.split(":")[1], sunday[0].close_at.split(":")[2])
          }
          
          const mondayOpenDt = new Date();
          const mondayCloseDt = new Date();
          if(monday.length > 0) {
            mondayOpenDt.setHours(monday[0].open_at.split(":")[0], monday[0].open_at.split(":")[1], monday[0].open_at.split(":")[2])
            mondayCloseDt.setHours(monday[0].close_at.split(":")[0], monday[0].close_at.split(":")[1], monday[0].close_at.split(":")[2])
          }

          const tuesdayOpenDt = new Date();
          const tuesdayCloseDt = new Date();
          if(tuesday.length > 0) {
            tuesdayOpenDt.setHours(tuesday[0].open_at.split(":")[0], tuesday[0].open_at.split(":")[1], tuesday[0].open_at.split(":")[2])
            tuesdayCloseDt.setHours(tuesday[0].close_at.split(":")[0], tuesday[0].close_at.split(":")[1], tuesday[0].close_at.split(":")[2])
          }

          const wednesdayOpenDt = new Date();
          const wednesdayCloseDt = new Date();
          if(wednesday.length > 0) {
            wednesdayOpenDt.setHours(wednesday[0].open_at.split(":")[0], wednesday[0].open_at.split(":")[1], wednesday[0].open_at.split(":")[2])
            wednesdayCloseDt.setHours(wednesday[0].close_at.split(":")[0], wednesday[0].close_at.split(":")[1], wednesday[0].close_at.split(":")[2])
          }

          const thursdayOpenDt = new Date();
          const thursdayCloseDt = new Date();
          if(thursday.length > 0 ) {
            thursdayOpenDt.setHours(thursday[0].open_at.split(":")[0], thursday[0].open_at.split(":")[1], thursday[0].open_at.split(":")[2])
            thursdayCloseDt.setHours(thursday[0].close_at.split(":")[0], thursday[0].close_at.split(":")[1], thursday[0].close_at.split(":")[2])
          }

          const fridayOpenDt = new Date();
          const fridayCloseDt = new Date();
          if(friday.length > 0) {
            fridayOpenDt.setHours(friday[0].open_at.split(":")[0], friday[0].open_at.split(":")[1], friday[0].open_at.split(":")[2])
            fridayCloseDt.setHours(friday[0].close_at.split(":")[0], friday[0].close_at.split(":")[1], friday[0].close_at.split(":")[2])
          }

          const saturdayOpenDt = new Date();
          const saturdayCloseDt = new Date();
          if(saturday.length > 0) {
            saturdayOpenDt.setHours(saturday[0].open_at.split(":")[0], saturday[0].open_at.split(":")[1], saturday[0].open_at.split(":")[2])
            saturdayCloseDt.setHours(saturday[0].close_at.split(":")[0], saturday[0].close_at.split(":")[1], saturday[0].close_at.split(":")[2])
          }

          setSchedule({
            sunday: { toggle: sunday.length > 0 ? sunday[0].isOpen : false, am: sundayOpenDt, pm: sundayCloseDt},
            monday: { toggle: monday.length > 0 ? monday[0].isOpen : false, am: mondayOpenDt, pm: mondayCloseDt},
            tuesday: { toggle: tuesday.length > 0 ? tuesday[0].isOpen : false, am: tuesdayOpenDt, pm: tuesdayCloseDt },
            wednesday: { toggle: wednesday.length > 0 ? wednesday[0].isOpen : false, am: wednesdayOpenDt, pm: wednesdayCloseDt },
            thursday: { toggle: thursday.length > 0 ? thursday[0].isOpen : false, am: thursdayOpenDt, pm: thursdayCloseDt },
            friday: { toggle: friday.length > 0 ? friday[0].isOpen : false, am: fridayOpenDt, pm: fridayCloseDt },
            saturday: { toggle: saturday.length > 0 ? saturday[0].isOpen : false, am: saturdayOpenDt, pm: saturdayCloseDt },
          })
        }
      }

      getDt();
    },[]);
    const toggleEditMode = () => setEdit(!edit);

    const saveSchedule = async () => {
        try {
            const today = new Date();
            const todayIndex = today.getDay();
    
            const calculateBusinessDate = (dayIndex) => {
                const offset = (dayIndex - todayIndex + 7) % 7;
                const businessDate = new Date(today);
                businessDate.setDate(today.getDate() + offset);
                return businessDate.toISOString().split("T")[0];
            };
    
            const formatTimeForDatabase = (date) => {
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                const seconds = String(date.getSeconds()).padStart(2, "0");
                return `${hours}:${minutes}:${seconds}`;
            };
    
            const formattedSchedule = Object.keys(schedule).reduce((acc, day, index) => {
                const dayIndex = index;
                acc[day] = {
                  partner_id: formData.user_detail_id,
                  isOpen: schedule[day].toggle,
                  day: day.charAt(0).toUpperCase() + day.slice(1),
                  open_at: formatTimeForDatabase(schedule[day].am),
                  close_at: formatTimeForDatabase(schedule[day].pm),
                  business_date: calculateBusinessDate(dayIndex),
                };
                return acc;
            }, {});
    
            const response = await fetch(`${process.env.BASE_URL}/save-business-hours`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ schedule: formattedSchedule }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                alert("Failed to save schedule. Please try again.");
                return;
            }
    
            const data = await response.json();
            alert("Success", "Schedule saved successfully.");
            console.log("Response data:", data);
    
        } catch (error) {
            console.error("Error saving schedule:", error);
            alert("Error saving schedule. Please try again.");
        }
    };
    const showMode = (currentMode, day, time) => {
        DateTimePickerAndroid.open({
            value: schedule[day][time],
            onChange: (event, selectedDate) => {
                if (selectedDate) {
                    setSchedule((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], [time]: selectedDate },
                    }));
                }
            },
            mode: currentMode,
            is24Hour: true,
        });
    };
    const handleTimeChange = (day, timeOfDay) => showMode("time", day, timeOfDay);

    return (
        <View className="border border-gray-400 p-8 gap-4">
            <Text className="text-primary font-semibold text-sm" style={{ maxWidth: 300, marginRight: 20 }}>
                Set Standard Hours
            </Text>

            {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
                <View
                    key={day}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Text className="text-xs" style={{ maxWidth: 200 }}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            ios_backgroundColor="#3e3e3e"
                            thumbColor={schedule[day].toggle ? "#00113f" : "#f4f3f4"}
                            onValueChange={() =>
                                setSchedule((prev) => ({
                                    ...prev,
                                    [day]: { ...prev[day], toggle: !prev[day].toggle },
                                }))
                            }
                            value={schedule[day].toggle}
                        />
                        <Text>{schedule[day].toggle ? "Open" : "Close"}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8, opacity: schedule[day].toggle ? 1 : 0 }}>
                        <TouchableOpacity onPress={() => edit && handleTimeChange(day, "am")}>
                            <Text className="px-2 border border-gray-400">
                                {schedule[day].am.toLocaleTimeString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                        </TouchableOpacity>
                        <Text>To</Text>
                        <TouchableOpacity onPress={() => edit && handleTimeChange(day, "pm")}>
                            <Text className="px-2 border border-gray-400">
                                {schedule[day].pm.toLocaleTimeString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                {!edit ? (
                    <TouchableOpacity
                        onPress={toggleEditMode}
                        className="rounded-full px-4"
                        style={[
                            __gstyles__.shadow,
                            { maxWidth: 100, justifyContent: "center", alignItems: "center" },
                        ]}
                    >
                        <Text className="text-xs text-primary p-2 text-center">Edit</Text>
                    </TouchableOpacity>
                ) : (
                    <View className="flex-row gap-4">
                        <TouchableOpacity
                            onPress={toggleEditMode}
                            className="rounded-full px-4"
                            style={[
                                __gstyles__.shadow,
                                { maxWidth: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#00113f" },
                            ]}
                        >
                            <Text className="text-xs bg-primary text-white p-2 text-center">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={saveSchedule}
                            className="rounded-full px-4"
                            style={[
                                __gstyles__.shadow,
                                { maxWidth: 100, justifyContent: "center", alignItems: "center" },
                            ]}
                        >
                            <Text className="text-xs text-primary p-2 text-center">Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}