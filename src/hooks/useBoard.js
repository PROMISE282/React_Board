import {createContext, useContext} from "react";

export const BoardContext = createContext(null);

export const useBoard = () => {
    const context = useContext(BoardContext);

    if (!context) {
        throw new Error("useBoard must be used inside BoardContext.Provider");
    }

    return context;
};
