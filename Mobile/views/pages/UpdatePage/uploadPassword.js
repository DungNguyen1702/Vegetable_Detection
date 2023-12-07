import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icons from "../../../constants/Icons";
import Images from "../../../constants/Image";
import { useEffect, useState } from "react";
import userAPI from "../../../api/userAPI";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function UpdatePassword() {
    const navigation = useNavigation();

    const route = useRoute();

    var { user } = route.params

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkNewPassword2, setCheckNewPassword2] = useState(false);
    const [checkNewPassword1, setCheckNewPassword1] = useState(false);
    const [checkOldPassword, setCheckOldPassword] = useState(false);

    useEffect(() => {
        if(newPassword1!="")
            setCheckNewPassword1(false)
        if (newPassword2 != "" && newPassword1 != newPassword2)
            setCheckNewPassword2(true);
        else setCheckNewPassword2(false);
    }, [newPassword1, newPassword2]);

    useEffect(() => {
        if (loading) {
            if(oldPassword === '')
            {
                setCheckOldPassword(true);
                setLoading(false);
                return;
            }

            if(newPassword1 === '')
            {
                setCheckNewPassword1(true);
                setLoading(false);
                return;
            }

            let response;  // Declare response outside the try block
            
            const fetchData = async () => {
                try {
                    const updatePassword = {
                        id: user.id,
                        old_password: oldPassword,
                        new_password_1: newPassword1,
                        new_password_2: newPassword2,
                    };
    
                    response = await userAPI.updatePassword(updatePassword);
    
                } catch (e) {
                    console.log(e);
                    if (e.response && e.response.status === 401) {
                        setCheckOldPassword(true);
                    }
                } finally {
                    setLoading(false);
    
                    if (response.data.result) {
                        user = response.data.result
                        setCheckOldPassword(false)
                    }
                    
                    if(!checkNewPassword1 && !checkNewPassword2 && !checkOldPassword)
                    {
                        navigation.navigate("HomePage", {
                            user: user,
                        });
                    }
                }
            };
    
            fetchData();
        }
    }, [loading]);
    

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#002233" barStyle="white"></StatusBar>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconBack}
                        onPress={() => {
                            navigation.navigate("HomePage", {
                                user: user,
                            });
                        }}
                    >
                        <Image
                            source={Icons.backSecurity}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.nameInBar}>{user.name}</Text>
                </View>
                <Image
                    style={styles.background}
                    source={Images.backgroundPassword}
                    resizeMode="cover"
                />
                <View style={styles.holderIcon}>
                    <Image
                        style={styles.icon}
                        source={Icons.security}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
            </View>
            <ScrollView style={styles.infoContainer}>
                {/* Old password */}
                <View style={styles.holder}>
                    <Text style={styles.label}>Mật khẩu cũ</Text>
                    <View style={styles.inputHolder}>
                        <TextInput
                            editable={!loading}
                            style={styles.inputText}
                            onChange={(event) =>
                                setOldPassword(event.nativeEvent.text)
                            }
                        />
                        {checkOldPassword && (
                            <Text style={styles.error}>Sai mật khẩu</Text>
                        )}
                    </View>
                </View>

                {/* New password 1 */}
                <View style={styles.holder}>
                    <Text style={styles.label}>Mật khẩu mới</Text>
                    <View style={styles.inputHolder}>
                        <TextInput
                            editable={!loading}
                            style={styles.inputText}
                            onChange={(event) =>
                                setNewPassword1(event.nativeEvent.text)
                            }
                        />
                        {checkNewPassword1 && (
                            <Text style={styles.error}>Vui lòng nhập mật khẩu mới</Text>
                        )}
                    </View>
                </View>

                {/* New password 2 */}
                <View style={styles.holder}>
                    <Text style={styles.label}>Nhập lại</Text>
                    <View style={styles.inputHolder}>
                        <TextInput
                            editable={!loading}
                            style={styles.inputText}
                            onChange={(event) =>
                                setNewPassword2(event.nativeEvent.text)
                            }
                        />
                        {checkNewPassword2 && (
                            <Text style={styles.error}>
                                Khác với mật khẩu mới
                            </Text>
                        )}
                    </View>
                </View>

                {/* Button */}
                <View style={styles.buttonHolder}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setLoading(true)}
                        disabled={loading}
                    >
                        <Text
                            style={{
                                color: "#F3F3F3",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Thay Đổi
                        </Text>
                    </TouchableOpacity>
                </View>
                {loading && (
                    <View style={styles.loadingModal}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Đang cập nhập...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderRadius: 30,
    },
    header: {
        zIndex: 1000,
        width: "100%",
        position: "absolute",
        top: 60,
        alignItems: "center",
    },
    iconBack: {
        height: 40,
        width: 40,
        zIndex: 1000,
        position: "absolute",
        left: 20,
    },
    nameInBar: {
        position: "absolute",
        fontSize: 20,
        zIndex: 1000,
        fontWeight: "bold",
        color: "#F3F3F3",
    },
    background: {
        width: "100%",
        height: 300,
        position: "absolute",
        top: 0,
    },
    holderIcon: {
        backgroundColor: "#29ADB2",
        marginTop: 100,
        marginBottom: 20,
        padding: 20,
        borderRadius: 50,
    },
    icon: {
        height: 150,
        width: 150,
    },
    headerTitle: {
        color: "#0766AD",
        fontSize: 30,
        fontWeight: "bold",
    },

    infoContainer: {
        marginVertical: 20,
        flexDirection: "column",
    },
    holder: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    label: {
        width: "25%",
        fontSize: 14,
        paddingLeft: 10,
    },

    inputHolder: {
        width: "65%",
    },
    inputText: {
        fontSize: 14,
        paddingVertical: 3,
        paddingLeft: 8,
        borderWidth: 1,
        borderRadius: 10,
    },
    input: {
        fontSize: 14,
        width: "65%",
        paddingVertical: 3,
        paddingLeft: 8,
        borderWidth: 1,
        borderRadius: 10,
    },

    buttonHolder: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginTop: 30,
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#0766AD",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#fff",
        marginTop: 10,
    },
    error: {
        color: "red",
        fontSize: 13,
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: -15,
    },
});
