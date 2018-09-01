import React from 'react';
import { ActivityIndicator, Button, Dimensions, Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

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

	getCard(alert) {
		return (
			<Card>
				<CardItem>
					<Left>
						<Thumbnail source={{uri: 'Image URL'}} />
						<Body>
							<Text>NativeBase</Text>
							<Text note>GeekyAnts</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem cardBody>
					<Image source={{uri: alert.photoUri}} style={{height: 200, width: null, flex: 1}}/>
				</CardItem>
				<CardItem>
					<Left>
						<Text>{alert.name}</Text>
						<Button transparent>
							<Icon active name="thumbs-up" />
							<Text>12 Likes</Text>
						</Button>
					</Left>
					<Body>
						<Button transparent>
							<Icon active name="chatbubbles" />
							<Text>4 Comments</Text>
						</Button>
					</Body>
					<Right>
						<Text>11h ago</Text>
					</Right>
				</CardItem>
			</Card>
		)
	}

	render() {
		const { navigation } = this.props;
		const {photoUri} = this.state;
		
		this.navigate = navigation.navigate;
		const screenPhotoRatio = width / this.photoDetails.width;

		return (
			<View style={ styles.MainContainer }>
				<View styles={ styles.ContentCotainer}>
					<View>
						<Image
							style= {{
								width: this.photoDetails.width * screenPhotoRatio,
								height: this.photoDetails.height * screenPhotoRatio
							}}
							source= {{ uri: photoUri }}
						/>
					</View>

				  {this.state.alerts.map((alert) => {
						this.getCard(alert)
					})}
					
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
	}
})