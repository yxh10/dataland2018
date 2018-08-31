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

import { RNCamera } from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';

export default class SnapScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false
		}
	}

	render() {
		return (
			<RNCamera
				ref={(cam) => {
					this.camera = cam;
				}}
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.off}
				permissionDialogTitle={'Permission to use camera'}
				permissionDialogMessage={'We need your permission to use your camera phone'}
			>
				<View style={styles.container}>
					<TouchableOpacity 
						title=""
						style={styles.capture} 
						onPress={this.takePicture.bind(this)}
					/>
				</View>
			</RNCamera>
		)
	}
	
	takePicture = async function() {
		const { navigate } = this.props.navigation;
		const height = 1024;
		const width = 1024; 

		if (this.camera) {
			let format = 'JPEG';
			let quality = 100;
			let rotation = 90;  
			const options = { quality: 1, base64: true };

			try {
				const data = await this.camera.takePictureAsync(options);
				console.log(data.uri);

				const resizedImageUri = await ImageResizer.createResizedImage(
					data.uri,
					height,
					width,
					format,
					quality,
					rotation
				)

				const filePath = resizedImageUri.path;

				if(filePath) {
					let photoForm = new FormData();

					let fileName = filePath.replace(/^.*[\\\/]/, '')
					var photo = {
						uri: resizedImageUri.uri,
						name: fileName,
						type: 'image/jpeg'
					};

					photoForm.append('photo', photo);
					photoForm.append('name', 'plant_photo');
					photoForm.append('description', 'I have found something bad');
					photoForm.append('lon', '100');
					photoForm.append('lat', '120');

					navigate('SnapResult', { 
						photoForm: photoForm,
						photoDetails: {
							uri: resizedImageUri.uri,
							width: width,
							height: height,
						}
					});
				}
			}
			catch(err) {
				console.error(err);
			}
		} 
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	preview: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		padding: 8,
		margin: 18,
		width: 56,
		height: 56,
		borderRadius: 28,
		alignSelf: 'flex-end'
	},
	progress: {
		margin: 10,
		alignSelf: 'center'
	}
});