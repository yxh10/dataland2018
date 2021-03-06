import React from 'react';
import { ActivityIndicator, Button, Dimensions, Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';


const { width, height } = Dimensions.get('window');
export default class SnapResultScreen extends React.Component {
	static navigationOptions = {
		title: 'Result',
	};

	constructor(props) {
		super(props);
		this.state = {
			loadingText: 'Processing...',
			isLoading: false
		}

		this.photoUri = '';
		this.navigate = {};
		this.photoForm = {};
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		this.photoForm = navigation.getParam('photoForm', {});
		this.recognisePhoto(this.photoForm);
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

	render() {
		const { navigation } = this.props;
		
		this.navigate = navigation.navigate;
		this.photoDetails = navigation.getParam('photoDetails', {});
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
							source= {{ uri: this.photoDetails.uri }}
						/>
					</View>

					<View>
						<Text>
							The disease is: { this.state.diseaseName }
						</Text>
					</View>

					<View style={ styles.ButtonContainer}>
						<Button
							title="Snap"
							onPress={() => this.navigate('Snap', {})}
						/>
					</View>
				</View>
				
				{ this.loadingComponent() }
			</View>
		)
	}

	getGeoCoding(options = {}) {
		return new Promise((resolve, reject) => {
			return navigator.geolocation.getCurrentPosition(resolve, reject, options);
		})
	}

	async recognisePhoto(photoForm) {

		this.setState({
			isLoading: true,
			loadingText: 'Getting geolocation'
		});

		const options = { enableHighAccuracy: true, timeout: 30000, maximumAge: 3000 };
		const position = await this.getGeoCoding(options);
		photoForm.append('lat', position.coords.latitude);
		photoForm.append('lon', position.coords.longitude);

		try {	
			console.log(photoForm)

			this.setState({
				isLoading: true,
				loadingText: 'Sending photo for recognition'
			});

			const response = await fetch('http://192.168.20.55:8000/mpi/upload/', {
				method: 'POST',
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