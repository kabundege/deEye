import AsyncStorage from "@react-native-async-storage/async-storage";

export default async ( condition,action ) => {
    try{
      const IsAuthed = await AsyncStorage.getItem("user-token") ? true : false ;
      
      if(IsAuthed === condition){
        action()
      }
    }catch(err){
      console.error(err);
    }
    
  }