import React from 'react';
import styled from 'styled-components/native';


const Item = styled.TouchableHighlight`
  padding: 0 20px;
  background-color: #B0B4F9;
  flex-direction: row;
  height:50px;
  align-items: center;
`;

const ItemText = styled.Text`
  font-size: 15px;
  color: #000662;
  flex:1;
`;

const ItemCheck = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 5px solid #000662;
  background-color: ${props=>props.done?'#000662':'transparent'};
`;

export default (props) => {
    return (
        <Item onPress={props.onPress} underlayColor="#D0D2FB" activeOpacity={1} >
            <>
                <ItemText>{props.data.task}</ItemText>
                <ItemCheck done={props.data.done} ></ItemCheck>
            </>
        </Item>
    );
}