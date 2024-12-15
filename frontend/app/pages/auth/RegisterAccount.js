import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/DropdownComponent";

const RegisterAccount = ({route}) => {
  const navigation = useNavigation();
  const {mobileNumber} = route.params || {};
  console.log(mobileNumber);
  const [formData, setFormData] = useState({
    user_phone_no: mobileNumber,
    first_name: "",
    middle_name: "",
    last_name: "",
    birthdate: new Date(), // Default to the current date
    email: "",
    nationality: "",
    main_source: "",
    province: "",
    city: "",
    barangay: "",
    zipcode: "",
    HasNoMiddleName: false,
  });

  const municipalities = [
    {
        label: 'Cebu',
        value: 'Cebu',
        cities: [
            { 
                label: 'Alcantara', 
                value: 'alcantara',
                zipCode: [
                    { code: 6036 }
                ],
                barangays: [
                    { label: 'Cabandiangan',value: 'Cabandiangan', zipCode: 6036 },
                    { label: 'Cabil-isan',value: 'Cabil-isan', zipCode: 6036 },
                    { label: 'Manga',value: 'Manga', zipCode: 6036 },
                    { label: 'Candabong',value: 'Candabong', zipCode: 6036 },
                    { label: 'Lawaan',value: 'Lawaan', zipCode: 6036 },
                    { label: 'Palanas',value: 'Palanas', zipCode: 6036 },
                    { label: 'Polo', value: 'Polo', zipCode: 6036 },
                    { label: 'Poblacion',value: 'Poblacion', zipCode: 6036 },
                    { label: 'Salamagya',value: 'Salamagya', zipCode: 6036 }
                ]
            },
            { 
                label: 'Alcoy', 
                value: 'alcoy',
                zipCode: [
                    { code: 6023 }
                ],
                barangays: [
                    { label: 'Atabay',value: 'Atabay', zipCode: 6023 },
                    { label: 'Daang-Lungsod',value: 'Daang-Lungsod', zipCode: 6023 },
                    { label: 'Guidang', value: 'Guidang', zipCode: 6023 },
                    { label: 'Nug-as',value: 'Nug-as', zipCode: 6023 },
                    { label: 'Pasol',value: 'Pasol', zipCode: 6023 },
                    { label: 'Poblacion',value: 'Poblacion', zipCode: 6023 },
                    { label: 'Pugalo',value: 'Pugalo', zipCode: 6023 },
                    { label: 'San Agustin',value: 'San Agustin', zipCode: 6023 }
                ]
            },
            { 
                label: 'Alegria', 
                value: 'alegria',
                zipCode: [
                    { code: 6023 }
                ],
                barangays: [
                    { label: 'Compostela',value: 'Compostela', zipCode: 6023 },
                    { label: 'Guadalupe',value: 'Guadalupe', zipCode: 6023 },
                    { label: 'Legaspi',value: 'Legaspi', zipCode: 6023 },
                    { label: 'Lepanto',value: 'Lepanto', zipCode: 6023 },
                    { label: 'Madridejos',value: 'Madridejos', zipCode: 6023 },
                    { label: 'Montpeller',value: 'Montpeller', zipCode: 6023 },
                    { label: 'Poblacion',value: 'Poblacion', zipCode: 6023 },
                    { label: 'Santa Filomena',value: 'Santa Filomena', zipCode: 6023 },
                    { label: 'Valencia',value: 'Valencia', zipCode: 6023 }
                    
                ]
            },
            { 
                label: 'Aloguinsan', 
                value: 'aloguinsan',
                zipCode: [
                    { code: 6024 }
                ],
                barangays: [
                    { label: 'Angilan',value: 'Angilan', zipCode: 6024 },
                    { label: 'Bojo',value: 'Bojo', zipCode: 6024 },
                    { label: 'Bonbon', value: 'Bonbon', zipCode: 6024 },
                    { label: 'Esperanza', value: 'Esperanza', zipCode: 6024 },
                    { label: 'Kandingan', value: 'Kandingan', zipCode: 6024 },
                    { label: 'Kantabogon', value: 'Kantabogon', zipCode: 6024 },
                    { label: 'Kawasan', value: 'Kawasan', zipCode: 6024 },
                    { label: 'Olango', value: 'Olango', zipCode: 6024 },
                    { label: 'Punay', value: 'Punay', zipCode: 6024 },
                    { label: 'Rosario', value: 'Rosario', zipCode: 6024 },
                    { label: 'Saksak', value: 'Saksak', zipCode: 6024 },
                    { label: 'Tampa-an', value: 'Tampa-an', zipCode: 6024 },
                    { label: 'Toyokon', value: 'Toyokon', zipCode: 6024 },
                    { label: 'Zaragosa', value: 'Zaragosa', zipCode: 6024 },
                    { label: 'Zaragosa', value: 'Zaragosa', zipCode: 6024 }
                ]
            },
            { 
                label: 'Argao', 
                value: 'argao',
                zipCode: [
                    { code: 6021 }
                ],
                barangays: [
                    { label: 'Alambijud',value: 'Alambijud', zipCode: 6021 },
                    { label: 'Anajao',value: 'Anajao', zipCode: 6021 },
                    { label: 'Apo', value: 'Apo', zipCode: 6021 },
                    { label: 'Balaas',value: 'Balaas', zipCode: 6021 },
                    { label: 'Balison',value: 'Balison', zipCode: 6021 },
                    { label: 'Binlod',value: 'Binlod', zipCode: 6021 },
                    { label: 'Linut-od',value: 'Linut-od', zipCode: 6021 },
                    { label: 'Bogo', value: 'Bogo', zipCode: 6021 },
                    { label: 'Mabasa', value: 'Mabasa', zipCode: 6021 },
                    { label: 'Butong', value: 'Butong', zipCode: 6021 },
                    { label: 'Mandilikit', value: 'Mandilikit', zipCode: 6021 },
                    { label: 'Bug-ot', value: 'Bug-ot', zipCode: 6021 },
                    { label: 'Mompeller',value: 'Mompeller', zipCode: 6021 },
                    { label: 'Bulasa',value: 'Bulasa', zipCode: 6021 },
                    { label: 'Panadtaran',value: 'Panadtaran', zipCode: 6021 },
                    { label: 'Calagasan',value: 'Calagasan', zipCode: 6021 },
                    { label: 'Poblacion',value: 'Poblacion', zipCode: 6021 },
                    { label: 'Canbantug',value: 'Canbantug', zipCode: 6021 },
                    { label: 'Sua',value: 'Sua', zipCode: 6021 },
                    { label: 'Canbanua',value: 'Canbanua', zipCode: 6021 },
                    { label: 'Sumaguan',value: 'Sumaguan', zipCode: 6021 },
                    { label: 'Cansuje',value: 'Cansuje', zipCode: 6021 },
                    { label: 'Tabayag',value: 'Tabayag', zipCode: 6021 },
                    { label: 'Capio-an',value: 'Capio-an', zipCode: 6021 },
                    { label: 'Talaga',value: 'Talaga', zipCode: 6021 },
                    { label: 'Casay',value: 'Casay', zipCode: 6021 },
                    { label: 'Talaytay', value: 'Talaytay', zipCode: 6021 },
                    { label: 'Catang',value: 'Catang', zipCode: 6021 },
                    { label: 'Talo-ot', value: 'Talo-ot', zipCode: 6021 },
                    { label: 'Colawin', value: 'Colawin', zipCode: 6021 },
                    { label: 'Tiguib',value: 'Tiguib', zipCode: 6021 },
                    { label: 'Conalum',value: 'Conalum', zipCode: 6021 },
                    { label: 'Tulang',value: 'Tulang', zipCode: 6021 },
                    { label: 'Guiwanon',value: 'Guiwanon', zipCode: 6021 },
                    { label: 'Tulic',value: 'Tulic', zipCode: 6021 },
                    { label: 'Gutlang',value: 'Gutlang', zipCode: 6021 },
                    { label: 'Ubaub',value: 'Ubaub', zipCode: 6021 },
                    { label: 'Jampang',value: 'Jampang', zipCode: 6021 },
                    { label: 'Usmad',value: 'Usmad', zipCode: 6021 }
                ]
            },
            { 
                label: 'Asturias', 
                value: 'asturias',
                zipCode: [
                    { code: 6038 }
                ],
                barangays: [
                    { label: 'Agbanga',value: 'Agbanga', zipCode: 6038 },
                    { label: 'Agtugop', value: 'Agtugop', zipCode: 6038 },
                    { label: 'Bago', value: 'Bago', zipCode: 6038 },
                    { label: 'Bairan', value: 'Bairan', zipCode: 6038 },
                    { label: 'Saksak', value: 'Saksak', zipCode: 6038 },
                    { label: 'Banban', value: 'Banban', zipCode: 6038 },
                    { label: 'San Isidro', value: 'San Isidro', zipCode: 6038 },
                    { label: 'Baye', value: 'Baye', zipCode: 6038 },
                    { label: 'San Roque', value: 'San Roque', zipCode: 6038 },
                    { label: 'Bog-o',label: 'Bog-o', zipCode: 6038 },
                    { label: 'Santa Lucia', value: 'Santa Lucia', zipCode: 6038 },
                    { label: 'Kaluangan',value: 'Kaluangan', zipCode: 6038 },
                    { label: 'Santa Rita', value: 'Santa Rita', zipCode: 6038 },
                    { label: 'Lanao', value: 'Lanao', zipCode: 6038 },
                    { label: 'Tag-amakan', value: 'Tag-amakan', zipCode: 6038 },
                    { label: 'Langub',value: 'Langub', zipCode: 6038 },
                    { label: 'Tagbubonga',value: 'Tagbubonga', zipCode: 6038 },
                    { label: 'Looc Norte',value: 'Looc Norte', zipCode: 6038 },
                    { label: 'Tubigagmanok',value: 'Tubigagmanok', zipCode: 6038 },
                    { label: 'Lunas',value: 'Lunas', zipCode: 6038 },
                    { label: 'Tubod',value: 'Tubod', zipCode: 6038 },
                    { label: 'Magcalape',value: 'Magcalape', zipCode: 6038 },
                    { label: 'Ubogon',value: 'Ubogon', zipCode: 6038 },
                    { label: 'Manguiao',value: 'Manguiao', zipCode: 6038 },
                    { label: 'New Bago',value: 'New Bago', zipCode: 6038 },
                    { label: 'Owak', value: 'Owak', zipCode: 6038 },
                    { label: 'Poblacion',value: 'Poblacion', zipCode: 6038 }
                ]
            },
            { 
                label: 'Badian', 
                value: 'badian',
                zipCode: [
                    { code: 6031 }
                ],
                barangays: [
                    { label: 'Alawijao', zipCode: 6031 },
                    { label: 'Manduyong', zipCode: 6031 },
                    { label: 'Balhaan', zipCode: 6031 },
                    { label: 'Matutinao', zipCode: 6031 },
                    { label: 'Banhigan', zipCode: 6031 },
                    { label: 'Patong', zipCode: 6031 },
                    { label: 'Basak', zipCode: 6031 },
                    { label: 'Poblacion', zipCode: 6031 },
                    { label: 'Basiao', zipCode: 6031 },
                    { label: 'Sanlagan', zipCode: 6031 },
                    { label: 'Bato', zipCode: 6031 },
                    { label: 'Santicon', zipCode: 6031 },
                    { label: 'Bugas', zipCode: 6031 },
                    { label: 'Sohoton', zipCode: 6031 },
                    { label: 'Calangcang', zipCode: 6031 },
                    { label: 'Sulsugan', zipCode: 6031 },
                    { label: 'Candiis', zipCode: 6031 },
                    { label: 'Talayong', zipCode: 6031 },
                    { label: 'Dagatan', zipCode: 6031 },
                    { label: 'Taytay', zipCode: 6031 },
                    { label: 'Dobdob', zipCode: 6031 },
                    { label: 'Tigbao', zipCode: 6031 },
                    { label: 'Ginablan', zipCode: 6031 },
                    { label: 'Tiguib', zipCode: 6031 },
                    { label: 'Lambug', zipCode: 6031 },
                    { label: 'Tubod', zipCode: 6031 },
                    { label: 'Malabago', zipCode: 6031 },
                    { label: 'Zaragosa', zipCode: 6031 }
                    
                ]
            },
            { 
                label: 'Balamban', 
                value: 'balamban',
                zipCode: [
                    { code: 6041 }
                ],
                barangays: [
                    { label: 'Abucayan', zipCode: 6041 },
                    { label: 'Ginatilan', zipCode: 6041 },
                    { label: 'Aliwanay', zipCode: 6041 },
                    { label: 'Hingatmonan', zipCode: 6041 },
                    { label: 'Arpili', zipCode: 6041 },
                    { label: 'Lamesa', zipCode: 6041 },
                    { label: 'Bayong', zipCode: 6041 },
                    { label: 'Liki', zipCode: 6041 },
                    { label: 'Biasong', zipCode: 6041 },
                    { label: 'Luca', zipCode: 6041 },
                    { label: 'Buanoy', zipCode: 6041 },
                    { label: 'Matun-og', zipCode: 6041 },
                    { label: 'Cabagdalan', zipCode: 6041 },
                    { label: 'Nangka', zipCode: 6041 },
                    { label: 'Cabasiangan', zipCode: 6041 },
                    { label: 'Pondol', zipCode: 6041 },
                    { label: 'Cambuhawe', zipCode: 6041 },
                    { label: 'Prenza', zipCode: 6041 },
                    { label: 'Cansomoroy', zipCode: 6041 },
                    { label: 'Singsing', zipCode: 6041 },
                    { label: 'Cantibas', zipCode: 6041 },
                    { label: 'Sunog', zipCode: 6041 },
                    { label: 'Cantuod', zipCode: 6041 },
                    { label: 'Vito', zipCode: 6041 },
                    { label: 'Duangan', zipCode: 6041 },
                    { label: 'Baliwagan (Pob.)', zipCode: 6041 },
                    { label: 'Gaas', zipCode: 6041 },
                    { label: 'Santa Cruz-Santo Niño (Pob.)', zipCode: 6041 }
                    
                ]
            },
            { 
                label: 'Bantayan', 
                value: 'bantayan',
                zipCode: [
                    { code: 6047 }
                ],
                barangays: [
                    { label: 'Atop-atop', zipCode: 6047 },
                    { label: 'Luyongbaybay', zipCode: 6047 },
                    { label: 'Baigad', zipCode: 6047 },
                    { label: 'Mojon', zipCode: 6047 },
                    { label: 'Baod', zipCode: 6047 },
                    { label: 'Obo-ob', zipCode: 6047 },
                    { label: 'Binaobao (Pob.)', zipCode: 6047 },
                    { label: 'Patao', zipCode: 6047 },
                    { label: 'Botigues', zipCode: 6047 },
                    { label: 'Putian', zipCode: 6047 },
                    { label: 'Kabac', zipCode: 6047 },
                    { label: 'Sillon', zipCode: 6047 },
                    { label: 'Doong', zipCode: 6047 },
                    { label: 'Sungko', zipCode: 6047 },
                    { label: 'Hilotongan', zipCode: 6047 },
                    { label: 'Suba (Pob.)', zipCode: 6047 },
                    { label: 'Guiwanon', zipCode: 6047 },
                    { label: 'Sulangan', zipCode: 6047 },
                    { label: 'Kabangbang', zipCode: 6047 },
                    { label: 'Tamiao', zipCode: 6047 },
                    { label: 'Kampingganon', zipCode: 6047 },
                    { label: 'Bantigue (Pob.)', zipCode: 6047 },
                    { label: 'Kangkaibe', zipCode: 6047 },
                    { label: 'Ticad (Pob.)', zipCode: 6047 },
                    { label: 'Lipayran', zipCode: 6047 }
                ]
            },
            { 
                label: 'Barili', 
                value: 'barili',
                zipCode: [
                    { code: 6036 }
                ],
                barangays: [
                    { label: 'Azucena', value: 'Azucena', zipCode: 6036 },
                    { label: 'Luyo', zipCode: 6036 },
                    { label: 'Bagakay', zipCode: 6036 },
                    { label: 'Maghanoy', zipCode: 6036 },
                    { label: 'Balao', zipCode: 6036 },
                    { label: 'Maigang', zipCode: 6036 },
                    { label: 'Bolocboloc', zipCode: 6036 },
                    { label: 'Malolos', zipCode: 6036 },
                    { label: 'Budbud', zipCode: 6036 },
                    { label: 'Mantalongon', zipCode: 6036 },
                    { label: 'Bugtong Kawayan', zipCode: 6036 },
                    { label: 'Mantayupan', zipCode: 6036 },
                    { label: 'Cabcaban', zipCode: 6036 },
                    { label: 'Mayana', zipCode: 6036 },
                    { label: 'Campangga', zipCode: 6036 },
                    { label: 'Minolos', zipCode: 6036 },
                    { label: 'Dakit', zipCode: 6036 },
                    { label: 'Nabunturan', zipCode: 6036 },
                    { label: 'Giloctog', zipCode: 6036 },
                    { label: 'Nasipit', zipCode: 6036 },
                    { label: 'Guibuangan', zipCode: 6036 },
                    { label: 'Pancil', zipCode: 6036 },
                    { label: 'Giwanon', zipCode: 6036 },
                    { label: 'Pangpang', zipCode: 6036 },
                    { label: 'Gunting', zipCode: 6036 },
                    { label: 'Paril', zipCode: 6036 },
                    { label: 'Hilasgasan', zipCode: 6036 },
                    { label: 'Patupat', zipCode: 6036 },
                    { label: 'Japitan', zipCode: 6036 },
                    { label: 'Poblacion', zipCode: 6036 },
                    { label: 'Cagay', zipCode: 6036 },
                    { label: 'San Rafael', zipCode: 6036 },
                    { label: 'Kalubihan', zipCode: 6036 },
                    { label: 'Santa Ana', zipCode: 6036 },
                    { label: 'Kangdampas', zipCode: 6036 },
                    { label: 'Sayaw', zipCode: 6036 },
                    { label: 'Candugay', zipCode: 6036 },
                    { label: 'Tal-ot', zipCode: 6036 },
                    { label: 'Luhod', zipCode: 6036 },
                    { label: 'Tubod', zipCode: 6036 },
                    { label: 'Lupo', zipCode: 6036 },
                    { label: 'Vito', zipCode: 6036 }
                ]
            },
            { 
                label: 'Bogo City', 
                value: 'bogo-city',
                zipCode: [
                    { code: 6010 }
                ],
                barangays: [
                    { label: 'Cogon', zipCode: 6010 },
                    { label: 'Lourdes', zipCode: 6010 },
                    { label: 'Anonang Norte', zipCode: 6010 },
                    { label: 'Malingin', zipCode: 6010 },
                    { label: 'Anonang Sur', zipCode: 6010 },
                    { label: 'Marangog', zipCode: 6010 },
                    { label: 'Banban', zipCode: 6010 },
                    { label: 'Nailon', zipCode: 6010 },
                    { label: 'Binabag', zipCode: 6010 },
                    { label: 'Odlot', zipCode: 6010 },
                    { label: 'Bungtod (Pob.)', zipCode: 6010 },
                    { label: 'Pandan (Pandan Heights)', zipCode: 6010 },
                    { label: 'Carbon (Pob.)', zipCode: 6010 },
                    { label: 'Polambato', zipCode: 6010 },
                    { label: 'Cayang', zipCode: 6010 },
                    { label: 'Sambag (Pob.)', zipCode: 6010 },
                    { label: 'Dakit', zipCode: 6010 },
                    { label: 'San Vicente (Pob.)', zipCode: 6010 },
                    { label: 'Don Pedro Rodriguez', zipCode: 6010 },
                    { label: 'Santo Niño', zipCode: 6010 },
                    { label: 'Gairan', zipCode: 6010 },
                    { label: 'Santo Rosario (Pob.)', zipCode: 6010 },
                    { label: 'Guadalupe', zipCode: 6010 },
                    { label: 'Siocon', zipCode: 6010 },
                    { label: 'La Paz', zipCode: 6010 },
                    { label: 'Taytayan', zipCode: 6010 },
                    { label: 'La Purisima Concepcion (Pob.)', zipCode: 6010 },
                    { label: 'Sudlonon', zipCode: 6010 },
                    { label: 'Libertad', zipCode: 6010 }
                ]
            },
            { 
                label: 'Boljoon', 
                value: 'boljoon',
                zipCode: [
                    { code: 6024 }
                ],
                barangays: [
                    { label: 'Baclayan', zipCode: 6024 },
                    { label: 'Upper Becerril', zipCode: 6024 },
                    { label: 'El Pardo', zipCode: 6024 },
                    { label: 'Arbor', zipCode: 6024 },
                    { label: 'Granada', zipCode: 6024 },
                    { label: 'Lunop', zipCode: 6024 },
                    { label: 'Lower Becerril', zipCode: 6024 },
                    { label: 'Nangka', zipCode: 6024 },
                    { label: 'Poblacion', zipCode: 6024 },
                    { label: 'South Granada', zipCode: 6024 },
                    { label: 'San Antonio', zipCode: 6024 }
                ]
            },
            { 
                label: 'Borbon', 
                value: 'borbon',
                zipCode: [
                    { code: 6008 }
                ],
                barangays: [
                    { label: 'Bagakay', zipCode: 6008 },
                    { label: 'Don Gregorio Antigua', zipCode: 6008 },
                    { label: 'Bili', zipCode: 6008 },
                    { label: 'Laaw', zipCode: 6008 },
                    { label: 'Bingay', zipCode: 6008 },
                    { label: 'Lugo', zipCode: 6008 },
                    { label: 'Bongdo', zipCode: 6008 },
                    { label: 'Managase', zipCode: 6008 },
                    { label: 'Bongdo Gua', zipCode: 6008 },
                    { label: 'Poblacion', zipCode: 6008 },
                    { label: 'Bongoyan', zipCode: 6008 },
                    { label: 'Sagay', zipCode: 6008 },
                    { label: 'Cadaruhan', zipCode: 6008 },
                    { label: 'San Jose', zipCode: 6008 },
                    { label: 'Cajel', zipCode: 6008 },
                    { label: 'Tabunan', zipCode: 6008 },
                    { label: 'Campusong', zipCode: 6008 },
                    { label: 'Tagnucan', zipCode: 6008 },
                    { label: 'Clavera', zipCode: 6008 }
                ]
            },
            { 
                label: 'Carcar City', 
                value: 'carcar-city',
                zipCode: [
                    { code: 6019 }
                ],
                barangays: [
                    { label: 'Poblacion I', zipCode: 6019 },
                    { label: 'Poblacion II', zipCode: 6019 },
                    { label: 'Poblacion III', zipCode: 6019 },
                    { label: 'Bolinawan', zipCode: 6019 },
                    { label: 'Perrelos', zipCode: 6019 },
                    { label: 'Buenavista', zipCode: 6019 },
                    { label: 'Valencia', zipCode: 6019 },
                    { label: 'Calidngan', zipCode: 6019 },
                    { label: 'Valladolid', zipCode: 6019 },
                    { label: 'Can-asujan', zipCode: 6019 },
                    { label: 'Guadalupe', zipCode: 6019 },
                    { label: 'Liburon', zipCode: 6019 },
                    { label: 'Napo', zipCode: 6019 },
                    { label: 'Ocana', zipCode: 6019 }
                ]
            },
            { 
                label: 'Carmen', 
                value: 'carmen',
                zipCode: [
                    { code: 6005 }
                ],
                barangays: [
                    { label: 'Baring', zipCode: 6005 },
                    { label: 'Lanipga', zipCode: 6005 },
                    { label: 'Cantipay', zipCode: 6005 },
                    { label: 'Liboron', zipCode: 6005 },
                    { label: 'Cantumog', zipCode: 6005 },
                    { label: 'Lower Natimao-an', zipCode: 6005 },
                    { label: 'Cantukong', zipCode: 6005 },
                    { label: 'Luyang', zipCode: 6005 },
                    { label: 'Caurasan', zipCode: 6005 },
                    { label: 'Corte', zipCode: 6005 },
                    { label: 'Dawis Norte', zipCode: 6005 },
                    { label: 'Dawis Sur', zipCode: 6005 },
                    { label: 'Cogon East', zipCode: 6005 },
                    { label: 'Hagnaya', zipCode: 6005 },
                    { label: 'Ipil', zipCode: 6005 },
                    { label: 'Cogon', zipCode: 6005 },
                    { label: 'Poblacion', zipCode: 6005 },
                    { label: 'Upper Natimao-an', zipCode: 6005 }
                ]
            },
            { 
                label: 'Catmon', 
                value: 'catmon',
                zipCode: [
                    { code: 6006 }
                ],
                barangays: [
                    { label: 'Agsuwao', zipCode: 6006 },
                    { label: 'Catmondaan', zipCode: 6006 },
                    { label: 'Amancion', zipCode: 6006 },
                    { label: 'Duyan', zipCode: 6006 },
                    { label: 'Anapog', zipCode: 6006 },
                    { label: 'Ginabucan', zipCode: 6006 },
                    { label: 'Bactas', zipCode: 6006 },
                    { label: 'Macaas', zipCode: 6006 },
                    { label: 'Bongyas', zipCode: 6006 },
                    { label: 'Panalipan', zipCode: 6006 },
                    { label: 'Basak', zipCode: 6006 },
                    { label: 'Tabili', zipCode: 6006 },
                    { label: 'Binongkalan', zipCode: 6006 },
                    { label: 'Tinabyonan', zipCode: 6006 },
                    { label: 'Cabungaan', zipCode: 6006 },
                    { label: 'San Jose Pob. (Catadman)', zipCode: 6006 },
                    { label: 'Cambangkaya', zipCode: 6006 },
                    { label: 'Corazon (Pob.)', zipCode: 6006 },
                    { label: 'Can-ibuang', zipCode: 6006 },
                    { label: 'Flores (Pob.)', zipCode: 6006 }
                   
                ]
            },
            { 
                label: 'Cebu City', 
                value: 'cebu-city',
                zipCode: [
                    { code: 6000 }
                ],
                barangays: [
                    { label: 'Capitol Site', zipCode: 6000 },
                    { label: 'Mabolo', zipCode: 6000 },
                    { label: 'Lahug', zipCode: 6000 },
                    { label: 'Adlaon', zipCode: 6000 },
                    { label: 'Agsungot', zipCode: 6000 },
                    { label: 'Apas', zipCode: 6000 },
                    { label: 'Babag', zipCode: 6000 },
                    { label: 'Basak Pardo', zipCode: 6000 },
                    { label: 'Bacayan', zipCode: 6000 },
                    { label: 'Banilad', zipCode: 6000 },
                    { label: 'Basak San Nicolas', zipCode: 6000 },
                    { label: 'Binaliw', zipCode: 6000 },
                    { label: 'Bonbon', zipCode: 6000 },
                    { label: 'Budla-an (Pob.)', zipCode: 6000 },
                    { label: 'Buhisan', zipCode: 6000 },
                    { label: 'Bulacao', zipCode: 6000 },
                    { label: 'Buot-Taup Pardo', zipCode: 6000 },
                    { label: 'Busay (Pob.)', zipCode: 6000 },
                    { label: 'Calamba', zipCode: 6000 },
                    { label: 'Cambinocot', zipCode: 6000 },
                    { label: 'Carreta', zipCode: 6000 },
                    { label: 'Central (Pob.)', zipCode: 6000 },
                    { label: 'Cogon Ramos (Pob.)', zipCode: 6000 },
                    { label: 'Cogon Pardo', zipCode: 6000 },
                    { label: 'Day-as', zipCode: 6000 },
                    { label: 'Duljo (Pob.)', zipCode: 6000 },
                    { label: 'Ermita (Pob.)', zipCode: 6000 },
                    { label: 'Guadalupe', zipCode: 6000 },
                    { label: 'Guba', zipCode: 6000 },
                    { label: 'Hippodromo', zipCode: 6000 },
                    { label: 'Inayawan', zipCode: 6000 },
                    { label: 'Kalubihan (Pob.)', zipCode: 6000 },
                    { label: 'Kalunasan', zipCode: 6000 },
                    { label: 'Kamagayan (Pob.)', zipCode: 6000 },
                    { label: 'Camputhaw (Pob.)', zipCode: 6000 },
                    { label: 'Kasambagan', zipCode: 6000 },
                    { label: 'Kinasang-an Pardo', zipCode: 6000 },
                    { label: 'Labangon', zipCode: 6000 },
                    { label: 'Lahug (Pob.)', zipCode: 6000 },
                    { label: 'Lorega (Lorega San Miguel)', zipCode: 6000 },
                    { label: 'Lusaran', zipCode: 6000 },
                    { label: 'Luz', zipCode: 6000 },
                    { label: 'Mabini', zipCode: 6000 },
                    { label: 'Malubog', zipCode: 6000 },
                    { label: 'Mambaling', zipCode: 6000 },
                    { label: 'Pahina Central (Pob.)', zipCode: 6000 },
                    { label: 'Pahina San Nicolas', zipCode: 6000 },
                    { label: 'Pamutan', zipCode: 6000 },
                    { label: 'Pardo (Pob.)', zipCode: 6000 },
                    { label: 'Pari-an', zipCode: 6000 },
                    { label: 'Paril', zipCode: 6000 },
                    { label: 'Pasil', zipCode: 6000 },
                    { label: 'Pit-os', zipCode: 6000 },
                    { label: 'Pulangbato', zipCode: 6000 },
                    { label: 'Pung-ol-Sibugay', zipCode: 6000 },
                    { label: 'Punta Princesa', zipCode: 6000 },
                    { label: 'Quiot Pardo', zipCode: 6000 },
                    { label: 'Sambag I (Pob.)', zipCode: 6000 },
                    { label: 'Sambag II (Pob.)', zipCode: 6000 },
                    { label: 'San Antonio (Pob.)', zipCode: 6000 },
                    { label: 'San Jose', zipCode: 6000 },
                    { label: 'San Nicolas Central', zipCode: 6000 },
                    { label: 'San Roque (Ciudad)', zipCode: 6000 },
                    { label: 'Santa Cruz (Pob.)', zipCode: 6000 },
                    { label: 'Sawang Calero (Pob.)', zipCode: 6000 },
                    { label: 'Sinsin', zipCode: 6000 },
                    { label: 'Sirao', zipCode: 6000 },
                    { label: 'Suba Pob. (Suba San Nicolas)', zipCode: 6000 },
                    { label: 'Sudlon I', zipCode: 6000 },
                    { label: 'Sudlon II', zipCode: 6000 },
                    { label: 'Sapangdaku', zipCode: 6000 },
                    { label: 'T. Padilla', zipCode: 6000 },
                    { label: 'Tabunan', zipCode: 6000 },
                    { label: 'Tagbao', zipCode: 6000 },
                    { label: 'Talamban', zipCode: 6000 },
                    { label: 'Taptap', zipCode: 6000 },
                    { label: 'Tejero (Villa Gonzalo)', zipCode: 6000 },
                    { label: 'Tinago', zipCode: 6000 },
                    { label: 'Tisa', zipCode: 6000 },
                    { label: 'To-ong Pardo', zipCode: 6000 },
                    { label: 'Zapatera', zipCode: 6000 }
                ]
            },
            { 
                label: 'Compostela', 
                value: 'compostela',
                zipCode: [
                    { code: 6003 }
                ],
                barangays: [
                    { label: 'Poblacion', zipCode: 6003 },
                    { label: 'Cogon', zipCode: 6003 },
                    { label: 'Tag-ubi', zipCode: 6003 },
                    { label: 'Bagalnga', zipCode: 6003 },
                    { label: 'Lupa', zipCode: 6003 },
                    { label: 'Basak', zipCode: 6003 },
                    { label: 'Magay', zipCode: 6003 },
                    { label: 'Buluang', zipCode: 6003 },
                    { label: 'Mulao', zipCode: 6003 },
                    { label: 'Cabadiangan', zipCode: 6003 },
                    { label: 'Panangban', zipCode: 6003 },
                    { label: 'Cambayog', zipCode: 6003 },
                    { label: 'Poblacion', zipCode: 6003 },
                    { label: 'Canamucan', zipCode: 6003 },
                    { label: 'Tag-ube', zipCode: 6003 },
                    { label: 'Cogon', zipCode: 6003 },
                    { label: 'Tamiao', zipCode: 6003 },
                    { label: 'Dapdap', zipCode: 6003 },
                    { label: 'Tubigan', zipCode: 6003 },
                    { label: 'Estaca', zipCode: 6003 }
            
                ]
            },
            { 
                label: 'Consolacion', 
                value: 'consolacion',
                zipCode: [
                    { code: 6001 }
                ],
                barangays: [
                    { label: 'Cabangahan', zipCode: 6001 },
                    { label: 'Pitogo', zipCode: 6001 },
                    { label: 'Cansaga', zipCode: 6001 },
                    { label: 'Poblacion Occidental', zipCode: 6001 },
                    { label: 'Casili', zipCode: 6001 },
                    { label: 'Poblacion Oriental', zipCode: 6001 },
                    { label: 'Danglag', zipCode: 6001 },
                    { label: 'Polog', zipCode: 6001 },
                    { label: 'Garing', zipCode: 6001 },
                    { label: 'Pulpogan', zipCode: 6001 },
                    { label: 'Jugan', zipCode: 6001 },
                    { label: 'Sacsac', zipCode: 6001 },
                    { label: 'Lamac', zipCode: 6001 },
                    { label: 'Tayud', zipCode: 6001 },
                    { label: 'Lanipga', zipCode: 6001 },
                    { label: 'Tilhaong', zipCode: 6001 },
                    { label: 'Nangka', zipCode: 6001 },
                    { label: 'Tolotolo', zipCode: 6001 },
                    { label: 'Panas', zipCode: 6001 },
                    { label: 'Tugbongan', zipCode: 6001 },
                    { label: 'Panoypoy', zipCode: 6001 }
                ]
            },
            { 
                label: 'Cordova', 
                value: 'cordova',
                zipCode: [
                    { code: 6017 }
                ],
                barangays: [
                    { label: 'Alegria', zipCode: 6017 },
                    { label: 'Gabi', zipCode: 6017 },
                    { label: 'Bangbang', zipCode: 6017 },
                    { label: 'Gilutongan', zipCode: 6017 },
                    { label: 'Buagsong', zipCode: 6017 },
                    { label: 'Ibabao', zipCode: 6017 },
                    { label: 'Catarman', zipCode: 6017 },
                    { label: 'Pilipog', zipCode: 6017 },
                    { label: 'Cogon', zipCode: 6017 },
                    { label: 'Poblacion', zipCode: 6017 },
                    { label: 'Dapitan', zipCode: 6017 },
                    { label: 'San Miguel', zipCode: 6017 },
                    { label: 'Day-as', zipCode: 6017 }
                ]
            },
            { 
                label: 'Daanbantayan', 
                value: 'daanbantayan',
                zipCode: [
                    { code: 6013 }
                ],
                barangays: [
                    { label: 'Aguho', zipCode: 6013 },
                    { label: 'Malbago', zipCode: 6013 },
                    { label: 'Bagay', zipCode: 6013 },
                    { label: 'Malingin', zipCode: 6013 },
                    { label: 'Bakhawan', zipCode: 6013 },
                    { label: 'Maya', zipCode: 6013 },
                    { label: 'Bateria', zipCode: 6013 },
                    { label: 'Pajo', zipCode: 6013 },
                    { label: 'Bitoon', zipCode: 6013 },
                    { label: 'Paypay', zipCode: 6013 },
                    { label: 'Calape', zipCode: 6013 },
                    { label: 'Poblacion', zipCode: 6013 },
                    { label: 'Carnaza', zipCode: 6013 },
                    { label: 'Talisay', zipCode: 6013 },
                    { label: 'Dalingding', zipCode: 6013 },
                    { label: 'Tapilon', zipCode: 6013 },
                    { label: 'Lanao', zipCode: 6013 },
                    { label: 'Tinubdan', zipCode: 6013 },
                    { label: 'Logon', zipCode: 6013 },
                    { label: 'Tominjao', zipCode: 6013 }
                ]
            },
            { 
                label: 'Dalaguete', 
                value: 'dalaguete',
                zipCode: [
                    { code: 6022 }
                ],
                barangays: [
                    { label: 'Albayan', zipCode: 6022 },
                    { label: 'Lumbang', zipCode: 6022 },
                    { label: 'Babayongan', zipCode: 6022 },
                    { label: 'Malones', zipCode: 6022 },
                    { label: 'Balud', zipCode: 6022 },
                    { label: 'Maloray', zipCode: 6022 },
                    { label: 'Banhigan', zipCode: 6022 },
                    { label: 'Mananggal', zipCode: 6022 },
                    { label: 'Bulak', zipCode: 6022 },
                    { label: 'Manlapay', zipCode: 6022 },
                    { label: 'Caliongan', zipCode: 6022 },
                    { label: 'Mantalongon', zipCode: 6022 },
                    { label: 'Caleriohan', zipCode: 6022 },
                    { label: 'Nalhub', zipCode: 6022 },
                    { label: 'Casay', zipCode: 6022 },
                    { label: 'Obo', zipCode: 6022 },
                    { label: 'Catolohan', zipCode: 6022 },
                    { label: 'Obong', zipCode: 6022 },
                    { label: 'Cawayan', zipCode: 6022 },
                    { label: 'Panas', zipCode: 6022 },
                    { label: 'Consolacion', zipCode: 6022 },
                    { label: 'Poblacion', zipCode: 6022 },
                    { label: 'Coro', zipCode: 6022 },
                    { label: 'Sacsac', zipCode: 6022 },
                    { label: 'Dugyan', zipCode: 6022 },
                    { label: 'Tapun', zipCode: 6022 },
                    { label: 'Dumalan', zipCode: 6022 },
                    { label: 'Tuba', zipCode: 6022 },
                    { label: 'Jolomaynon', zipCode: 6022 },
                    { label: 'Salug', zipCode: 6022 },
                    { label: 'Lanao', zipCode: 6022 },
                    { label: 'Tabon', zipCode: 6022 },
                    { label: 'Langkas', zipCode: 6022 }
                ]
            },
            { 
                label: 'Danao City', 
                value: 'danao-city',
                zipCode: [
                    { code: 6004 }
                ],
                barangays: [
                    { label: 'Baliang', zipCode: 6004 },
                    { label: 'Manlayag', zipCode: 6004 },
                    { label: 'Bayabas', zipCode: 6004 },
                    { label: 'Mantija', zipCode: 6004 },
                    { label: 'Binaliw', zipCode: 6004 },
                    { label: 'Masaba', zipCode: 6004 },
                    { label: 'Cabungahan', zipCode: 6004 },
                    { label: 'Maslog', zipCode: 6004 },
                    { label: 'Cagat-Lamac', zipCode: 6004 },
                    { label: 'Nangka', zipCode: 6004 },
                    { label: 'Cahumayan', zipCode: 6004 },
                    { label: 'Oguis', zipCode: 6004 },
                    { label: 'Cambanay', zipCode: 6004 },
                    { label: 'Pili', zipCode: 6004 },
                    { label: 'Cambubho', zipCode: 6004 },
                    { label: 'Poblacion', zipCode: 6004 },
                    { label: 'Cogon-Cruz', zipCode: 6004 },
                    { label: 'Quisol', zipCode: 6004 },
                    { label: 'Danasan', zipCode: 6004 },
                    { label: 'Sabang', zipCode: 6004 },
                    { label: 'Dungga', zipCode: 6004 },
                    { label: 'Sacsac', zipCode: 6004 },
                    { label: 'Dunggoan', zipCode: 6004 },
                    { label: 'Sandayong Norte', zipCode: 6004 },
                    { label: 'Guinacot', zipCode: 6004 },
                    { label: 'Sandayong Sur', zipCode: 6004 },
                    { label: 'Guinsay', zipCode: 6004 },
                    { label: 'Santa Rosa', zipCode: 6004 },
                    { label: 'Ibo', zipCode: 6004 },
                    { label: 'Santican', zipCode: 6004 },
                    { label: 'Langosig', zipCode: 6004 },
                    { label: 'Sibacan', zipCode: 6004 },
                    { label: 'Lawaan', zipCode: 6004 },
                    { label: 'Suba', zipCode: 6004 },
                    { label: 'Licos', zipCode: 6004 },
                    { label: 'Taboc', zipCode: 6004 },
                    { label: 'Looc', zipCode: 6004 },
                    { label: 'Taytay', zipCode: 6004 },
                    { label: 'Magtagobtob', zipCode: 6004 },
                    { label: 'Togonon', zipCode: 6004 },
                    { label: 'Malapoc', zipCode: 6004 },
                    { label: 'Tuburan Sur', zipCode: 6004 }
                ]
            },
            { 
                label: 'Dumanjug', 
                value: 'dumanjug',
                zipCode: [
                    { code: 6035 }
                ],
                barangays: [
                    { label: 'Balaygtiki', zipCode: 6035 },
                    { label: 'Cotcoton', zipCode: 6035 },
                    { label: 'Bitoon', zipCode: 6035 },
                    { label: 'Lamak', zipCode: 6035 },
                    { label: 'Bulak', zipCode: 6035 },
                    { label: 'Lawaan', zipCode: 6035 },
                    { label: 'Bullogan', zipCode: 6035 },
                    { label: 'Liong', zipCode: 6035 },
                    { label: 'Doldol', zipCode: 6035 },
                    { label: 'Manlapay', zipCode: 6035 },
                    { label: 'Kabalaasnan', zipCode: 6035 },
                    { label: 'Masa', zipCode: 6035 },
                    { label: 'Kabatbatan', zipCode: 6035 },
                    { label: 'Matalao', zipCode: 6035 },
                    { label: 'Calaboon', zipCode: 6035 },
                    { label: 'Paculob', zipCode: 6035 },
                    { label: 'Kambanog', zipCode: 6035 },
                    { label: 'Panlaan', zipCode: 6035 },
                    { label: 'Camboang', zipCode: 6035 },
                    { label: 'Pawa', zipCode: 6035 },
                    { label: 'Candabong', zipCode: 6035 },
                    { label: 'Ilaya (Pob.)', zipCode: 6035 },
                    { label: 'Kang-actol', zipCode: 6035 },
                    { label: 'Poblacion Looc', zipCode: 6035 },
                    { label: 'Kanghalo', zipCode: 6035 },
                    { label: 'Poblacion Sima', zipCode: 6035 },
                    { label: 'Kanghumaod', zipCode: 6035 },
                    { label: 'Tangil', zipCode: 6035 },
                    { label: 'Kanguha', zipCode: 6035 },
                    { label: 'Tapon', zipCode: 6035 },
                    { label: 'Kantangkas', zipCode: 6035 },
                    { label: 'Tubod-Bitoon', zipCode: 6035 },
                    { label: 'Kanyuko', zipCode: 6035 },
                    { label: 'Tubod-Dugoan', zipCode: 6035 },
                    { label: 'Cogon', zipCode: 6035 },
                    { label: 'Poblacion Central', zipCode: 6035 },
                    { label: 'Kolabtingon', zipCode: 6035 } 
                ]
            },
            { 
                label: 'Ginatilan', 
                value: 'ginatilan',
                zipCode: [
                    { code: 6027 }
                ],
                barangays: [
                    { label: 'Anao', zipCode: 6027 },
                    { label: 'Looc', zipCode: 6027 },
                    { label: 'Cagsing', zipCode: 6027 },
                    { label: 'Malatbo', zipCode: 6027 },
                    { label: 'Calabawan', zipCode: 6027 },
                    { label: 'Mangaco', zipCode: 6027 },
                    { label: 'Cambagte', zipCode: 6027 },
                    { label: 'Palanas', zipCode: 6027 },
                    { label: 'Campisong', zipCode: 6027 },
                    { label: 'Poblacion', zipCode: 6027 },
                    { label: 'Canorong', zipCode: 6027 },
                    { label: 'Salamanca', zipCode: 6027 },
                    { label: 'Guiwanon', zipCode: 6027 },
                    { label: 'San Roque', zipCode: 6027 }
                ]
            },
            { 
                label: 'Lapu-Lapu City', 
                value: 'lapu-lapu-city',
                zipCode: [
                    { code: 6015 }
                ],
                barangays: [
                    { label: 'Agus', zipCode: 6015 },
                    { label: 'Maribago', zipCode: 6015 },
                    { label: 'Babag', zipCode: 6015 },
                    { label: 'Marigondon', zipCode: 6015 },
                    { label: 'Bankal', zipCode: 6015 },
                    { label: 'Pajac', zipCode: 6015 },
                    { label: 'Baring', zipCode: 6015 },
                    { label: 'Pajo', zipCode: 6015 },
                    { label: 'Basak', zipCode: 6015 },
                    { label: 'Pangan-an', zipCode: 6015 },
                    { label: 'Buaya', zipCode: 6015 },
                    { label: 'Poblacion', zipCode: 6015 },
                    { label: 'Calawisan', zipCode: 6015 },
                    { label: 'Punta Engaño', zipCode: 6015 },
                    { label: 'Canjulao', zipCode: 6015 },
                    { label: 'Pusok', zipCode: 6015 },
                    { label: 'Caw-oy', zipCode: 6015 },
                    { label: 'Sabang', zipCode: 6015 },
                    { label: 'Cawhagan', zipCode: 6015 },
                    { label: 'Santa Rosa', zipCode: 6015 },
                    { label: 'Caubian', zipCode: 6015 },
                    { label: 'Subabasbas', zipCode: 6015 },
                    { label: 'Gun-ob', zipCode: 6015 },
                    { label: 'Talima', zipCode: 6015 },
                    { label: 'Ibo', zipCode: 6015 },
                    { label: 'Tingo', zipCode: 6015 },
                    { label: 'Looc', zipCode: 6015 },
                    { label: 'Tungasan', zipCode: 6015 },
                    { label: 'Mactan', zipCode: 6015 },
                    { label: 'San Vicente', zipCode: 6015 }
                ]
            },
            { 
                label: 'Liloan', 
                value: 'liloan',
                zipCode: [
                    { code: 6002 }
                ],
                barangays: [
                    { label: 'Cabadiangan', zipCode: 6002 },
                    { label: 'Poblacion', zipCode: 6002 },
                    { label: 'Calero', zipCode: 6002 },
                    { label: 'San Roque', zipCode: 6002 },
                    { label: 'Catarman', zipCode: 6002 },
                    { label: 'San Vicente', zipCode: 6002 },
                    { label: 'Cotcot', zipCode: 6002 },
                    { label: 'Santa Cruz', zipCode: 6002 },
                    { label: 'Jubay', zipCode: 6002 },
                    { label: 'Tabla', zipCode: 6002 },
                    { label: 'Lataban', zipCode: 6002 },
                    { label: 'Tayud', zipCode: 6002 },
                    { label: 'Mulao', zipCode: 6002 },
                    { label: 'Yati', zipCode: 6002 }
                ]
            },
            { 
                label: 'Madridejos', 
                value: 'madridejos',
                zipCode: [
                    { code: 6053 }
                ],
                barangays: [
                    { label: 'Bunakan', zipCode: 6053 },
                    { label: 'Pili', zipCode: 6053 },
                    { label: 'Kangwayan', zipCode: 6053 },
                    { label: 'Poblacion', zipCode: 6053 },
                    { label: 'Kaongkod', zipCode: 6053 },
                    { label: 'San Agustin', zipCode: 6053 },
                    { label: 'Kodia', zipCode: 6053 },
                    { label: 'Tabagak', zipCode: 6053 },
                    { label: 'Maalat', zipCode: 6053 },
                    { label: 'Talangnan', zipCode: 6053 },
                    { label: 'Malbago', zipCode: 6053 },
                    { label: 'Tarong', zipCode: 6053 },
                    { label: 'Mancilang', zipCode: 6053 },
                    { label: 'Tugas', zipCode: 6053 }
                ]
            },
            { 
                label: 'Malabuyoc', 
                value: 'malabuyoc',
                zipCode: [
                    { code: 6029 }
                ],
                barangays: [
                    { label: 'Armeña', zipCode: 6029 },
                    { label: 'Mindanao', zipCode: 6029 },
                    { label: 'Tolosa', zipCode: 6029 },
                    { label: 'Montañeza', zipCode: 6029 },
                    { label: 'Cerdeña (Ansan)', zipCode: 6029 },
                    { label: 'Salmeron (Bulak)', zipCode: 6029 },
                    { label: 'Labrador (Bulod)', zipCode: 6029 },
                    { label: 'Santo Niño', zipCode: 6029 },
                    { label: 'Looc', zipCode: 6029 },
                    { label: 'Sorsogon (Balimaya)', zipCode: 6029 },
                    { label: 'Lombo', zipCode: 6029 },
                    { label: 'Barangay I (Pob.)', zipCode: 6029 },
                    { label: 'Mahanlud', zipCode: 6029 },
                    { label: 'Barangay II (Pob.)', zipCode: 6029 }
                ]
            },
            { 
                label: 'Mandaue City', 
                value: 'mandaue-city',
                zipCode: [
                    { code: 6014 }
                ],
                barangays: [
                    { label: 'Alang-alang', zipCode: 6014 },
                    { label: 'Labogon', zipCode: 6014 },
                    { label: 'Bakilid', zipCode: 6014 },
                    { label: 'Looc', zipCode: 6014 },
                    { label: 'Banilad', zipCode: 6014 },
                    { label: 'Maguikay', zipCode: 6014 },
                    { label: 'Basak', zipCode: 6014 },
                    { label: 'Mantuyong', zipCode: 6014 },
                    { label: 'Cabancalan', zipCode: 6014 },
                    { label: 'Opao', zipCode: 6014 },
                    { label: 'Cambaro', zipCode: 6014 },
                    { label: 'Pakna-an', zipCode: 6014 },
                    { label: 'Canduman', zipCode: 6014 },
                    { label: 'Pagsabungan', zipCode: 6014 },
                    { label: 'Casili', zipCode: 6014 },
                    { label: 'Subangdaku', zipCode: 6014 },
                    { label: 'Casuntingan', zipCode: 6014 },
                    { label: 'Tabok', zipCode: 6014 },
                    { label: 'Centro (Pob.)', zipCode: 6014 },
                    { label: 'Tawason', zipCode: 6014 },
                    { label: 'Cubacub', zipCode: 6014 },
                    { label: 'Tingub', zipCode: 6014 },
                    { label: 'Guizo', zipCode: 6014 },
                    { label: 'Tipolo', zipCode: 6014 },
                    { label: 'Ibabao-Estancia', zipCode: 6014 },
                    { label: 'Umapad', zipCode: 6014 },
                    { label: 'Jagobiao', zipCode: 6014 }
                ]
            },
            { 
                label: 'Medellin', 
                value: 'medellin',
                zipCode: [
                    { code: 6012 }
                ],
                barangays: [
                    { label: 'Antipolo', zipCode: 6012 },
                    { label: 'Lamintak Norte', zipCode: 6012 },
                    { label: 'Daanlungsod', zipCode: 6012 },
                    { label: 'Panugnawan', zipCode: 6012 },
                    { label: 'Dalingding Sur', zipCode: 6012 },
                    { label: 'Poblacion', zipCode: 6012 },
                    { label: 'Dayhagon', zipCode: 6012 },
                    { label: 'Tindog', zipCode: 6012 },
                    { label: 'Gibitngil', zipCode: 6012 },
                    { label: 'Don Virgilio Gonzales', zipCode: 6012 },
                    { label: 'Canhabagat', zipCode: 6012 },
                    { label: 'Lamintak Sur', zipCode: 6012 },
                    { label: 'Caputatan Norte', zipCode: 6012 },
                    { label: 'Maharuhay', zipCode: 6012 },
                    { label: 'Caputatan Sur', zipCode: 6012 },
                    { label: 'Mahawak', zipCode: 6012 },
                    { label: 'Kawit', zipCode: 6012 }
                ]
            },
            { 
                label: 'Minglanilla', 
                value: 'minglanilla',
                zipCode: [
                    { code: 6046 }
                ],
                barangays: [
                    { label: 'Cadulawan', zipCode: 6046 },
                    { label: 'Poblacion Ward II', zipCode: 6046 },
                    { label: 'Calajo-an', zipCode: 6046 },
                    { label: 'Camp 7', zipCode: 6046 },
                    { label: 'Poblacion Ward III', zipCode: 6046 },
                    { label: 'Camp 8', zipCode: 6046 },
                    { label: 'Tubod', zipCode: 6046 },
                    { label: 'Cuanos', zipCode: 6046 },
                    { label: 'Tulay', zipCode: 6046 },
                    { label: 'Guindaruhan', zipCode: 6046 },
                    { label: 'Tunghaan', zipCode: 6046 },
                    { label: 'Linao', zipCode: 6046 },
                    { label: 'Tungkop', zipCode: 6046 },
                    { label: 'Manduang', zipCode: 6046 },
                    { label: 'Vito', zipCode: 6046 },
                    { label: 'Pakigne', zipCode: 6046 },
                    { label: 'Tungkil', zipCode: 6046 },
                    { label: 'Poblacion Ward I', zipCode: 6046 }

                ]
            },
            { 
                label: 'Moalboal', 
                value: 'moalboal',
                zipCode: [
                    { code: 6032 }
                ],
                barangays: [
                    { label: 'Agbalanga', zipCode: 6032 },
                    { label: 'Lanao', zipCode: 6032 },
                    { label: 'Bala', zipCode: 6032 },
                    { label: 'Poblacion East', zipCode: 6032 },
                    { label: 'Balabagon', zipCode: 6032 },
                    { label: 'Poblacion West', zipCode: 6032 },
                    { label: 'Basdiot', zipCode: 6032 },
                    { label: 'Batadbatad', zipCode: 6032 },
                    { label: 'Tomonoy', zipCode: 6032 },
                    { label: 'Bugho', zipCode: 6032 },
                    { label: 'Tuble', zipCode: 6032 },
                    { label: 'Buguil', zipCode: 6032 },
                    { label: 'Tunga', zipCode: 6032 },
                    { label: 'Busay', zipCode: 6032 }
                ]
            },
            { 
                label: 'Naga City', 
                value: 'naga-city',
                zipCode: [
                    { code: 6037 }
                ],
                barangays: [
                    { label: 'Alfaco', zipCode: 6037 },
                    { label: 'Lutac', zipCode: 6037 },
                    { label: 'Bairan', zipCode: 6037 },
                    { label: 'Mainit', zipCode: 6037 },
                    { label: 'Balirong', zipCode: 6037 },
                    { label: 'Mayana', zipCode: 6037 },
                    { label: 'Cabungahan', zipCode: 6037 },
                    { label: 'Naalad', zipCode: 6037 },
                    { label: 'Cantao-an', zipCode: 6037 },
                    { label: 'North Poblacion', zipCode: 6037 },
                    { label: 'Central Poblacion', zipCode: 6037 },
                    { label: 'Pangdan', zipCode: 6037 },
                    { label: 'Cogon', zipCode: 6037 },
                    { label: 'Patag', zipCode: 6037 },
                    { label: 'Colon', zipCode: 6037 },
                    { label: 'South Poblacion', zipCode: 6037 },
                    { label: 'East Poblacion', zipCode: 6037 },
                    { label: 'Tagjaguimit', zipCode: 6037 },
                    { label: 'Inoburan', zipCode: 6037 },
                    { label: 'Tangke', zipCode: 6037 },
                    { label: 'Inayagan', zipCode: 6037 },
                    { label: 'Tinaan', zipCode: 6037 },
                    { label: 'Jaguimit', zipCode: 6037 },
                    { label: 'Tuyan', zipCode: 6037 },
                    { label: 'Lanas', zipCode: 6037 },
                    { label: 'Uling', zipCode: 6037 },
                    { label: 'Langtad', zipCode: 6037 },
                    { label: 'West Poblacion', zipCode: 6037 }
                ]
            },
            { 
                label: 'Oslob', 
                value: 'oslob',
                zipCode: [
                    { code: 6025 }
                ],
                barangays: [
                    { label: 'Alo', zipCode: 6025 },
                    { label: 'Lagunde', zipCode: 6025 },
                    { label: 'Bangcogon', zipCode: 6025 },
                    { label: 'Looc', zipCode: 6025 },
                    { label: 'Bonbon', zipCode: 6025 },
                    { label: 'Luka', zipCode: 6025 },
                    { label: 'Calumpang', zipCode: 6025 },
                    { label: 'Mainit', zipCode: 6025 },
                    { label: 'Canangca-an', zipCode: 6025 },
                    { label: 'Manlum', zipCode: 6025 },
                    { label: 'Cañang', zipCode: 6025 },
                    { label: 'Nueva Caceres', zipCode: 6025 },
                    { label: 'Can-ukban', zipCode: 6025 },
                    { label: 'Poblacion', zipCode: 6025 },
                    { label: 'Cansalo-ay', zipCode: 6025 },
                    { label: 'Pungtod', zipCode: 6025 },
                    { label: 'Daanlungsod', zipCode: 6025 },
                    { label: 'Tan-awan', zipCode: 6025 },
                    { label: 'Gawi', zipCode: 6025 },
                    { label: 'Tumalog', zipCode: 6025 },
                    { label: 'Hagdan', zipCode: 6025 }
                ]
            },
            { 
                label: 'Pilar', 
                value: 'pilar',
                zipCode: [
                    { code: 6048 }
                ],
                barangays: [
                    { label: 'Biasong', zipCode: 6048 },
                    { label: 'Monntserrat', zipCode: 6048 },
                    { label: 'Cawit', zipCode: 6048 },
                    { label: 'San Isidro', zipCode: 6048 },
                    { label: 'Dapdap', zipCode: 6048 },
                    { label: 'Esperanza', zipCode: 6048 },
                    { label: 'Lanao', zipCode: 6048 },
                    { label: 'Lower Poblacion', zipCode: 6048 },
                    { label: 'Moabog', zipCode: 6048 }
                ]
            },
            { 
                label: 'Pinamungajan', 
                value: 'pinamungajan',
                zipCode: [
                    { code: 6039 }
                ],
                barangays: [
                    { label: 'Anislag', zipCode: 6039 },
                    { label: 'Opao', zipCode: 6039 },
                    { label: 'Anopog', zipCode: 6039 },
                    { label: 'Pandacan', zipCode: 6039 },
                    { label: 'Binabag', zipCode: 6039 },
                    { label: 'Buhingtubig', zipCode: 6039 },
                    { label: 'Busay', zipCode: 6039 },
                    { label: 'Butong', zipCode: 6039 },
                    { label: 'Cabiangon', zipCode: 6039 },
                    { label: 'Camugao', zipCode: 6039 },
                    { label: 'Duangan', zipCode: 6039 },
                    { label: 'Guimbawian', zipCode: 6039 },
                    { label: 'Lamac', zipCode: 6039 },
                    { label: 'Lut-od', zipCode: 6039 },
                    { label: 'Mangoto', zipCode: 6039 }
                ]
            },
            { 
                label: 'Poro', 
                value: 'poro',
                zipCode: [
                    { code: 6049 }
                ],
                barangays: [
                    { label: 'Adela', zipCode: 6049 },
                    { label: 'Mercedes', zipCode: 6049 },
                    { label: 'Altavista', zipCode: 6049 },
                    { label: 'Pagsa', zipCode: 6049 },
                    { label: 'Cagcagan', zipCode: 6049 },
                    { label: 'Cansabusab', zipCode: 6049 },
                    { label: 'Daan Paz', zipCode: 6049 },
                    { label: 'Eastern Poblacion', zipCode: 6049 },
                    { label: 'Esperanza', zipCode: 6049 },
                    { label: 'Libertad', zipCode: 6049 },
                    { label: 'Mabini', zipCode: 6049 }
                ]
            },
            { 
                label: 'Ronda', 
                value: 'ronda',
                zipCode: [
                    { code: 6034 }
                ],
                barangays: [
                    { label: 'Butong', zipCode: 6034 },
                    { label: 'Libo-o', zipCode: 6034 },
                    { label: 'Can-abuhon', zipCode: 6034 },
                    { label: 'Malalay', zipCode: 6034 },
                    { label: 'Canduling', zipCode: 6034 },
                    { label: 'Cansalonoy', zipCode: 6034 },
                    { label: 'Cansayahon', zipCode: 6034 },
                    { label: 'Ilaya', zipCode: 6034 },
                    { label: 'Langin', zipCode: 6034 }
                ]
            },
            { 
                label: 'Samboan', 
                value: 'samboan',
                zipCode: [
                    { code: 6027 }
                ],
                barangays: [
                    { label: 'Basak', zipCode: 6027 },
                    { label: 'Jumangpas', zipCode: 6027 },
                    { label: 'Bonbon', zipCode: 6027 },
                    { label: 'Camburoy', zipCode: 6027 },
                    { label: 'Bulangsuran', zipCode: 6027 },
                    { label: 'Poblacion', zipCode: 6027 },
                    { label: 'Calatagan', zipCode: 6027 },
                    { label: 'San Sebastian', zipCode: 6027 },
                    { label: 'Cambigong', zipCode: 6027 },
                    { label: 'Suba', zipCode: 6027 },
                    { label: 'Canorong', zipCode: 6027 },
                    { label: 'Tangbo', zipCode: 6027 },
                    { label: 'Colase', zipCode: 6027 },
                    { label: 'Monteverde', zipCode: 6027 },
                    { label: 'Dalahikan', zipCode: 6027 }
                ]
            },
            { 
                label: 'San Fernando', 
                value: 'san-fernando',
                zipCode: [
                    { code: 6018 }
                ],
                barangays: [
                    { label: 'Balud', zipCode: 6018 },
                    { label: 'Pitalo', zipCode: 6018 },
                    { label: 'Balungag', zipCode: 6018 },
                    { label: 'San Isidro', zipCode: 6018 },
                    { label: 'Basak', zipCode: 6018 },
                    { label: 'Sangat', zipCode: 6018 },
                    { label: 'Bugho', zipCode: 6018 },
                    { label: 'Poblacion South', zipCode: 6018 },
                    { label: 'Cabatbatan', zipCode: 6018 },
                    { label: 'Tabionan', zipCode: 6018 },
                    { label: 'Greenhills', zipCode: 6018 },
                    { label: 'Tananas', zipCode: 6018 },
                    { label: 'Lantawan', zipCode: 6018 },
                    { label: 'Tinubdan', zipCode: 6018 },
                    { label: 'Liburon', zipCode: 6018 },
                    { label: 'Tonggo', zipCode: 6018 },
                    { label: 'Magsico', zipCode: 6018 },
                    { label: 'Tubod', zipCode: 6018 },
                    { label: 'Poblacion North', zipCode: 6018 },
                    { label: 'Ilaya', zipCode: 6018 },
                    { label: 'Panadtaran', zipCode: 6018 }
                ]
            },
            { 
                label: 'San Francisco', 
                value: 'san-francisco',
                zipCode: [
                    { code: 6050 }
                ],
                barangays: [
                    { label: 'Montealgre', zipCode: 6050 },
                    { label: 'Santa Cruz', zipCode: 6050 },
                    { label: 'Cabunga-an', zipCode: 6050 },
                    { label: 'Santiago', zipCode: 6050 },
                    { label: 'Campo', zipCode: 6050 },
                    { label: 'Sonog', zipCode: 6050 },
                    { label: 'Consuelo', zipCode: 6050 },
                    { label: 'Southern Poblacion', zipCode: 6050 },
                    { label: 'Esperanza', zipCode: 6050 },
                    { label: 'Unidos', zipCode: 6050 },
                    { label: 'Himensulan', zipCode: 6050 },
                    { label: 'Union', zipCode: 6050 },
                    { label: 'Northern Poblacion', zipCode: 6050 },
                    { label: 'Western Poblacion', zipCode: 6050 },
                    { label: 'San Isidro', zipCode: 6050 }
                ]
            },
            { 
                label: 'San Remigio', 
                value: 'san-remigio',
                zipCode: [
                    { code: 6011 }
                ],
                barangays: [
                    { label: 'Anapog', zipCode: 6011 },
                    { label: 'Lawis', zipCode: 6011 },
                    { label: 'Argawanon', zipCode: 6011 },
                    { label: 'Libaong', zipCode: 6011 },
                    { label: 'Bagtic', zipCode: 6011 },
                    { label: 'Looc', zipCode: 6011 },
                    { label: 'Bancasan', zipCode: 6011 },
                    { label: 'Luyang', zipCode: 6011 },
                    { label: 'Batad', zipCode: 6011 },
                    { label: 'Mano', zipCode: 6011 },
                    { label: 'Busogon', zipCode: 6011 },
                    { label: 'Poblacion', zipCode: 6011 },
                    { label: 'Calambua', zipCode: 6011 },
                    { label: 'Punta', zipCode: 6011 },
                    { label: 'Canagahan', zipCode: 6011 },
                    { label: 'Sab-a', zipCode: 6011 },
                    { label: 'Dapdap', zipCode: 6011 },
                    { label: 'San Miguel', zipCode: 6011 },
                    { label: 'Gawaygaway', zipCode: 6011 },
                    { label: 'Tacup', zipCode: 6011 },
                    { label: 'Hagnaya', zipCode: 6011 },
                    { label: 'Tambongon', zipCode: 6011 },
                    { label: 'Kayam', zipCode: 6011 },
                    { label: 'To-ong', zipCode: 6011 },
                    { label: 'Kinawahan', zipCode: 6011 },
                    { label: 'Victoria', zipCode: 6011 },
                    { label: 'Lambusan', zipCode: 6011 }
                ]
            },
            { 
                label: 'Santa Fe', 
                value: 'santa-fe',
                zipCode: [
                    { code: 6047 }
                ],
                barangays: [
                    { label: 'Hagda', zipCode: 6047 },
                    { label: 'Okoy', zipCode: 6047 },
                    { label: 'Hilatangan', zipCode: 6047 },
                    { label: 'Poblacion', zipCode: 6047 },
                    { label: 'Kintarkan', zipCode: 6047 },
                    { label: 'Balidbid', zipCode: 6047 },
                    { label: 'Langub', zipCode: 6047 },
                    { label: 'Pooc', zipCode: 6047 },
                    { label: 'Maricaban', zipCode: 6047 },
                    { label: 'Talisay', zipCode: 6047 }
                ]
            },
            { 
                label: 'Santander', 
                value: 'santander',
                zipCode: [
                    { code: 6026 }
                ],
                barangays: [
                    { label: 'Bunlan', zipCode: 6026 },
                    { label: 'Looc', zipCode: 6026 },
                    { label: 'Cabutongan', zipCode: 6026 },
                    { label: 'Pasil', zipCode: 6026 },
                    { label: 'Candamiang', zipCode: 6026 },
                    { label: 'Poblacion', zipCode: 6026 },
                    { label: 'Liloan', zipCode: 6026 },
                    { label: 'Talisay', zipCode: 6026 },
                    { label: 'Lip-tong', zipCode: 6026 },
                    { label: 'Canlumacad', zipCode: 6026 },
                ]
            },
            { 
                label: 'Sibonga', 
                value: 'sibonga',
                zipCode: [
                    { code: 6020 }
                ],
                barangays: [
                    { label: 'Abugon', zipCode: 6020 },
                    { label: 'Lamacan', zipCode: 6020 },
                    { label: 'Bae', zipCode: 6020 },
                    { label: 'Libo', zipCode: 6020 },
                    { label: 'Bagacay', zipCode: 6020 },
                    { label: 'Lindogon', zipCode: 6020 },
                    { label: 'Bahay', zipCode: 6020 },
                    { label: 'Magcagong', zipCode: 6020 },
                    { label: 'Banlot', zipCode: 6020 },
                    { label: 'Manatad', zipCode: 6020 },
                    { label: 'Basak', zipCode: 6020 },
                    { label: 'Mangyan', zipCode: 6020 },
                    { label: 'Bato', zipCode: 6020 },
                    { label: 'Papan', zipCode: 6020 },
                    { label: 'Cagay', zipCode: 6020 },
                    { label: 'Poblacion', zipCode: 6020 },
                    { label: 'Can-aga', zipCode: 6020 },
                    { label: 'Sabang', zipCode: 6020 },
                    { label: 'Candaguit', zipCode: 6020 },
                    { label: 'Sayao', zipCode: 6020 },
                    { label: 'Cantolaroy', zipCode: 6020 },
                    { label: 'Simala', zipCode: 6020 },
                    { label: 'Dugoan', zipCode: 6020 },
                    { label: 'Tubod', zipCode: 6020 },
                    { label: 'Guimbangco-an', zipCode: 6020 }
                ]
            },
            { 
                label: 'Sogod', 
                value: 'sogod',
                zipCode: [
                    { code: 6007 }
                ],
                barangays: [
                    { label: 'Ampongol', zipCode: 6007 },
                    { label: 'Ibabao', zipCode: 6007 },
                    { label: 'Bagakay', zipCode: 6007 },
                    { label: 'Liki', zipCode: 6007 },
                    { label: 'Bagatayam', zipCode: 6007 },
                    { label: 'Lubo', zipCode: 6007 },
                    { label: 'Bawo', zipCode: 6007 },
                    { label: 'Mohon', zipCode: 6007 },
                    { label: 'Cabalawan', zipCode: 6007 },
                    { label: 'Nahus-an', zipCode: 6007 },
                    { label: 'Cabangahan', zipCode: 6007 },
                    { label: 'Poblacion', zipCode: 6007 },
                    { label: 'Calumboyan', zipCode: 6007 },
                    { label: 'Tabunok', zipCode: 6007 },
                    { label: 'Dakit', zipCode: 6007 },
                    { label: 'Takay', zipCode: 6007 },
                    { label: 'Damolog', zipCode: 6007 },
                    { label: 'Pansoy', zipCode: 6007 }
                ]
            },
            { 
                label: 'Tabogon', 
                value: 'tabogon',
                zipCode: [
                    { code: 6009 }
                ],
                barangays: [
                    { label: 'Alang-alang', zipCode: 6009 },
                    { label: 'Manlagtang', zipCode: 6009 },
                    { label: 'Canduawan', zipCode: 6009 },
                    { label: 'Maslog', zipCode: 6009 },
                    { label: 'Kal-anan', zipCode: 6009 },
                    { label: 'Muabog', zipCode: 6009 },
                    { label: 'Camoboan', zipCode: 6009 },
                    { label: 'Pio', zipCode: 6009 },
                    { label: 'Canaocanao', zipCode: 6009 },
                    { label: 'Poblacion', zipCode: 6009 },
                    { label: 'Combado', zipCode: 6009 },
                    { label: 'Salag', zipCode: 6009 },
                    { label: 'Daantabogon', zipCode: 6009 },
                    { label: 'Sambag', zipCode: 6009 },
                    { label: 'Ilihan', zipCode: 6009 },
                    { label: 'San Isidro', zipCode: 6009 },
                    { label: 'Labangon', zipCode: 6009 },
                    { label: 'San Vicente', zipCode: 6009 },
                    { label: 'Libjo', zipCode: 6009 },
                    { label: 'Somosa', zipCode: 6009 },
                    { label: 'Loong', zipCode: 6009 },
                    { label: 'Taba-ao', zipCode: 6009 },
                    { label: 'Mabuli', zipCode: 6009 },
                    { label: 'Tapul', zipCode: 6009 },
                    { label: 'Managase', zipCode: 6009 }
                ]
            },
            { 
                label: 'Tabuelan', 
                value: 'tabuelan',
                zipCode: [
                    { code: 6044 }
                ],
                barangays: [
                    { label: 'Bongon', zipCode: 6044 },
                    { label: 'Maravilla', zipCode: 6044 },
                    { label: 'Kanlim-ao', zipCode: 6044 },
                    { label: 'Olivo', zipCode: 6044 },
                    { label: 'Kanluhangon', zipCode: 6044 },
                    { label: 'Poblacion', zipCode: 6044 },
                    { label: 'Kantubaon', zipCode: 6044 },
                    { label: 'Tabunok', zipCode: 6044 },
                    { label: 'Dalid', zipCode: 6044 },
                    { label: 'Tigbawan', zipCode: 6044 },
                    { label: 'Mabunao', zipCode: 6044 },
                    { label: 'Villahermosa', zipCode: 6044 }
                ]
            },
            { 
                label: 'Talisay City', 
                value: 'talisay-city',
                zipCode: [
                    { code: 6045 }
                ],
                barangays: [
                    { label: 'Bulacao', zipCode: 6045 },
                    { label: 'Poblacion', zipCode: 6045 },
                    { label: 'Cadulawan', zipCode: 6045 },
                    { label: 'Pooc', zipCode: 6045 },
                    { label: 'Cansojong', zipCode: 6045 },
                    { label: 'San Isidro', zipCode: 6045 },
                    { label: 'Dumlog', zipCode: 6045 },
                    { label: 'San Roque', zipCode: 6045 },
                    { label: 'Jaclupan', zipCode: 6045 },
                    { label: 'Tabunoc', zipCode: 6045 },
                    { label: 'Lagtang', zipCode: 6045 },
                    { label: 'Tangke', zipCode: 6045 },
                    { label: 'Lawaan I', zipCode: 6045 },
                    { label: 'Tapul', zipCode: 6045 },
                    { label: 'Linao', zipCode: 6045 },
                    { label: 'Biasong', zipCode: 6045 },
                    { label: 'Maghaway', zipCode: 6045 },
                    { label: 'Camp IV', zipCode: 6045 },
                    { label: 'Manipis', zipCode: 6045 },
                    { label: 'Lawaan II', zipCode: 6045 },
                    { label: 'Mohon', zipCode: 6045 },
                    { label: 'Lawaan III', zipCode: 6045 }
                ]
            },
            { 
                label: 'Toledo City', 
                value: 'toledo-city',
                zipCode: [
                    { code: 6038 }
                ],
                barangays: [
                    { label: 'Awihao', zipCode: 6038 },
                    { label: 'Media Once', zipCode: 6038 },
                    { label: 'Bagakay', zipCode: 6038 },
                    { label: 'Pangamihan', zipCode: 6038 },
                    { label: 'Bato', zipCode: 6038 },
                    { label: 'Poblacion', zipCode: 6038 },
                    { label: 'Biga', zipCode: 6038 },
                    { label: 'Poog', zipCode: 6038 },
                    { label: 'Bulongan', zipCode: 6038 },
                    { label: 'Putingbato', zipCode: 6038 },
                    { label: 'Bunga', zipCode: 6038 },
                    { label: 'Sagay', zipCode: 6038 },
                    { label: 'Cabitoonan', zipCode: 6038 },
                    { label: 'Sam-ang', zipCode: 6038 },
                    { label: 'Calongcalong', zipCode: 6038 },
                    { label: 'Sangi', zipCode: 6038 },
                    { label: 'Cambang-ug', zipCode: 6038 },
                    { label: 'Santo Niño (Mainggit)', zipCode: 6038 },
                    { label: 'Camp 8', zipCode: 6038 },
                    { label: 'Subayon', zipCode: 6038 },
                    { label: 'Canlumampao', zipCode: 6038 },
                    { label: 'Talavera', zipCode: 6038 },
                    { label: 'Cantabaco', zipCode: 6038 },
                    { label: 'Tungkay', zipCode: 6038 },
                    { label: 'Capitan Claudio', zipCode: 6038 },
                    { label: 'Tubod', zipCode: 6038 },
                    { label: 'Carmen', zipCode: 6038 },
                    { label: 'Daanglungsod', zipCode: 6038 },
                    { label: 'Santo Niño (Mainggit)', zipCode: 6038 },
                    { label: 'Don Andres Soriano (Lutopan)', zipCode: 6038 },
                    { label: 'Dumlog', zipCode: 6038 },
                    { label: 'Ibo', zipCode: 6038 },
                    { label: 'Ilihan', zipCode: 6038 }
                ]
            },
            { 
                label: 'Tuburan', 
                value: 'tuburan',
                zipCode: [
                    { code: 6043 }
                ],
                barangays: [
                    { label: 'Alegria', zipCode: 6043 },
                    { label: 'Libo', zipCode: 6043 },
                    { label: 'Amatugan', zipCode: 6043 },
                    { label: 'Lusong', zipCode: 6043 },
                    { label: 'Antipolo', zipCode: 6043 },
                    { label: 'Macupa', zipCode: 6043 },
                    { label: 'Apalan', zipCode: 6043 },
                    { label: 'Mag-alwa', zipCode: 6043 },
                    { label: 'Bagasawe', zipCode: 6043 },
                    { label: 'Mag-antoy', zipCode: 6043 },
                    { label: 'Bakyawan', zipCode: 6043 },
                    { label: 'Mag-atubang', zipCode: 6043 },
                    { label: 'Bangkito', zipCode: 6043 },
                    { label: 'Maghan-ay', zipCode: 6043 },
                    { label: 'Bulwang', zipCode: 6043 },
                    { label: 'Mangga', zipCode: 6043 },
                    { label: 'Kabangkalan', zipCode: 6043 },
                    { label: 'Marmol', zipCode: 6043 },
                    { label: 'Kalangahan', zipCode: 6043 },
                    { label: 'Molobolo', zipCode: 6043 },
                    { label: 'Kamansi', zipCode: 6043 },
                    { label: 'Montealegre', zipCode: 6043 },
                    { label: 'Kan-an', zipCode: 6043 },
                    { label: 'Putat', zipCode: 6043 },
                    { label: 'Kanlunsing', zipCode: 6043 },
                    { label: 'San Juan', zipCode: 6043 },
                    { label: 'Kansi', zipCode: 6043 },
                    { label: 'Sandayong', zipCode: 6043 },
                    { label: 'Caridad', zipCode: 6043 },
                    { label: 'Santo Niño', zipCode: 6043 },
                    { label: 'Carmelo', zipCode: 6043 },
                    { label: 'Siotes', zipCode: 6043 },
                    { label: 'Cogon', zipCode: 6043 },
                    { label: 'Sumon', zipCode: 6043 },
                    { label: 'Colonia', zipCode: 6043 },
                    { label: 'Tominjao', zipCode: 6043 },
                    { label: 'Daan Lungsod', zipCode: 6043 },
                    { label: 'Tomugpa', zipCode: 6043 },
                    { label: 'Fortaliza', zipCode: 6043 },
                    { label: 'Barangay I (Pob.)', zipCode: 6043 },
                    { label: 'Ga-ang', zipCode: 6043 },
                    { label: 'Barangay II (Pob.)', zipCode: 6043 },
                    { label: 'Gimama-a', zipCode: 6043 },
                    { label: 'Barangay III (Pob.)', zipCode: 6043 },
                    { label: 'Jagbuaya', zipCode: 6043 },
                    { label: 'Barangay IV (Pob.)', zipCode: 6043 },
                    { label: 'Kabkaban', zipCode: 6043 },
                    { label: 'Barangay V (Pob.)', zipCode: 6043 },
                    { label: 'Kagba-o', zipCode: 6043 },
                    { label: 'Barangay VI (Pob.)', zipCode: 6043 },
                    { label: 'Kampoot', zipCode: 6043 },
                    { label: 'Barangay VII (Pob.)', zipCode: 6043 },
                    { label: 'Kaorasan', zipCode: 6043 },
                    { label: 'Barangay VIII (Pob.)', zipCode: 6043 }
                ]
            },
            { 
                label: 'Tudela', 
                value: 'tudela',
                zipCode: [
                    { code: 6051 }
                ],
                barangays: [
                    { label: 'Buenavista', zipCode: 6051 },
                    { label: 'Puertobello', zipCode: 6051 },
                    { label: 'Calmante',label: 'Calmante', zipCode: 6051 },
                    { label: 'Santander',label: 'Santander', zipCode: 6051 },
                    { label: 'Daan Secante', label: 'Daan Secante', zipCode: 6051 },
                    { label: 'Secante Bag-o', label: 'Secante Bag-o', zipCode: 6051 },
                    { label: 'General',label: 'General', zipCode: 6051 },
                    { label: 'Southern Poblacion', label: 'Southern Poblacion', zipCode: 6051 },
                    { label: 'McArthur',label: 'McArthur', zipCode: 6051 },
                    { label: 'Villahermosa', label: 'Villahermosa', zipCode: 6051 },
                    { label: 'Northern Poblacion', label: 'Northern Poblacion', zipCode: 6051 }
                ]
            }


        ]
    }
  ];

  const data = [
    {label: 'Item 1', value: 'Item 1'},
    {label: 'Item 2', value: 'Item 2'},
    {label: 'Item 3', value: 'Item 3'},
    {label: 'Item 4', value: 'Item 4'},
    {label: 'Item 5', value: 'Item 5'},
  ]

  const munc = municipalities.map(m => ({label: m.label, value: m.value}));

  const [selectionData, setSelectionData] = useState({
    cities: [],
    citiesData: undefined,
    barangays: [],
    barangaysData: undefined
  });

  useEffect(() => {
    if(formData.province !== "") {
      const [cities] = municipalities.filter( m => m.value === formData.province);
      const citiesMap = cities.cities.map(c => ({label: c.label, value: c.value, zipCode: c.zipCode[0].code}));
      setSelectionData(prev => ({...prev, cities: citiesMap, citiesData: cities }));
    }
  },[formData.province]);

  useEffect(() => {
    if(selectionData.citiesData && selectionData.citiesData.cities.length > 0) {
      const [barangays] = selectionData.citiesData.cities.filter( b => b.value === formData.city);
      const barangaysMap = barangays.barangays.map(c => ({label: c.label, value: c.label}));
      console.log(barangaysMap);
      setSelectionData(prev => ({...prev, barangays: barangaysMap, barangaysData: barangays }))
    }

    if(formData.city !== '') {
      const t = selectionData.cities.filter(c => c.value === formData.city);
      setFormData(prev => ({...prev, zipcode: String(t[0].zipCode)}));
    }
  },[formData.city]);

  // useEffect(() => {
  //   if(selectionData.barangaysData === undefined) return;
  //   const [barangay] = selectionData.barangaysData.barangays.filter(b => b.label === formData.barangay);
  //   if(barangay && barangay.zipCode) {
  //     setFormData(prev => ({...prev, zipcode: String(barangay.zipCode)}));
  //   }
    
  // },[formData.barangay]);

  const nationality = [
    { label: 'Filipino', value: 'Filipino' },
  ]

  const fundSource = [
    { label: 'Job', value: 'Job' },
    { label: 'Allowance', value: 'Allowance' },
    
  ]

  // State for date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Toggle "No Middle Name" checkbox
  const toggleNoMiddleName = () => {
    setFormData((prev) => ({
      ...prev,
      HasNoMiddleName: !prev.HasNoMiddleName,
      middle_name: !prev.HasNoMiddleName ? "" : prev.middle_name,
    }));
  };

  // Handle Date Picker Change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if(new Date().toDateString() === new Date(selectedDate).toDateString()) {
      alert('Cannot select same day!');
    }

    if(new Date().getTime() < new Date(selectedDate).getTime()) {
      alert('Your birthdate must be before today!');
    }

    if (selectedDate) {
      console.log(selectedDate);
      setFormData({ ...formData, birthdate: selectedDate });
    }
  };

  // Navigate to ConfirmAccount
  const handleNext = () => {
    const keys = [];
    let bdayerr ='';
    Object.entries(formData).forEach(([key, value]) => {
      if(typeof value === 'string' && value === '') {
        keys.push(key);
      }

      if(key === 'birthdate') {
        const last_login = new Date(value);
        const curDate = new Date();
        const diffTime = Math.abs(curDate.getTime() - last_login.getTime());
        const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffMonth = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
        const diffYear = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));

        if(diffYear < 18) {
          bdayerr = 'You must be be above 18 to register! '
        }
      }
    });

    if(keys.length > 0) {
      alert('There are some missing fields! ' + keys.join(", ") + '\n\n\n ' + bdayerr);
      return;
    }

    navigation.navigate("ConfirmAccount", { formData: {...formData} });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
        <Text className='text-primary font-semibold text-xl pt-8'>Tell us something about yourself</Text>
        <Text className='text-gray-400'>Make sure everything is correct. You can no longer edit these details once you register.</Text>
      </View>

      <ScrollView className='text-primary'>
        <Text className='text-lg font-semibold mb-4'>PERSONAL INFORMATION</Text>
        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(value) => handleInputChange("first_name", value)}
          />
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

        {!formData.HasNoMiddleName && (
          <>
          <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
            <TextInput
              className='border border-gray-300 rounded-md p-4 bg-white'
              placeholder="Middle Name"
              value={formData.middle_name}
              onChangeText={(value) => handleInputChange("middle_name", value)}
            />
          </TouchableOpacity>
          <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>
          </>
        )}

        <View className='flex-row gap-2 pl-4'>
          <TouchableOpacity
            style={[styles.checkbox, formData.HasNoMiddleName && styles.checked]}
            onPress={toggleNoMiddleName}
          >
            {formData.HasNoMiddleName && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text className='text-sm text-gray-400 mb-2'>I do not have a middle name</Text>
        </View>

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(value) => handleInputChange("last_name", value)}
          />
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.shadow} className='rounded-md mb-2'>
          <Text className='border border-gray-300 rounded-md p-4 bg-white'>
          {formData.birthdate
              ? formData.birthdate.toDateString()
              : "Select Birthdate"}
          </Text>
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Must be 12 or older to create an eZiCash Account</Text>
        {showDatePicker && (
          <DateTimePicker
            value={formData.birthdate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={nationality} placeholder={"Nationality"} formKey={"nationality"}/>
        </View>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={fundSource} placeholder={"Main Source of Funds"} formKey={"main_source"}/>
        </View>

        <View>
          <Text className='text-lg font-semibold mb-4'>CURRENT ADDRESS</Text>
        </View>
        
        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={munc} placeholder={"Province"} formKey="province"/>
        </View>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={selectionData.cities} placeholder={"City/Municipality"} formKey={"city"}/>
        </View>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={selectionData.barangays} placeholder={"Barangay"} formKey={"barangay"}/>
        </View>

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(value) => handleInputChange("zipcode", value)}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity className='w-full p-4 bg-primary rounded-lg' onPress={handleNext}>
          <Text className='text-white font-semibold text-lg text-center'>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: "#777",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  checked: {
    backgroundColor: "#6200ea",
    borderColor: "#6200ea",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});
