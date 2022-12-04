import { useState } from 'react'
import PageOne from './components/PageOne';
import PagesHeader from './components/PagesHeader'

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [completed, setCompleted] = useState(false);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextClick = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    } else {
      setCompleted(true);
    }
  }

  const renderButtons = () => {
    return (
      <div className='flex'>
        {
          currentPage > 1 && <button className='button-primary' onClick={handlePreviousClick}>Previous</button>
        }
        <div className='flex-1'></div>
        <button className='button-outline' onClick={handleNextClick}>Next</button>
      </div>
    )
  }

  const renderPages = () => {
    return (
      <>
        {
          !completed ?
            <>
              <PagesHeader currentPage={currentPage} />
              {currentPage == 1 && <PageOne />}
            </> : ''
        }
      </>
    )
  }

  return (
    <div className='bg-gray-200 w-full min-h-screen grid place-items-center'>
      <div className='flex flex-col gap-6 max-w-[700px] w-[90%]'>
        <div className='flex flex-col items-center bg-white shadow-md rounded-md p-12 w-full'>
          {renderPages()}
        </div>
        {!completed && renderButtons()}
      </div>
    </div>
  )
}

export default App
