import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import AddEditBoardModal from '../modals/AddEditBoardModal';
import EmptyBoard from '../components/EmptyBoard';
import Column from '../components/Column';
import Sidebar from '../components/Sidebar';
import { fetchBoards } from '../api/boardApi';

const Home: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState<boolean>(false);
  const boards = useSelector((state: RootState) => state.boards);

  const board = boards.find((board) => board.isActive);
 
  const columns = board ? board.columns : [];
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);


  useEffect(() => {
    dispatch(fetchBoards());
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  },[dispatch]);



  return (
  
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd]  scrollbar-hide h-screen flex    dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen} boards={boards} onBoardClick={function (index: number): void {
            throw new Error('Function not implemented.');
        } }       
    />
      )}

      {/* Columns Section */}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
          >
            + New Column
          </div>
        </>
      ) : (
        <>
          <EmptyBoard type="add" />
        </>
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>

  );
};

export default Home;



