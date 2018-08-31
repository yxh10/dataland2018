import React, { Component } from 'react';
import { Button, Dimensions, Text, Platform, StyleSheet, View } from 'react-native';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {navigate} =this.props.navigation;
		return (
			<View styles={styles.MainContainer}>
				<View styles={styles.ButtonList}>
					<Button
							title="Snap"
							styles={ styles.buttonStyle }
							onPress={() => 
								{
									navigate('Snap', {})
								}
							}
						/>
				</View>

	 		</View>
		)
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	ButtonList: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})