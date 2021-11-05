import React , { Component,createContext } from 'react';

const StoreContext = createContext();

class StoreProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            theme:'light',
            user:{
                name:"Christopher K. Kabundege",
                phoneNumber:'0784524295',
                id:1
            },
            posts:[
                {
                    id: 1,
                    image:'https://picsum.photos/200/300',
                    name:'Jogn Doe',
                    age:20,
                    gender:'Female',
                    description:'Cupidatat id magna dolore consectetur excepteur nisi eiusmod. Excepteur elit duis nulla ipsum ut enim laboris sunt adipisicing proident aliqua ullamco do aute. Ullamco voluptate velit tempor anim minim elit minim.',
                    phoneNumber:'+250789123456',
                    creator_id:5,
                    status:'active',
                    type:'lost',
                    complexion:"Dark",
                    location:"Kigali, Rwanda",
                    nationality:"Rwandan"
                },{
                    id: 2,
                    image:'https://picsum.photos/200/300',
                    name:'Jogn Doe',
                    age:15,
                    gender:'Male',
                    description:'Cupidatat id magna dolore consectetur excepteur nisi eiusmod. Excepteur elit duis nulla ipsum ut enim laboris sunt adipisicing proident aliqua ullamco do aute. Ullamco voluptate velit tempor anim minim elit minim.',
                    phoneNumber:'+250789123456',
                    creator_id:3,
                    status:'dormant',
                    type:'lost',
                    complexion:"Dark",
                    location:"Kigali, Rwanda",
                    nationality:"Rwandan"
                },{
                    id: 3,
                    image:'https://picsum.photos/200/300',
                    name:'Jogn Doe',
                    age:22,
                    gender:'Male',
                    description:'Cupidatat id magna dolore consectetur excepteur nisi eiusmod. Excepteur elit duis nulla ipsum ut enim laboris sunt adipisicing proident aliqua ullamco do aute. Ullamco voluptate velit tempor anim minim elit minim.',
                    phoneNumber:'+250789123456',
                    creator_id:4,
                    status:'closed',
                    type:'lost',
                    complexion:"Dark",
                    location:"Kigali, Rwanda",
                    nationality:"Rwandan"
                },{
                    id: 4,
                    image:'https://picsum.photos/200/300',
                    name:'Jogn Doe',
                    age:12,
                    gender:'Female',
                    description:'Cupidatat id magna dolore consectetur excepteur nisi eiusmod. Excepteur elit duis nulla ipsum ut enim laboris sunt adipisicing proident aliqua ullamco do aute. Ullamco voluptate velit tempor anim minim elit minim.',
                    phoneNumber:'+250789123456',
                    creator_id:2,
                    status:'active',
                    type:'found',
                    complexion:"Dark",
                    location:"Kigali, Rwanda",
                    nationality:"Rwandan"
                },{
                    id: 5,
                    image:'https://picsum.photos/200/300',
                    name:'Jogn Doe',
                    age:20,
                    gender:'Female',
                    description:'Cupidatat id magna dolore consectetur excepteur nisi eiusmod. Excepteur elit duis nulla ipsum ut enim laboris sunt adipisicing proident aliqua ullamco do aute. Ullamco voluptate velit tempor anim minim elit minim.',
                    phoneNumber:'+250789123456',
                    creator_id:1,
                    status:'closed',
                    type:'found',
                    complexion:"Dark",
                    location:"Kigali, Rwanda",
                    nationality:"Rwandan"
                },
            ],
            comments:[
                {
                    id:3,
                    content:'Pariatur non aliquip reprehenderit duis dolore incididunt qui qui. Quis sit sit consequat duis ullamco laborum. Aute ex nulla minim nisi irure proident.',
                    story_id:2,
                    creator_id:1,
                    creator:{
                        id:1,
                        phoneNumber:'0784824295',
                        name:'Christophe K. Kwizera'
                    },
                    timestamp:Date.now(),
                },
                {
                    id:2,
                    content:'Pariatur non aliquip reprehenderit duis dolore incididunt qui qui. Quis sit sit consequat duis ullamco laborum. Aute ex nulla minim nisi irure proident.',
                    story_id:2,
                    creator_id:2,
                    creator:{
                        id:2,
                        phoneNumber:'0781234567',
                        name:'Eric Niyigena'
                    },
                    timestamp:1636054404863,
                },
                {
                    id:1,
                    content:'Pariatur non aliquip reprehenderit duis dolore incididunt qui qui. Quis sit sit consequat duis ullamco laborum. Aute ex nulla minim nisi irure proident.',
                    story_id:2,
                    creator_id:1,
                    creator:{
                        id:1,
                        phoneNumber:'0784824295',
                        name:'Christophe k. Kwizera'
                    },
                    timestamp:1636050474863,
                },
                {
                    id:4,
                    content:'Pariatur non aliquip reprehenderit duis dolore incididunt qui qui. Quis sit sit consequat duis ullamco laborum. Aute ex nulla minim nisi irure proident.',
                    story_id:2,
                    creator_id:1,
                    creator:{
                        id:1,
                        phoneNumber:'0784824295',
                        name:'Christophe k. Kwizera'
                    },
                    timestamp:1633054474863,
                },
            ],
            views:[],
        }
    }

    handlerContext = (key,value) => {
        this.setState({ [key] : value });
    }

    render(){
        return(
            <StoreContext.Provider 
                    value = {{
                        ...this.state,
                        handlerContext: this.handlerContext,
                    }}
                >
                {this.props.children}
            </StoreContext.Provider>
        )
    }
} 

export { StoreContext,StoreProvider }
