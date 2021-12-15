import { Feather,AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react'
import { View, Text,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import Post from '../../components/Post';
import { StoreContext } from '../../config/store';
import { colors } from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';

const { width } = Dimensions.get('screen')

export default function Search ({ navigation }) {
    const { posts } = useContext(StoreContext)
    const [ results,setResults ] = useState([])
    const [ loading,setLoader ] = useState(false)
    const [ query,setQuery ] = useState(null)

    useEffect(()=>{
        if(query){
            setLoader(true)
            const newResults = posts.filter( one => 
                one.description.includes(query) || 
                String(one.age).includes(query) || 
                one.name.includes(query) || 
                String(one.phoneNumber).includes(query) ||
                one.complexion.includes(query) ||
                one.nationality.includes(query) ||
                one.location.includes(query) 
            )
    
            Promise.resolve(setResults(newResults))
            .then(() => setLoader(false))
        }
    },[query])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <StatusBar style="light" />
                <View style={[globalStyles.safeAreaView,{backgroundColor:colors.primary,paddingBottom:10,paddingHorizontal:'5%'}]}>
                    <Text style={{fontFamily:"Bold",color:"white",fontSize:30}}>Search</Text>
                    <View style={globalStyles.flexed}>
                        <TextInput 
                            placeholder="Names, Location, Age, Gender..." 
                            placeholderTextColor={colors.dimeText}
                            style={styles.input}
                            value={query}
                            onChangeText={(value) =>setQuery(value.toLowerCase())} />
                        {
                            !query ?
                            <Feather name="search" size={30} color={colors.mainText} style={{opacity:.2}} /> :
                            <TouchableOpacity onPress={()=>setQuery(null)}>
                                <AntDesign name="close" size={30} color={'white'} style={{opacity:.8}} /> 
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={globalStyles.centerd}>
                    {
                        !query ?
                            <Text style={[styles.notfound,{ color:colors.dimeText }]}>Easy & Quick</Text>:
                            loading ?
                                <ActivityIndicator /> :
                                results[0] ?
                                    <FlatList   
                                        data={results}
                                        numColumns={2}
                                        style={{paddingTop:10,width}}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={item => item._id?.toString()}
                                        renderItem={({ item,index }) => <Post navigation={navigation} data={{...item,index}} isLast={index + 1 === results.length} />}
                                    />:
                                    <Text style={styles.notfound}> No {query} cases {'\n'} Found </Text>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input:{ backgroundColor:colors.baseBg,padding:10,flex:.95,borderRadius:5,fontFamily:"Medium" },
    notfound:{
        fontFamily:'Bold',
        fontSize:25,
        color:colors.mutedText,
        textAlign:"center",
        textTransform:"capitalize"
    },
    screen:{
        flex:1
    }
});
