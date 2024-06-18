import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = 'https://zustand-storage-62702-default-rtdb.firebaseio.com/zustand';// Url que sirve como medio de acceso a nodo (u objeto) llamado "zustand" ubicado en una base de datos creada previamente en firebase

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        // console.log('getItem', name);// donde name = 'person-storage'
        // return null;

        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(resp => resp.json());// Peticion  get para obtener el objeto llamado "person-storage" (name) que está dentro del nodo llamado "zustand" de la base de datos (firebaseUrl)

            // data en este punto puede lucir asi ( o null su no se encuentra el nodo "person-storage" en la base de datos firebase ):
            // {
            //     state: {
            //         firstName: 'algo',
            //         lastName: 'algo'
            //     },
            //     version: 0
            // }

            return JSON.stringify(data);// data es un objeto que devuelve un string. Metodo getItem de objeto tipo StateStorage necesita retornar un string. Luego, zustand se encargará de hacer el parseo de data y extraer el valor de las propiedades para asignarse como nuevo valor o estado (lo que provocaría la re-renderizacion del componente el cual está cargando propiedades como firstName y lastName del objeto devuelto por storeApi en person.store.ts) a las propiedades de objeto devuelto por storeApi (storeApi esta en person.store.ts por ejemplo). Dicho objeto que se menciona al ultimo es nuestro store.
        } catch (error) {
            throw error;
        }

    },
    setItem: async function (name: string, value: string): Promise<void> {
        // console.log('setItem', { name, value });// donde name = 'person-storage' y value contiene esto: '{"state": { "firstName": ESTADO O VALOR ACTUAL DE PROPIEDAD firstName DE OBJETO devuelto por storeApi, "lastName": "ESTADO O VALOR ACTUAL DE PROPIEDAD lastName DE OBJETO devuelto por storeApi" }, "version": 0}'

        // const data =
            await fetch(`${firebaseUrl}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(resp => resp.json());// con esta instruccion, se crea un nodo llamado person-storage el cual contiene '{"state": { "firstName": ESTADO O VALOR ACTUAL DE PROPIEDAD firstName DE OBJETO devuelto por storeApi, "lastName": "ESTADO O VALOR ACTUAL DE PROPIEDAD lastName DE OBJETO devuelto por storeApi" }, "version": 0}'

        // sessionStorage.setItem(name, value);

        // console.log(data);

        return;
    },
    removeItem: function (name: string):void | Promise<void> {
        console.log('removeItem', name);
    }
};

export const firebaseStorage = createJSONStorage(() => storageApi);