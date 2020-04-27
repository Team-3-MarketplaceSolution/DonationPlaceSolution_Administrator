import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from "../screens/EditProfileScreen";
import SearchListPage from '../screens/SearchListPage';
import MyDonationScreen from "../screens/MyDonationScreen";
import ListScreen from "../screens/ListScreen";
import Colors from "../constants/Colors";

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home` : 'md-home'
            }
        />
    ),
    tabBarOptions: { activeTintColor: Colors.activeTintColor, }
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
    {
        Links: LinksScreen,

    },
    config
);

LinksStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}/>
    ),
    tabBarOptions: { activeTintColor: Colors.activeTintColor, }
};

LinksStack.path = '';

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        EditProfile: EditProfileScreen,
    },

    config
);


ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}/>
    ),
    tabBarOptions: { activeTintColor: Colors.activeTintColor, }
};

ProfileStack.path = '';


const ItemStack = createStackNavigator(
    {
        Search: SearchListPage,
        List: ListScreen,
    },
    config
);


ItemStack.navigationOptions = {
    tabBarLabel: 'Items',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}/>
    ),
    tabBarOptions: { activeTintColor: Colors.activeTintColor, }
};

ItemStack.path = '';


const tabNavigator = createBottomTabNavigator({
    HomeStack,
    ItemStack,
    ProfileStack,

});

tabNavigator.path = '';

export default tabNavigator;
