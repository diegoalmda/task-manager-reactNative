import React from 'react';
import styled from 'styled-components/native';

const ListaItemSwipe = styled.TouchableHighlight`
    width: 100%;
    height: 50px;
    background-color: #000662;
    justify-content: center;
    align-items: flex-start;
`;

const ListaItemIcon = styled.Text`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    margin-left: 15px;
`;

export default (props) => {
    return (
        <ListaItemSwipe onPress={props.onDelete} underlayColor="#FF3333">
            <ListaItemIcon>x</ListaItemIcon>
        </ListaItemSwipe>
    );
}