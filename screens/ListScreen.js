import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import * as firebase from "firebase";
import {
    Card,
    CardItem,
    Badge,
    Right,
    Body,
    Left

} from "native-base";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import SubmitButton from "../components/SubmitButton";

// const icons = {
//     shirts:'tshirt',
//
// }


export default class ListScreen extends React.Component {
    state = {
        uid: "",
        listID: "",
        shirts: 0,
        inHonorOf: "",
        jackets: 0,
        pants: 0,
        status: "Created",
        sweaters: 0,
        values: {},
    }


    onVerifyButtonClicked = () => {
        const Values = {
            shirts: this.state.shirts,
            jackets: this.state.jackets,
            pants: this.state.pants,
            sweaters: this.state.sweaters,
            status: 'Verified'
        };

        firebase.database().ref('Lists/' + this.state.uid +'/' +this.state.listID).update(Values).then((data) => {
            //success callback
            alert("List Verified");
            console.log('data ', data);
        }).catch(error => console.log(error));

    };


    componentDidMount() {
        const myListID = this.props.navigation.getParam('listId');
        const myUID = this.props.navigation.getParam('uid');
        console.log('listID', this.state.listID);
        console.log('uid', this.state.uid);
        this.setState({uid: myUID, listID: myListID});

        firebase.database().ref('Lists/' + myUID + '/' + myListID).on('value', (data) => {
            this.setState(data.val());
        })

        firebase.database().ref('Values').on('value', (data) => {
            this.setState({values: data.val()});
        })
        console.log(this.state);
    }


    render() {
        let honor;
        if (this.state.inHonorOf) {
            honor = <Card><Text style={style.cardText}>Donation In Honor Of: {this.state.inHonorOf}</Text></Card>;
        }

        let verifyButton;
        if (this.state.status != "Verified") {
            verifyButton = <View style={{alignItems: 'center'}}><SubmitButton
                click={this.onVerifyButtonClicked}>Verify</SubmitButton></View>
        }

        let sum = 0;
        return (
            <ScrollView>

                <Card style={{marginBottom: 15,}}>
                    <CardItem header style={{backgroundColor: '#b4db9c',}}>
                        <Icon style={{margin: 'auto', fontSize: 28}} name="clipboard-list"/>
                        <Text style={style.titleText}>List: {this.state.listID}</Text></CardItem>
                </Card>

                {Object.entries(this.state).map((item) => {
                    if ((item[0] === 'jackets' || item[0] === 'pants' || item[0] === 'sweaters' || item[0] === 'shirts') && item[1]) {
                        let price = this.state.values[item[0]];
                        sum += item[1] * price;
                        console.log(sum);

                        return (<Card key={item[0]}>
                            <CardItem>
                                <Left><View style={{
                                    backgroundColor: '#e9f5ec',
                                    width: 60,
                                    height: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon style={{margin: 'auto', fontSize: 28}} name="tshirt"/>
                                </View>
                                </Left>
                                <Body style={{marginStart: -30}}><Text style={style.cardTitleText}>{item[0]}</Text>
                                    <Text style={style.cardSubTitleText}>${price}</Text>
                                </Body>
                                <Right>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon style={{margin: 'auto', padding: 10}} name="minus" onPress={() => {
                                            if(this.state.status !== 'Verified'){this.setState({[`${item[0]}`]: +this.state[item[0]] - 1})}

                                        }}/>

                                        <Badge style={{backgroundColor: Colors.buttonColor}}>
                                            <Text>   {item[1]}   </Text>
                                        </Badge>
                                        <Icon style={{margin: 'auto', padding: 10}} name="plus" onPress={() => {
                                            if(this.state.status !== 'Verified'){this.setState({[`${item[0]}`]: +this.state[item[0]] + 1})}
                                        }}/>
                                    </View>

                                </Right>
                            </CardItem>

                        </Card>);
                    }
                })}
                <Card><Text style={style.boldText}>Total Value: ${sum}</Text></Card>
                <Card><Text style={style.boldText}>Status: {this.state.status}</Text></Card>
                {honor}
                {verifyButton}
            </ScrollView>
        );
    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardText: {
        textAlign: 'center',
        padding: 15
    },
    cardTitleText: {
        fontSize: 20,
        textAlign: 'left',
        padding: 5,
    },
    cardSubTitleText: {
        fontSize: 15,
        textAlign: 'left',
        padding: 5,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        padding: 10
    },
    boldText: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15
    }

});
