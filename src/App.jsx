import { useState, useContext } from 'react'
import PageOne from './components/PageOne';
import PagesHeader from './components/PagesHeader'
import PageTwo from './components/PageTwo';
import { pageContext } from './context/PageContext';

//https://www.behance.net/gallery/148024663/Online-Application-Form-UI-UX?tracking_source=search_projects%7Capplication+form
function App() {

  const {currentPage, currentSubmitButton, changePage, OnPreviousClick } = useContext(pageContext);

  const renderButtons = () => {
    return (
      <div className='flex'>
        {
          currentPage > 1 && <button className='button-outline' onClick={OnPreviousClick}>Previous</button>
        }
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
              {/* {currentPage == 1 && <PageOne isComplete={changePage} />} */}
              {currentPage == 1 && <PageTwo isComplete={changePage} />}
            </> : ''
        }
      </>
    )
  }

  return (
    <div className='bg-gray-200 w-full min-h-screen grid place-items-center'>
      <div className='flex flex-col gap-6 max-w-[700px] w-[90%]'>
        <div className='flex flex-col items-center bg-white shadow-md rounded-md p-12 w-full overflow-hidden'>
          {renderPages()}
        </div>
        {currentPage <= 4 && renderButtons()}
      </div>
    </div>
  )
}

export default App
