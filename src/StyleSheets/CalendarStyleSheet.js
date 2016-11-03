import React from 'react';
import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},

	listView: {
		flex: 1,
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	li: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 5,
		paddingTop: 20,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	delete: {
		paddingRight: 10,
		paddingTop: 10,
	},

	loadingText: {
		color: '#B71C1C',
		alignSelf: 'center', 
		marginTop: 100,
	},

	addButton: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		height: 50,
		borderRadius: 0,
		backgroundColor: '#B71C1C',
	},
});