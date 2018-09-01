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
				<View style= {styles.ButtonTopView}>
					<Button
							title="Report Sighting"
							styles={ styles.buttonStyle }
							onPress={() => 
								{
									navigate('Snap', {})
								}
							}
						/>
				</View>
				<View style= {styles.ButtonBottomView}>
						<Button
							title="View Alerts"
							styles={ styles.buttonStyle }
							onPress={() => 
								{
									navigate('AlertList', {})
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
	ButtonBottomView: {
		margin: 10,
		width: Dimensions.get('window').width * 0.618
	},
	ButtonTopView: {
		margin: 10,
		width: Dimensions.get('window').width * 0.618
	}

})