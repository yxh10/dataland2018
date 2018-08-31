import React, { Component } from 'react';
import {
	Button,
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

export default class SnapScreen extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View>
				<Text>I am snap screen.</Text>
			</View>
		)
	}
}