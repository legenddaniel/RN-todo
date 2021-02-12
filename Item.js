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

    const handlePress = () => {
        onChange({
            id: id,
            status: 'done'
        });
    }

    let content;
    switch (status) {
        case 'edit':
            content = (
                <>
                    <TextInput
                        placeholder="subject"
                        value={subject}
                        onChangeText={handleSubjectChange}
                    />
                    <TextInput
                        placeholder="text"
                        value={text}
                        onChangeText={handleTextChange}
                    />
                </>
            );
            break;
        case 'done':
            content = (
                <>
                    <Text>{subject || 'You did not input anything'}</Text>
                    <Text>{text || 'You did not input anything'}</Text>
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
            <Button title="Add" onPress={handlePress} />
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
}

export default Item;