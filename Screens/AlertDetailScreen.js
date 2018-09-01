import React from 'react';
import { ActivityIndicator, Button, Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';


const { width, height } = Dimensions.get('window');
export default class AlertDetailScreen extends React.Component {
	static navigationOptions = {
		title: 'Result',
	};

	constructor(props) {
		super(props);
		this.state = {
			loadingText: 'Processing...',
			isLoading: false, 
			photoUri: 'https://plantdoctor.co.nz/assets/uploads/2017/05/myrtle-rust-1.jpg',
			reportNotes: '',
			description: '',
			distribution: '',
			symptoms: '',
		}

		//todo: add resources
		// resources: [
		// 	{
		// 		name: '',
		// 		url: ''
		// 	},
		// 	{
		// 		name: '',
		// 		url: ''
		// 	}
		// ]
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		this.getAlertInfo(navigation.getParam('alertId', -1));
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
		const {photoUri} = this.state;
		
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
							source= {{ uri: photoUri }}
						/>
					</View>

					<View>
						<Text style={styles.Title}>
							Report sightings
						</Text>
						<Text style={styles.Content}>
							{this.state.reportNotes}
						</Text>

						<Button
							title="Report sightings"
							onPress={() => this.navigate('Snap', {})}
						/>
					</View>
					
					<View>
						<Text style={styles.Title}>
							Description
						</Text>
						<Text style={styles.Content}>
							{this.state.description}
						</Text>
					</View>

					<View>
						<Text style={styles.Title}>
							Symptoms
						</Text>
						<Text style={styles.Content}>
							{this.state.symptoms}
						</Text>
					</View>

					<View>
						<Text style={styles.Title}>
							Impact
						</Text>
						<Text style={styles.Content}>
							{this.state.impact}
						</Text>
					</View>

					<View>
						<Text style={styles.Title}>
						Distribution
						</Text>
						<Text style={styles.Content}>
							{this.state.distribution}
						</Text>
					</View>
					
					{/* todo: add resources */}
					{/* <View>
						<Text style={styles.Title}>
						Resources
						</Text>
						<Text style={styles.Content}>
							{this.state.resources.map((item) => {

							})}
						</Text>
					</View> */}

				</View>
				
				{ this.loadingComponent() }
			</View>
		)
	}


	async getAlertInfo(alertId) {
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