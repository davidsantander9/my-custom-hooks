import { useState, useEffect, useRef } from 'react';

const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error:null })

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        fetch(url)
        .then( resp => resp.json())
        .then( data => {

            if( isMounted.current ){
                setState({
                    loading: false,
                    error: null,
                    data: data
                })
            }else{
                console.log('setState no se llamo');
            }
        })
        .catch( () =>{
            setState({
                loading: false,
                error: 'No se pudo cargar la data',
                data: null
            })
        })
    }, [url])
    return state;
}

export default useFetch;
