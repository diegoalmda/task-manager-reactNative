import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import ListaItem from './src/components/ListaItem';
import AddItemArea from './src/components/AddItemArea';
import ListaItemSwipe from './src/components/ListaItemSwipe';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';

const Page = styled.SafeAreaView`
  flex: 1;
`;

const Header = styled.View`
  background-color: #3137BF;
  margin: 0;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-top: 10px;
`;

const HeaderText = styled.Text`
  font-size: 35px;
  color: #FFF;
  flex: 1;
  padding-left: 10px;
`;

const Img = styled.Image`
`;

const Listagem = styled.FlatList`
  flex: 1;  
`;

export default () => {
  const [items, setItems] = useState([]);

  const getList = async () => {
    const existingTasks = await AsyncStorage.getItem('array');
    let newTask = JSON.parse(existingTasks);
    if( !newTask ){
      setItems([]);
    }
    setItems(newTask);
  }

  const addNewItem = async (txt) => {
    let newItems = [...items];
    const task = {id: uuid(), task: txt, done: false};
    newItems.push(task);
    await AsyncStorage.setItem('array', `${JSON.stringify(newItems)}`);
    setItems(newItems);

  }

  const toggleDone = async (index) => {
    let newItems = [...items];
    newItems[index].done = !newItems[index].done;
    await AsyncStorage.setItem('array', `${JSON.stringify(newItems)}`);
    setItems(newItems);
  }

  const deleteItem = async (index) => {
    let newItems = [...items];
    newItems = newItems.filter((it, i)=>i!=index);
    await AsyncStorage.setItem('array', `${JSON.stringify(newItems)}`);
    setItems(newItems);
  }

  useEffect(()=> {
   getList();
  },[]);

  return (
    <Page>
      <Header>
        <Img source={require('./src/images/icone.png')} />
        <HeaderText>Lista de Tarefas</HeaderText>
      </Header>
      <AddItemArea onAdd={addNewItem} />
      <SwipeListView 
        data={items}
        renderItem={({item, index})=><ListaItem onPress={()=>toggleDone(index)} data={item} />}
        renderHiddenItem={({item, index})=><ListaItemSwipe onDelete={()=>deleteItem(index)} />}
        leftOpenValue={50}
        disableLeftSwipe={true}

        keyExtractor={(item)=>item.id}
      />
    </Page>
  )
};
