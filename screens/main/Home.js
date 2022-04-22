import React,{useState,useRef} from 'react';
import {TouchableOpacity,View,Text,StyleSheet,Image, Animated} 
from 'react-native';
import profile from './../../images/profile.png';
import home from './../../images/home.png';
import search from './../../images/search.png';
import settings from './../../images/settings.png';
import notifications from './../../images/bell.png';
import logout from './../../images/logout.png';
import menu from './../../images/menu.png';
import close from './../../images/close.png';
import img from './../../images/photo.jpg';

export default function Home(){
  const [currentTab,setCurrentTab] = useState('Home');
  const [showMenu,setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closedButtonOffcet = useRef(new Animated.Value(0)).current;
  return(
    <View style={styles.container}>
     <View style={styles.parentView}>
       <Image
       source={profile}
       style={styles.image}/>
       <Text style={styles.text}>Dharmendra</Text>
     
     <View style={{flexGrow:1,marginTop:50}}>
     {CustomTab(currentTab,setCurrentTab,home,'Home')}
     {CustomTab(currentTab,setCurrentTab,search,'Search')}
     {CustomTab(currentTab,setCurrentTab,notifications,'Notification')}
     {CustomTab(currentTab,setCurrentTab,settings,'Settings')}
     </View>
     <View>
       {CustomTab(currentTab,setCurrentTab,logout,'logout')}
     </View>
     </View>
     <Animated.View style={{
       top:0,
       bottom:0,
       left:0,
       right:0,
       backgroundColor:'white',
       position:'absolute',
       paddingVertical:15,
       paddingHorizontal:15,
       borderRadius:showMenu?15:0,
       transform:[{
         scale:scaleValue
       },
      {
        translateX:offsetValue
      }]
     }}>
       <Animated.View style={{
         transform:[{
           translateY:closedButtonOffcet
         }]
       }}>
       <TouchableOpacity onPress={()=>{
         Animated.timing(scaleValue,{
           toValue:showMenu?1:0.88,
           duration:300,
           useNativeDriver:true,
         }).start()
         Animated.timing(offsetValue,{
           toValue:showMenu?0:220,
           duration:300,
           useNativeDriver:true
         }).start()
        //  Animated.timing(closedButtonOffcet,{
        //   toValue:!showMenu?-30:0,
        //   duration:300,
        //   useNativeDriver:true
        // }).start()
         setShowMenu(!showMenu)
       }}>
         <Image 
          source={showMenu?close:menu}
          style={styles.menu}/>
        </TouchableOpacity>
        <Text style={styles.home}>
            {currentTab}
          </Text>
          <Image 
          source={img}
          style={styles.profile}/>
       </Animated.View>
     </Animated.View>
    </View>
  );
}

const CustomTab = (currentTab,setCurrentTab,image,title)=>{
  return(
<TouchableOpacity onPress={()=>{
  setCurrentTab(title)
}
}>
  <View style={[styles.drawerView,{backgroundColor:currentTab==title?'white':'transparent'}]}>
    <Image
    source={image}
    style={[styles.drawerImage,{tintColor:currentTab==title?'gray':'white'}]}
    />
    <Text style={[styles.drawerText,{color:currentTab==title?'gray':'white'}]}>{title}</Text>
  </View>
</TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#5359D1',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  image:{
    height:80,
    width:80,
    borderRadius:10,
  },
  parentView:{
    justifyContent:'flex-start',
    padding:15,
  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
    marginTop:10,
  },
  drawerView:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    paddingLeft:20,
    paddingRight:30,
    borderRadius:8,
    paddingVertical:8,
    marginTop:15,
  },
  drawerImage:{
    height:25,
    width:25,
  },
  drawerText:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000',
    paddingLeft:15,
  },
  menu:{
    height:25,
    width:25,
    tintColor:'gray',
   
  },
  home:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:15,
  },
  profile:{
    width:'100%',
    height:300,
    borderRadius:15,
  }
});

