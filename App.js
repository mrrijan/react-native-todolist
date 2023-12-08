import React , {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , SafeAreaView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/task';

export default function App() {
  const [task , setTask] = useState();
  const [taskItems , setTaskItems ] = useState([]);

  const handleAddTask = ()=>{
    // makes the keyboard go back down after adding an task
      Keyboard.dismiss();
      setTaskItems([...taskItems,task]);
      setTask(null);
  }
  const completeTask = (index)=> {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
        {/* Todays task */}
        <View style={styles.tasksWrapper}>
              <Text style={styles.sectionTitle}>Today's Tasks</Text>
              <View style={styles.items}>
                    {/* This is where the tasks will go ! */}
                    {
                      taskItems.map((item,index)=>{
                        return (
                          <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                            <Task text={item}/>
                          </TouchableOpacity>
                        )
                      })
                    }
              </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS ==='ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
              <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)}/>
              <TouchableOpacity onPress={()=>handleAddTask()}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>+</Text>
                </View>
              </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper : {
    paddingTop : 80,
    paddingHorizontal : 20,
  },
  sectionTitle : {
    fontSize : 24,
    fontWeight : "bold",
  },
  items : {
    marginTop : 20,
  },
  writeTaskWrapper : {
     position : 'absolute',
     bottom : 60,
     flexDirection : 'row',
     justifyContent : "space-around",
     alignItems : 'center',
     width : '100%',
  },
  input : {
      paddingHorizontal : 15,
      width : 250,
      backgroundColor : '#FFF',
      paddingVertical : 15,
      borderRadius : 60,
      borderColor : '#C0C0C0',
      borderWidth : 1,
  },
  addWrapper : {
      width : 60,
      height : 60,
      backgroundColor : '#fff',
      justifyContent : 'center',
      alignItems : 'center',
      borderRadius : '50%',
      borderColor : '#C0C0C0',
      borderWidth : 1,
  },
  addText : {

  }
});
