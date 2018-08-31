import React from 'react';
import { ActivityIndicator, Button, Dimensions, Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
// import SnapService  from 'shared/SnapService';

const { width, height } = Dimensions.get('window');
export default class SnapResultScreen extends React.Component {
	static navigationOptions = {
		title: 'Result',
	};

	constructor(props) {
		super(props);
		this.state = {
			machineReadPlateNumber: 'Processing...',
			isLoading: false
		}

		this.photoUri = '';
		this.navigate = {};
		this.photoForm = {};
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		this.photoForm = navigation.getParam('photoForm', {});
		this.readPlateNumber(this.photoForm);
	}

	render() {
		const { navigation } = this.props;
		
		this.navigate = navigation.navigate;
		this.photoDetails = navigation.getParam('photoDetails', {});
		const screenPhotoRatio = width / this.photoDetails.width;

		return (
			<View style={ styles.MainContainer }>
				<View style={ LoadingIndicator }>
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
						Read Plate Number: { this.state.machineReadPlateNumber }
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
						title="Input"
						onPress={() => this.navigate('Input', {})}
					/>
				</View>

				<View>
					<TextInput
						onChangeText={
							(text) => this.setState({
								humanReadPlateNumber: text
							})
						}
						value={this.state.humanReadPlateNumber}
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

	async readPlateNumber(photoForm) {

		this.setState({
			isLoading: true
		});
		
		const response = await fetch('http://expprojs.azurewebsites.net/api/PlateRecognition/parsebytext', {
			method: 'POST',
			headers: {
				'Authorization': '9ee56eef-1980-4e34-9aa6-84c235d0e198',
				"Accept": "application/json"
			},
			body: photoForm
		});
		
		if(response.ok === true) {
			let result = await response.json();
			console.log(result);

			this.setState({
				isLoading: false,
				machineReadPlateNumber: result
			});

		} else {
			console.error(response.status + ' ' + response.statusText);
			this.setState({
				isLoading: false
			});
		}
	}
	

	async report() {
		if(this.photoForm) {
			this.photoForm.append('parsedValue', this.state.machineReadPlateNumber);
			this.photoForm.append('plateValue', this.state.humanReadPlateNumber);

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