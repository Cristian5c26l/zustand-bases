import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";


interface PersonState {
    firstName: string;
    lastName: string;

}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;// setLastName es una propiedad la cual será una funcion que reciba un parametro tipo string y retorne void (no retorne nada)
}

//type PersonStore = PersonState & Actions;

const storeApi: StateCreator<PersonState & Actions,[["zustand/devtools", never]]> = (set) => ({
    firstName: '',
    lastName: '',
    setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),// state es el objeto tipo PersonState & Actions. false permite que funcion set pueda tener el comportamiento por defecto que dicha funcion set tiene (realizar cambios en el estado que es un objeto tipo PersonState y Actions).  setLastName indica el nombre de la accion cuando ocurre un cambio del estado tipo Person & Actions. El tercer argumento de funcion set solo se puede usar cuando el store (storeApi en este caso) esté envuelto dentro del middleware devTools ([["zustand/devtools", never]])
});



export const usePersonStore = create<PersonState & Actions>()(

    
        devtools(
            persist(storeApi,
                {
                    name: 'person-storage',
                    // storage: customSessionStorage
                    storage: firebaseStorage
                }
            )
        )
    
);

// create<PersonState & Actions> es una funcion de la cual se espera que se devuelva un objeto que tenga las propiedaddes firstName, lastName (PersonState), setFirstName y setLastName (Actions). La documentacion de zustand sugiere que se coloque create<PersonState & Actions> en lugar de create<PersonStore>