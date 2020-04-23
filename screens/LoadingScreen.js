import React from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {
    state = {isAdmin: null}

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {

            if (user != null) {
                firebase.database().ref('Admins/' + user.uid).once("value")
                    .then( (snapshot) =>{
                        this.setState({isAdmin: snapshot.exists()});
                    });
            } else {
                this.setState({isAdmin: null})
            }

            console.log('isAdmin', this.state.isAdmin);
            let emailVerified;
            emailVerified=user?user.emailVerified: null;
            this.props.navigation.navigate((emailVerified && this.state.isAdmin && user) ? "Main" : "Auth")
            user ? console.log('Email Verified', user.emailVerified) : null;
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
