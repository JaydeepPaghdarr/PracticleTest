import React, { Component } from "react";
import {
    ScrollView,
    Dimensions,
    StatusBar,
    Navigator,
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    Alert,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    ActivityIndicator,
    Platform,
    FlatList,
    Switch,
    AsyncStorage,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard
} from "react-native";

import { NavigationActions, StackActions } from "react-navigation";

//Utilities
import { Storage, isIphoneX } from "../global/Utilities";

var { width, height } = Dimensions.get("window");

import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';

const testItemData = [
    { name: 'Test 1', image: "", description: "testing with new item", price: "50" },
    { name: 'Test 2', image: "", description: "testing with old item", price: "2000" },
];


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModelOpen: false,
            name: "",
            description: "",
            price: "",
            imageSource: "",
            itemData: [],
            newarray: []
        }
    }

    componentWillMount() {
        this.setState({ itemData: testItemData })
    }

    setName(text) {
        this.setState({ name: text });
    }

    setDescription(text) {
        this.setState({ description: text });
    }

    setPrice(text) {
        this.setState({ price: text });
    }

    validateData() {
        if (this.state.name == "" || this.state.name.trim() == "") {
            Alert.alert("PracticleTest", "Please enter name");
            return false;
        }

        if (this.state.description == "" || this.state.description.trim() == "") {
            Alert.alert("PracticleTest", "Please enter description");
            return false;
        }

        if (this.state.price == "" || this.state.price.trim() == "") {
            Alert.alert("PracticleTest", "Please enter price");
            return false;
        }

        return true;
    }

    _deleteItemByName = name => {
        const filteredData = this.state.itemData.filter(item => item.name !== name);
        this.setState({ itemData: filteredData });
    }

     _onPressSubmit = () => {
        if (this.validateData()) {
            this.setState({ isModelOpen: false, itemData: [...this.state.itemData, ...[{ name: this.state.name, image: this.state.imageSource, description: this.state.description, price: this.state.price }] ] })
        }
    }

    _onPressChangeImage = () => {
        ActionSheet.showActionSheetWithOptions({
            options: ['Capture from camera', 'Choose from Gallery', 'Cancel'],
            cancelButtonIndex: 2,
            destructiveButtonIndex: 2,
            tintColor: 'blue'
        },
            (buttonIndex) => {

                switch (buttonIndex) {
                    case 0:

                        ImagePicker.openCamera({
                            width: 300,
                            height: 300,
                            cropping: true,
                            mediaType: "photo"
                        }).then(image => {
                            this.setState({ imageSource: image.path })
                        });

                        break;
                    case 1:

                        ImagePicker.openPicker({
                            width: 500,
                            height: 500,
                            mediaType: "photo"
                        }).then(image => {
                            this.setState({ imageSource: image.path })
                        });
                        break;

                    default:

                        break;
                }
            });
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("DetailScreen", { value: item, index: index })} style={styles.renderItemStyle}>
                <View style={{ marginLeft: 10, flexDirection: "column", width: "82%" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textView}>Name: </Text>
                        <Text style={styles.textValue}>{item.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textView}>Description: </Text>
                        <Text style={styles.textValue}>{item.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Text style={styles.textView}>Price: </Text>
                        <Text style={styles.textValue}>₹{item.price}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this._deleteItemByName(item.name)} style={{ marginLeft: 10 }}>
                    <Image source={require("../assets/remove.png")} ></Image>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };


    DismissKeyboard() {
        Keyboard.dismiss();
    }

    render() {
        
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.DismissKeyboard();
            }}>

                <SafeAreaView style={styles.container}>
                    <View style={styles.statusbar} />

                    <TouchableOpacity onPress={() => this.setState({ isModelOpen: true, name: "", description: "", price: "", imageSource: "" })} style={styles.addButtonView}>
                        <Text style={{ fontSize: 15, color: "blue" }}>ADD</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={this.state.itemData}
                        renderItem={this.renderItem}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                    />


                    <Modal swipeToClose={false} backdropOpacity={0.8} isOpen={this.state.isModelOpen} position={"center"} onClosed={() => this.setState({ isModelOpen: false })}
                        style={[styles.ModalInsideView]} backdropPressToClose={false} >

                        <TouchableOpacity style={{ marginTop: 5, marginLeft: width / 1.3, height: 30, width: 30 }} onPress={() => this.setState({ isModelOpen: false })}>
                            <Image style={{ height: "100%", width: "100%" }} source={require("./../assets/close.png")}></Image>
                        </TouchableOpacity>

                        <View style={{ marginTop: 10 }}>
                            <View style={styles.textBoxView}>
                                <TextInput
                                    placeholderTextColor="#777777"
                                    placeholder="Name"
                                    style={styles.textBoxTextInput}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.name}
                                    onChangeText={text => this.setName(text)}
                                />
                            </View>

                            <View style={[styles.textBoxView, { height: 60, alignItems: "flex-start" }]}>
                                <TextInput
                                    placeholderTextColor="#777777"
                                    placeholder="Description"
                                    style={styles.textBoxTextInput}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.description}
                                    onChangeText={text => this.setDescription(text)}
                                    multiline={true}
                                    numberOfLines={20}
                                />
                            </View>

                            <View style={styles.textBoxView}>
                                <TextInput
                                    placeholderTextColor="#777777"
                                    placeholder="Price"
                                    style={styles.textBoxTextInput}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.price}
                                    onChangeText={text => this.setPrice(text)}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 35, flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => this._onPressChangeImage()} style={{ borderColor: "gray", backgroundColor: "#DDD", shadowOpacity: 0.5 }}><Text style={{ margin: 5, color: "black", fontSize: 15 }}>Choose file</Text></TouchableOpacity>
                        </View>

                        {this.state.imageSource != "" ? <View style={{ marginTop: 10, flexDirection: "row" }}>
                            <Image style={{ height: 40, width: 40 }} source={{ uri: this.state.imageSource }}></Image>
                        </View> : <View></View>}

                        <TouchableOpacity onPress={() => this._onPressSubmit()} style={{ marginTop: 20, width: "50%", height: 40, borderColor: "blue", borderRadius: 10, borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "blue", fontWeight: "700" }}>Submit</Text>
                        </TouchableOpacity>

                    </Modal>

                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }

}

