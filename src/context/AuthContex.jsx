
import React, {useState, useEffect, createContext, useContext} from "react";
import {auth} from '../firebase/firebaseConfig';
import {onAuthStateChanged } from "firebase/auth";

// intermedario entre mi proveedor y los componentes hijos para proveer los datos.
export const AuthContext = createContext();

//hook para acceder al contexto
export const useAuth = ()=>{
   return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{ //contenedor padre global
    //guardaremos en este estado el valor del usuario 
    const [user,setUser] = useState();

    //creamos un estado para saber cuando termina de cargar la comprobacion
    // de onAuthStateChange
    const [loading, setLoading] = useState(true);


    //cada vez que cargue la pagina por primera vez, comprobar si hay un usuario.
    useEffect(()=>{
        //comprueba cuando el estado de autentiacion cambia.
        // la funcion nAuthStateChanged, devuelve otra funcion para cancelar la comprobacion una vez se
        //cierre la sesion.
        const cancelSubscription = onAuthStateChanged(auth, (user) =>{
                setUser(user)
                setLoading(false)
        });
        
        return cancelSubscription; //limpiando una vez se desmota el componente provider
    }, []);

    return (
        //retornamos los elementos hijos solo cuando no este cargando
        // de esta forma nos aseguramos de no cargar el resto de la app hasta que el
        // usuario haya iniciado sesion.

        // si no hacemos esto al refrescar la pagina el componente children intenta cargar
        // inmediatamente, entonce va a cargar antes de haber comprobado que existe un usuario. 
        <AuthContext.Provider value={{user: user}}>
            {!loading && children}
        </AuthContext.Provider>
    )
} 

