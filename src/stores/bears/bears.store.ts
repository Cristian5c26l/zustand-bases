import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Bear {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    bears: Bear[];

    // computed: {
    //     totalBears: number
    // };// esta propiedad llamada computed luce como un objeto con la propiedad totalBears la cual es de tipo number
    totalBears: () => number;
    
    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;

    doNothing: () => void;
    addBear: () => void;
    clearBears: () => void;

    
    // increasePopulation: () => void;
    // removeAllBears: () => void;
    // updateBears: (newBears:number) => void;// updateBears será una funcion la cual no retorna nada (retorna void) y recibe un argumento de tipo number
}

export const useBearStore = create<BearState>()(
    
    persist((set, get, store) => ({
        blackBears: 10,
        polarBears: 5,
        pandaBears: 1,

        bears: [{ id: 1, name: 'Oso #1' }],// bears es un Objeto anidado del store useBearStore

        // computed: {
        //     get totalBears() {
        //         return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
        //     }
        // },

        totalBears: () => {
            console.log(store);
            return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
        },

        increaseBlackBears: (by: number) => set(state => ({ blackBears: state.blackBears + by })),// set(state => ({ blackBears: state.blackBears + by })) implicitamente o se entiende que significa: { ...state, blackBears: state.blackBears + by }, donde state hace referencia a un objeto tipo BearState
        increasePolarBears: (by: number) => set(state => ({ polarBears: state.polarBears + by })),
        increasePandaBears: (by: number) => set(state => ({ pandaBears: state.pandaBears + by })),

        // Metodos para el objeto anidado bears (bears es un objeto o arreglo. Un arreglo es un objeto)
        doNothing: () => set(state => ({ bears: [...state.bears] })),// Para Zustand, el spread de un objeto anidado (para vaciarse en un arreglo en este caso) considera que es un nuevo cambio de estado. Usar useShallow para ayudar a Zustand a determinar que el valor del objeto anidado (state.bears) realmente es diferente al nuevo valor ([...state.bears]) y en caso de que sí sean difentes, pues cambia el estado al de state.bears a su nuevo valor provocando que se renderice el componente donde se está usando "bears" de state... En resumen, usar useShallow cuando sea necesario para objetos anidados (como bears)
        addBear: () => set(state => ({
            bears: [
                ...state.bears,
                { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }
        ] })),
        clearBears: () => set({ bears: [] }),// Dado que no se está usando "state" para establecer un nuevo estado basado en dicho "state", lo quitamos a dicho "state"
    }), {name: 'bears-storage'})

)