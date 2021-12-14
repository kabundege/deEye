import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text,StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Post from '../../components/Post'
import { StoreContext } from '../../config/store'
import { colors } from '../../helpers/colors'
import { randomise } from '../../helpers/shuffleArray'
import { globalStyles } from '../../helpers/styles'

const { height,width } = Dimensions.get('screen')

const casses = [ 'all', 'recent', 'old', 'closed', 'active', 'dormant', 'lost', 'found' ]

export default function Library ({ navigation }) {
    const [ allPosts,setPosts ] = useState([]);
    const { user,posts } = useContext(StoreContext);
    const [ cases,setCases ] = useState(casses[0]);
    const [ showModal,setModal ] = useState(false);
    const [ loading,setLoader ] = useState(false);

    useEffect(()=> {
        setLoader(true)
        const myPosts = posts.filter( one => one.creator_id === user._id )
        if(myPosts[0]){
            let casses;
            if(cases === 'all')
                casses = randomise(myPosts)
            else if (cases === 'recent')
                casses = myPosts.filter( one => !one.status.includes('dormant'))
            else if (cases === 'old')
                casses = randomise(myPosts.reverse())
            else 
                casses = myPosts.filter( one => one.type.includes(cases) || one.status.includes(cases))
            setPosts(casses)
        }else{
            setPosts([])
        }
        setLoader(false)
    } ,[cases])

    const cassesHandler = (casse) => Promise.resolve(setCases(casse)).then(() => setModal(!showModal))

    return (
        <TouchableWithoutFeedback onPress={()=>{ if(showModal)setModal(!showModal) }}>
            <View style={styles.screen}>
                <StatusBar style="dark" />
                <View style={globalStyles.safeAreaView}/>
                <View  style={globalStyles.blobCircle} />
                <Text style={styles.mainText}>Personal {'\n'}Library .</Text>
                <View style={[globalStyles.flexed,{ paddingHorizontal:width*0.04 }]}>
                    <Text style={styles.cases}>{cases}  Cases</Text>
                    <TouchableOpacity onPress={()=>setModal(!showModal)} style={[globalStyles.flexed]}>
                        <Feather color={colors.primary} name="filter" size={20} />
                        <Text style={styles.filter}>Filter</Text>
                    </TouchableOpacity>
                </View>
                {
                    showModal &&
                    <View style={styles.modal}>
                        {
                            React.Children.toArray(
                                casses.map(
                                    one => <Text style={[styles.casse,{ color: one === cases ? colors.mainText : colors.dimeText }]} onPress={()=>cassesHandler(one)}>{one} Cases</Text>
                                )
                            )
                        }
                    </View>
                }
                <View style={globalStyles.centerd}>
                    {
                        loading ?
                            <ActivityIndicator /> :
                            allPosts[0] ?
                                <FlatList   
                                    data={allPosts}
                                    numColumns={2}
                                    style={{paddingTop:10,width}}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => item._id.toString()}
                                    renderItem={({ item,index }) => <Post navigation={navigation} data={{...item,index}} isLast={index + 1 === allPosts.length} />}
                                />:
                                <Text style={styles.notfound}> No {cases} cases {'\n'} Found </Text>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    notfound:{
        fontFamily:'Bold',
        fontSize:25,
        color:colors.mutedText,
        textAlign:"center",
        textTransform:"capitalize"
    },
    casse:{
        fontFamily:"SemiBold",
        fontSize:15,
        textTransform:"capitalize",
        marginVertical:1,
        color:colors.dimeText
    },
    modal:{
        ...globalStyles.shadow,
        position:'absolute',
        top:height*0.1,
        right:width*0.1,
        padding:5,
        borderRadius:10,
        borderColor:'whitesmoke',
        borderWidth:2,
        backgroundColor:colors.baseBg,
        zIndex:1,
        shadowOpacity:.2
    },
    filter:{
        fontSize:15,
        fontFamily:"Bold",
        color:colors.dimeText
    },
    cases:{
        fontFamily:"Bold",
        textTransform:"capitalize",
        fontSize:20,
        color:colors.mainText
    },
    mainText:{
        fontFamily:"Black",
        color:"lightgrey",
        fontSize:30,
        padding:width*0.04 
    },
    screen:{
        flex:1
    }
});
