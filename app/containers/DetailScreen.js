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
    SafeAreaView
} from "react-native";

import { NavigationActions, StackActions } from "react-navigation";

//Utilities
import { Storage, isIphoneX } from "../global/Utilities";

var { width, height } = Dimensions.get("window");


class DetailScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           
        }
    }

    

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.statusbar} />

            <View style={styles.container}>
                <View style={{height: 30, width: "90%", flexDirection: "row", marginLeft: 20, marginTop: 10}}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{ height: 20, width: 20}}>
                    <Image source={require("../assets/back.png")}></Image>
                </TouchableOpacity>
                <Text style={{marginLeft: width/3.2, fontSize: 25, fontWeight: "700"}}>Detail</Text>
                </View>
                <Image style={{height: 200, width: 200, justifyContent: "center", marginLeft: width/4, marginTop: 20}} 
                source={this.props.navigation.state.params.value.image != "" ? {uri: this.props.navigation.state.params.value.image} : require("../assets/picture.png")}></Image>
                <View style={styles.detailView}>
                    <Text style={styles.textView}>Name: </Text>
                    <Text style={styles.textValue}>{this.props.navigation.state.params.value.name}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.textView}>Description: </Text>
                    <Text style={styles.textValue}>{this.props.navigation.state.params.value.description}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.textView}>Price: </Text>
                    <Text style={styles.textValue}>₹{this.props.navigation.state.params.value.price}</Text>
                </View>
            </View>
            </SafeAreaView>
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

    //View of detail
    detailView: {
        marginTop: 20, 
        flexDirection: "row", 
        width: "80%", 
        marginLeft: 20
    },

    textView: {
        fontSize: 15, 
        marginTop: 3, 
        fontWeight: "600"
    },
    textValue: {
        fontSize: 15, 
        marginTop: 3 
     }
});

export default DetailScreen;