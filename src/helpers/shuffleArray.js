export const randomise = (data) => {
    return data.sort(()=> Math.random() - 0.5 );
}

export const LoadingData = Array.from({ length:20 },(el,index)=> ({ index,id:index }) )
