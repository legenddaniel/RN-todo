import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Button } from 'react-native';
import { exact, shape, number, string, func } from 'prop-types';

function Item({ id, data, onChange }) {
    const { subject, text, status } = data || {};

    const handleSubjectChange = value => {
        onChange({
            id: id,
            subject: value
        });
    };
    const handleTextChange = value => {
        onChange({
            id: id,
            text: value
        });
    };

    const handleAddPress = () => {
        onChange({
            id: id,
            status: 'done'
        });
    };

    const handleCancelPress = () => {
        onChange({
            id: id,
            status: 'cancelled'
        });
    };

    let content;
    switch (status) {
        case 'edit':
            content = (
                <>
                    <TextInput
                        placeholder="subject"
                        value={subject || ''}
                        onChangeText={handleSubjectChange}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="text"
                        value={text || ''}
                        onChangeText={handleTextChange}
                        style={styles.input}
                    />
                    <View style={styles.editButtons}>
                        <TouchableWithoutFeedback onPress={handleAddPress}>
                            <Text>Add</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handleCancelPress}>
                            <Text>Cancel</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </>
            );
            break;
        case 'done':
            content = (
                <>
                    <Text>{subject || 'You did not input anything'}</Text>
                    <Text>{text || 'You did not input anything'}</Text>
                    <TouchableWithoutFeedback onPress={handleCancelPress}>
                        <Text>Delete</Text>
                    </TouchableWithoutFeedback>
                </>
            );
            break;
        default:
            content = null;
            break;
    }

    return content && (
        <View>
            {content}
        </View>
    )
}

Item.propTypes = {
    id: number.isRequired,
    data: shape({
        subject: string,
        text: string,
        status: string.isRequired,
    }),
    onChange: func.isRequired
};

const styles = StyleSheet.create({
    editButtons: {
        flexDirection: 'row',

    },
    input: {
        padding: '0.5rem',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        textAlign: 'center',
    }
});


export default Item;