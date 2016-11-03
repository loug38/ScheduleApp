import React from 'react';
import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({	

	modal: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00000099',
	},

	modalInputContainer: {
		backgroundColor: '#ffffff',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 55,
		marginBottom: 55,
		marginLeft: 25,
		marginRight: 25,
		paddingTop: 20,
		borderRadius: 20,
	},

	modalTitle: {
		fontSize: 20,
		marginBottom: 10,
		alignSelf: 'center',
	},

	modalInputRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginTop: 10,
		marginBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
	},

	iconContainer: {
		height: 35,
		width: 35,
		borderRadius: 25,
		backgroundColor: '#B71C1C',
		marginTop: 10,
		paddingLeft: 3,
		paddingTop: 3,
	},

	modalInputWrapper: {
		flex: 1,
		marginLeft: 10,
	},

	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		marginTop: 30,
		marginBottom: -8,
	},

	modalButtonCancel: {
		flex: 1,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		backgroundColor: '#B71C1C',
	},

	modalButtonAdd: {
		flex: 1,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 20,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		backgroundColor: '#B71C1C'		
	},
});