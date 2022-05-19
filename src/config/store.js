import React , { Component,createContext } from 'react';

const StoreContext = createContext();

class StoreProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            theme:'light',
            user:null,
            posts:[],
            views:[],
            comments:[],
        }
    }

    handlerContext = (key,value,cb) => {
        this.setState({ [key] : value },cb);
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
