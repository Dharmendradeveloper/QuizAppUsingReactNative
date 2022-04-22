import React,{useState,useEffect} from "react";
import {StatusBar,View,StyleSheet,Text,Image,ActivityIndicator} from 'react-native';

export default function SplashScreen({navigation}){
    const[animating,setAnimating] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace(animating?'Home':'Auth')
        },2000);
        
    })

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387'/>
            <Image
            style={styles.image}
            source={require('./../../images/avisys.jpg')}
            />
            <Text style={styles.text}>Welcome in Avisys</Text>
            {/* <ActivityIndicator
            animating={animating}
            color='#fff'
            size='large'
            style={styles.activityIndicator}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#009387',
    justifyContent:'center',
    alignItems:'center'
},
image:{
    height:150,
    width:150,
    borderRadius:4,
},
text:{
    fontSize:30,
    fontWeight:'bold',
},
activityIndicator:{
   alignItems:'center',
   height:80, 
}
});