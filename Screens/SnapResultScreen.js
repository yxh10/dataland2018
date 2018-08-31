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

	render() {
		const { navigation } = this.props;
		
		this.navigate = navigation.navigate;
		this.photoDetails = navigation.getParam('photoDetails', {});
		const screenPhotoRatio = width / this.photoDetails.width;

		return (
			<View style={ styles.MainContainer }>
				<View style={ styles.LoadingIndicator }>
					{ 
						this.state.isLoading &&
						<ActivityIndicator size="large" color="#00ff00" />
					}
				</View>
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

				<View>
					<Button
						title="Snap"
						onPress={() => this.navigate('Snap', {})}
					/>
				</View>

				<View>
					<Button
						title="Report"
						onPress={() => this.report()}
					/>
				</View>
			</View>
			
		)
	}

	async recognisePhoto(photoForm) {

		this.setState({
			isLoading: true
		});
		try {	
			console.log(photoForm)
			const response = await fetch('http://192.168.20.55:8000/mpi/upload/', {
				method: 'POST',
				headers: {
					// 'Authorization': '',
					"Accept": "application/json"
				},
				body: photoForm
			});
	
			if(response.ok === true) {
				let result = await response.json();
				// console.log(result);

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
	

	async report() {
		if(this.photoForm) {
			this.photoForm.append('parsedValue', this.state.diseaseName);

			//todo: loading, progress bar
			try {
				// await SnapService.reportWrongRecognition(this.photoForm);
			} catch(e) {
				console.debug(e);
			} finally {
				this.navigate('Home', {});
			}
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
		width: width,
		height: height,
		opacity: 0.5,
		backgroundColor: 'white',
	}
})