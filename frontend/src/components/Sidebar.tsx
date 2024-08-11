import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { SidebarProps } from "../api/interface";
import { AppDispatch, RootState } from "../redux/store";
import { setBoardActive } from "../features/board/boardsSlice";

const Sidebar: React.FC<SidebarProps> = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState<boolean>(false);

  // Use custom hook for dark mode
  const [colorTheme, setTheme] = useDarkMode();
  const darkSide = colorTheme === 'dark'; // Determine dark mode state from colorTheme

  const toggleDarkMode = () => {
    // Toggle the darkSide state
    const newDarkSide = !darkSide;
    setTheme(newDarkSide ? 'dark' : 'light'); // Update theme based on the new state
  };

  const boards = useSelector((state: RootState) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[76px] h-screen items-center left-0 z-20`
            : `bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>
          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>
              <div className="dropdown-board flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-4 mr-2 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
                        board.isActive ? 'bg-[#635fc7] rounded-r-full text-white mr-2' : ''
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="filter-white h-4" alt="board icon" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}
                  <div
                    className="flex items-baseline space-x-2 mr-2 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-4 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="filter-white h-4" alt="board icon" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>
                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />
                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
              </div>
            </div>
          )}
          {isSideBarOpen ? (
            <div
              onClick={toggleSidebar}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
            >
              <img className="min-w-[20px]" src={hideSidebarIcon} alt="hide sidebar icon" />
              {isSideBarOpen && <p>Hide Sidebar</p>}
            </div>
          ) : (
            <div className="relative p-5" onClick={toggleSidebar}>
              <img src={showSidebarIcon} alt="show sidebar icon" />
            </div>
          )}
        </div>
      </div>
      {isBoardModalOpen && <AddEditBoardModal type="add" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
};

export default Sidebar;
