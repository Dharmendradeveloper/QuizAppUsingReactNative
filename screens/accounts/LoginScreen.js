import React,{useState} from "react";
import {StatusBar,ActivityIndicator,StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView, FlatList, ToastAndroid} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';


export default function LoginScreen({navigation}){
    const [animating,setAnimating] =useState(false);
    const[email,setUserName] = useState('');
    const[password,setPassword] = useState('');
    const [passwordVisibility,setPasswordBVisibility] = useState(true);
    const [rightIcon,setRightIcon] = useState('eye-slash');
    const showPassword = ()=>{
        if(!passwordVisibility){
            setPasswordBVisibility(true)
            setRightIcon('eye-slash')
        }else{
            setPasswordBVisibility(false)
            setRightIcon('eye')
        }
    }
    // const register = ()=>{
    //     navigation.navigate('register')
    // }
    const login = ()=>{
        setAnimating(true);
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(passwordRegex.test(password)){
            if(emailRegex.test(email)){
                loginUser(email,password);
            }else{
                console.log('Please enter valid email id');
            }
            

        }else{
           
            if(emailRegex.test(email)){
                if(passwordRegex.test(password)){
                    loginUser(email,password)
                }
            }else{
                console.log('Please provide valid password.')
            }
        }
        // ToastAndroid.show('Login Successfully',ToastAndroid.SHORT);
    }

    const loginUser = (emailId,PswdId)=>{
       console.log('email '+emailId+" "+PswdId);
        auth().signInWithEmailAndPassword(emailId,PswdId)
        .then(()=>{
            navigation.navigate('Home')
            setAnimating(false);
            ToastAndroid.show('Login successfully',ToastAndroid.SHORT);
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
            <StatusBar backgroundColor='#009387' barStyle='light-content'/>
            <View style={styles.header}>
            <Text style={styles.text_header}>Login Here</Text>
            </View>
            <Animatable.View 
            animation='fadeInUpBig'
            style={styles.footer}>
                <ScrollView>
                <Text style={styles.text_footer}>Email*</Text>
            <View style={styles.action}>
                <FontAwesome5
                name={'envelope'}
                color="#05375a"
                size={20}
                />
                <TextInput
                style = {styles.text_input}
                placeholderTextColor="gray"
                placeholder="Enter your email Here "
                autoCapitalize="none"
                onChangeText={(value)=>setUserName(value)}
                autoCorrect={false}
                textContentType='emailAddress'/>
            </View>
            <Text style={[styles.text_footer,{marginTop:20}]}>Password*</Text>
            <View style={styles.action}>
                <FontAwesome5
                name={'lock'}
                color={'gray'}
                size={20}
                />
                <TextInput style={styles.text_input}
                placeholder="Enter your password"
                secureTextEntry={passwordVisibility}
                autoCapitalize='none'
                onChangeText={(value)=>setPassword(value)}
                autoCorrect={false}
                />
                <TouchableOpacity onPress={showPassword}>
                    <FontAwesome5
                    name={rightIcon}
                    size={20}
                    color='gray'
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.text_private}>
                <Text style={[styles.color_textPrivate]}>{" "}By signing up you agree to our</Text>
                <Text style={[styles.color_textPrivate,{fontWeight:'bold'}]}>{" "}Terms of services</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate,{fontWeight:'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} 
                onPress={()=>login()}>
                    <LinearGradient
                    colors={['#08d4c4','#01ab9d']}
                    style={styles.signIn}>
                        <Text style={[styles.textSignIn,{color:'#fff'}]}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('register')
                }
                    
                }
                style={
                    [styles.signIn,{
                        borderWidth:1,borderColor:'#009387',
                        marginTop:15,
                    }]
                }>
                    <Text style={[styles.textSignIn,{
                        color:'#009387'
                    }]}>Register</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </Animatable.View>
           <ActivityIndicator
           animating={animating}
           color='white'
           size='large'
           style={styles.activityIndiactor} />
        </View>
       
    );
}
// create style for screen
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#009387',
        flex:1
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    header:{
       flex:1,
       justifyContent:'flex-end',
       paddingHorizontal:20,
       paddingBottom:50
    },
    footer:{
        flex:5,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:30,
        paddingVertical:20
    },
    text_footer:{
        color:'#05375a',
        fontSize:18
    },
    text_input:{
        flex:1,
        color:'#05375a',
        paddingLeft:10,
        fontSize:18,
        marginTop:-12,
        alignSelf:'center',
        backgroundColor:'white'
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
    },
    text_private:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:20,
    },
    color_textPrivate:{
        color:'gray'
    },
    textSignIn:{
        fontSize:18,
        fontWeight:'bold'
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    button:{
        alignItems:'center',
        marginTop:50,
    },
    activityIndiactor:{
        alignItems:'center',
        height:80,
    }
});