const styles = StyleSheet.create({
    //----Navigation and Container----
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F8F9FA",
    },
    statusbar: {
        width: width,
        height: Platform.OS == "ios" ? (isIphoneX() ? 0 : 0) : StatusBar.currentHeight,
        backgroundColor: "#F8F9FA",
        position: "absolute",
        top: 0,
        left: 0
    },

    //Add button view
    addButtonView: { 
        marginTop: 10, 
        marginLeft: width / 1.3, 
        height: 30, 
        width: 65, 
        borderColor: "blue", 
        borderRadius: 5, 
        borderWidth: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    
    //Model view
    ModalInsideView: {
        alignItems: 'center',
        width: '90%',
        height: Platform.OS == "ios" ? (isIphoneX() ? "60%" : "70%") : "70%",
        borderRadius: 12,
        backgroundColor: "white"
    },

    //Render style
    renderItemStyle: { 
        marginTop: 20, 
        marginLeft: 20, 
        width: "90%", 
        flexDirection: "row", 
        marginTop: 10, 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: "gray", 
        alignItems: "center" 
    },
    textView: {
        fontSize: 15, 
        marginTop: 3, 
        fontWeight: "600"
    },
    textValue: {
        fontSize: 15, 
        marginTop: 3 
     },

    //TextBox
    textBoxView: {
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "gray",
        borderWidth: 1
    },
    textBoxTextInput: {
        fontSize: 18,
        marginLeft: 15,
        marginRight: 10,
        width: width - 120,
    },
    
});

export default HomeScreen;