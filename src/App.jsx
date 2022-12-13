import { useState, useContext } from 'react'
import FinalPage from './components/FinalPage';
import PageFour from './components/PageFour';
import PageOne from './components/PageOne';
import PagesHeader from './components/PagesHeader'
import PageThree from './components/PageThree';
import PageTwo from './components/PageTwo';
import { pageContext } from './context/PageContext';

function App() {

  const {currentPage, currentSubmitButton, changePage, OnPreviousClick } = useContext(pageContext);

  const renderButtons = () => {
    return (
      <div className='flex'>
        { currentPage > 1 && <button className='button-outline' onClick={OnPreviousClick}>Previous</button>}
        <div className='flex-1'></div>
        <button className='button-primary' onClick={() => {
          currentSubmitButton.current.click();
        }}>Next</button>
      </div>
    )
  }

  const renderPages = () => {
    return (
      <>
        {
          currentPage <= 4 ?
            <>
              <PagesHeader currentPage={currentPage} />
              {currentPage == 1 && <PageOne isComplete={changePage} />}
              {currentPage == 2 && <PageTwo isComplete={changePage} />}
              {currentPage == 3 && <PageThree isComplete={changePage} />}
              {currentPage == 4 && <PageFour isComplete={changePage} />}
            </> : <FinalPage />
        }
      </>
    )
  }

  return (
    <div className='bg-gray-200 w-full min-h-screen grid place-items-center'>
      <div className='flex flex-col gap-6 max-w-[700px] w-[90%]'>
        {currentPage <=4 && <h1 className='font-semibold text-[30px] self-center text-gray-700'>College Application Form</h1>}
        <div className='flex flex-col items-center bg-white shadow-md rounded-md p-12 w-full overflow-hidden'>
          {renderPages()}
        </div>
        {currentPage <= 4 && renderButtons()}
      </div>
    </div>
  )
}

export default App
