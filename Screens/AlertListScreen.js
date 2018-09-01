import React from 'react';
import { ActivityIndicator, TouchableOpacity, Button, Dimensions, Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

const { width, height } = Dimensions.get('window');
export default class AlertListScreen extends React.Component {
	static navigationOptions = {
		title: 'Result',
	};

	constructor(props) {
		super(props);
		this.state = {
			loadingText: 'Processing...',
			isLoading: false, 
			photoUri: '',
			alerts: [
				{
					id: 1,
					photoUri: 'https://plantdoctor.co.nz/assets/uploads/2017/05/myrtle-rust-1.jpg',
					diseaseName: 'Myrtle rust',
					severity: 'High',
					zipcode: 8042
				}
			]
		}
	}
	
	componentDidMount() {
		// todo: get real data here
		// this.getAlerts(this.state.zipcode);
	}

	loadingComponent() {
		if(this.state.isLoading) {
			return (
				<View style={ styles.LoadingIndicator }>
					<ActivityIndicator size="large" color="#2979FF" />
					<Text style={{ color: 'black'}}>{this.loadingText}</Text>
				</View>
			)
		} else {
			return null
		}
	}

	gotoDetail(id) {
		console.log('I am in nav');
		const navigate = this.props.navigation.navigate;
		navigate('AlertDetail', {id: id})
	}

	getCard(alert) {
		return (
			<TouchableOpacity key={alert.id} style={styles.Card} onPress={() => this.gotoDetail(alert.id)}>
				<View>
					<Image
						style= {{
							width: width * 0.9,
							height: 260 
						}}
						source= {{ uri: alert.photoUri }}
					/>
				</View>
				<Text style={styles.cardContent}>{alert.diseaseName}</Text>
				<Text style={styles.cardContent}>{alert.severity}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const { navigation } = this.props;
		const {photoUri} = this.state;
		
		this.navigate = navigation.navigate;
		// const screenPhotoRatio = width / this.photoDetails.width;

		return (
			<View style={ styles.MainContainer }>
				<View styles={ styles.ContentCotainer}>
					<View style={{marginTop: 20}}>
						{this.state.alerts.map((alert) => {
							return this.getCard(alert)
						})}
					</View>
					
				</View>
				{ this.loadingComponent() }
			</View>
		)
	}


	async getAlerts(alertId) {
		try {	
			this.setState({
				isLoading: true,
				loadingText: 'Sending photo for recognition'
			});

			const response = await fetch('http://192.168.20.55:8000/mpi/upload/' + alertId, {
				method: 'GET',
				headers: {
					"Accept": "application/json"
				},
				body: photoForm
			});
	
			if(response.ok === true) {
				let result = await response.json();
				console.log(result);

				this.setState({
					isLoading: false,
					diseaseName: result.name
				});

			} else {
				console.error(response.status + ' ' + response.statusText);
				this.setState({
					isLoading: false
				});
			}
		} catch(error) {
			console.log(error)
		}
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: (Platform.OS) === 'ios' ? 20 : 0
	},
	LoadingIndicator: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: 'center',
    justifyContent: 'center',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		opacity: 0.5,
		backgroundColor: 'white',
	},
	ContentCotainer: {
		flex: 1
	},
	ButtonContainer: {
		bottom: 0
	},
	Card: {
		shadowOffset:{  width: 4,  height: 8,  },
		shadowColor: 'black',
		shadowOpacity: 1.0,
		borderRadius: 5,
		borderRadius: 4,
    borderWidth: 1,
		borderColor: '#d6d7da',
		backgroundColor: 'white'
	}
})