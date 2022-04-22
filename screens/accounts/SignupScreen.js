import React,{useState} from "react";
import {StyleSheet,StatusBar,Text,View,TextInput,ActivityIndicator,TouchableOpacity, ToastAndroid} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth'


export default function SignupScreen({navigation}){
    const [animating,setAnimating] = useState(false);
    const[email,setEmail] = useState('');
    const[passwordVisibility,setPasswordVisibility] = useState(true);
    const[password,setPassword] = useState('');
    const[rightIcon,setRightIcon] = useState('eye-slash');
    const showORHidePassword = ()=>{
        if(passwordVisibility){
            setRightIcon('eye')
            setPasswordVisibility(false);
        }else{
            setRightIcon('eye-slash');
            setPasswordVisibility(true);
        }
    }
    const login = ()=>{
        navigation.navigate('login')
    }
    const register = ()=>{
        setAnimating(true);
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(passwordRegex.test(password)){
            if(emailRegex.test(email)){
                registerUser(email,password);
            }else{
                console.log('Please enter valid email id');
            }

        }else{
            if(emailRegex.test(email)){
                if(passwordRegex.test(password)){
                    registerUser(email,password)
                }
            }else{
                console.log('Please provide valid password.')
            }
        }
        // ToastAndroid.show('Register your account Here',ToastAndroid.SHORT);
    }

    const registerUser = (emailId,PswdId)=>{
        auth().createUserWithEmailAndPassword(emailId,PswdId)
        .then(()=>{
            ToastAndroid.show('Registration successfully',ToastAndroid.SHORT);
            setAnimating(false);
            navigation.replace('login');
        })
        .catch(error=>{
            setAnimating(false);
            if(error.code==='auth/email-already-in-use'){
                console.log('Already user exist');
            }
            if(error.code==='auth/invalid-email'){
                console.log('Invalid user');
            }
            console.log(error);
        });
    }
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
         <View style={styles.view_header}>
         <Text style={styles.text_header}>Register Here</Text>
         </View>
         <Animatable.View style={styles.footer}
         animation='fadeInUpBig'>
           <Text style={styles.footer_text}>Email*</Text>
           <View style={styles.input_view}>
               <FontAwesome5
               name='envelope'
               color='gray'
               size={25}
               />
               <TextInput
               style={styles.input_text}
               placeholder="Enter your email Here ?"
               textContentType='emailAddress'
               placeholderTextColor='gray'
               onChangeText={(value)=>setEmail(value)}
               autoCapitalize='none'
               autoFocus={false}
               autoCorrect={false}
               selectionColor='gray'
               />
           </View>
           <Text style={[styles.footer_text,{marginTop:15}]}>Password*</Text>
           <View style={styles.input_view}>
               <FontAwesome5
               name="lock"
               color={'gray'}
               size={25}
               />
               <TextInput
               style={styles.input_text}
               placeholder="Enter your password Here"
               placeholderTextColor={'gray'}
               secureTextEntry={passwordVisibility}
               autoCorrect={false}
               textContentType='password'
               selectionColor='gray'
               onChangeText={(value)=>setPassword(value)}
               />
               <TouchableOpacity onPress={showORHidePassword}>
                   <FontAwesome5
                   name={rightIcon}
                   size={25}
                   color='gray'
                   />
               </TouchableOpacity>
           </View>
           <View style={styles.button}>
               <TouchableOpacity onPress={()=>register()}>
                   <LinearGradient
                   colors={['#08d4c4','#01ab9d']}
                   style={styles.signIn}>
                       <Text style={styles.text_signIn}>Sign up</Text>
                   </LinearGradient>
               </TouchableOpacity>
               <TouchableOpacity
               style={[styles.signIn,{borderWidth:1,borderColor:'#009387',marginTop:15}]}
               onPress={()=>login()}>
               <Text style={styles.text_signUp}>Login</Text>
               </TouchableOpacity>
           </View>
         </Animatable.View>
        <ActivityIndicator
        animating={animating}
        color='white'
        size='large'
        style={styles.activityIndicator}
        />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#009387'
    },
    view_header:{
      flex:1,
      paddingBottom:50,
      paddingHorizontal:20,
      justifyContent:'flex-end'

    },
    text_header:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff',
    },
    footer:{
        flex:5,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:20,
    },
    footer_text:{
        fontSize:20,
        fontWeight:'bold'
    },
    input_view:{
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        marginTop:15,
        flexDirection:'row',
    },
    input_text:{
        marginTop:-12,
        flex:1,
        fontSize:20,
        paddingHorizontal:8,
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    text_signIn:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'
    },
    button:{
       marginTop:50,
    },
    text_signUp:{
        color:'#009387',
        fontWeight:'bold',
        fontSize:20
    },
    activityIndicator:{
        alignItems:'center',
        height:80,
    }
});