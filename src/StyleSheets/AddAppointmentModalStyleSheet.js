import React from 'react';
import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({	

	modal: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: '#00000099',
	},

	modalInputContainer: {
		backgroundColor: '#ffffff',
		alignItems: 'flex-start',
		margin: 55,
		padding: 20,
		borderRadius: 20,
	},

	modalTitle: {
		fontSize: 20,
	},

	modalInputRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 20,
	},

	modalInput: {
		flex: 1,
		height: 10,
	},

	modalInputWrapper: {
		flex: 1,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#aaaaaa',
		height: 20,
		padding: 3,
	}
});