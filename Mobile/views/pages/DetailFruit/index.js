import { useNavigation, useRoute } from "@react-navigation/native";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ImageSlider from "./Component/ImageSlider";
import { useEffect, useState } from "react";
import fruitAPI from "../../../api/fruitAPI";
import Header from "../../../components/header/header";
import InfoView from "./Component/InfoView";
import DishView from "./Component/DishView";
import Spinner from 'react-native-loading-spinner-overlay';

import Support from "./Component/Support"
import Icons from "../../../constants/Icons";


export default function DetailFruit() {
    const route = useRoute();
    const { id, data, user, change } = route.params;
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const [props, setProps] = useState([]);

    const fetchDataById = async (id) => {
        try {
            var fruitById = await fruitAPI.getFruitById(id);
            setProps(fruitById.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchDataById(id);
        } else {
            setProps(data);
            setLoading(false);
        }
    }, [id, data]);

    if(loading)
    {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#5AA162" />
                <Header />
                <Spinner
                    visible={loading}
                    textContent={'Đang tải dữ liệu'}
                    textStyle={styles.spinnerText}
                />
            </View>
        )
    }

    var imageArray = [];

    if (props.FruitImages) {
        imageArray = Support.ImageProccess(props.FruitImages);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#5AA162" />
            <Header />
            <View style = {styles.title}>
                <TouchableOpacity
                    onPress={()=>{
                        if(id)
                        {
                            navigation.goBack()
                        }
                        else
                        {
                            navigation.navigate("CameraScreen", {user : user, change : !change})
                        }
                    }}
                >
                    <Image source={Icons.back}
                        style = {styles.iconBack} />
                </TouchableOpacity>
                <View style = {styles.fruit_name}>
                    <Text style = {styles.fruit_name_text}>{props.name}</Text>
                </View>
            </View>
            <ScrollView>
                <ImageSlider images={imageArray} />
                <InfoView data = {props}/>
                <DishView data = {props.Dishes}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor : "#5AA162",
    },
    fruit_name : {
        backgroundColor : "#00FFD1",
        
        fontWeight : "bold",
        marginHorizontal : 50,
        marginVertical : 10,
        borderRadius : 30,
        paddingVertical : 4,
    },
    fruit_name_text :{
        color : "#8B008B",
        fontSize : 25,
        textAlign : "center",
    },
    spinnerText :{
        color : "white"
    },
    title : {},
    iconBack : {
        position :"absolute",
        left : 5,
        top : 15,
        width : 35,
        height : 35
    }
});
