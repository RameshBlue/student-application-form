import { createContext, useState } from "react";

export const pageContext = createContext();

function PageProvider({ children }) {

    const [currentPage, setCurrentPage] = useState(4);
    const [currentSubmitButton, setcurrentSubmitButton] = useState();
    const [changePage, setChangePage] = useState(false);

    const OnPreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const OnNextClick = () => {
        setChangePage(true);
        setTimeout(() => {
            setChangePage(false);
            if (currentPage <= 4) {
                setCurrentPage(currentPage + 1);
            }
        }, 350)
    }

    return (
        <pageContext.Provider value={{currentPage, currentSubmitButton, setcurrentSubmitButton, changePage, OnPreviousClick, OnNextClick }}>
            {children}
        </pageContext.Provider>
    )
}

export default PageProvider;

