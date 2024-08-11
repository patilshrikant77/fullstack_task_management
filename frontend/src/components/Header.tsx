import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../assets/logo-mobile.svg';
import { RootState } from '../redux/store';
import UserService from '../services/UserService';
import AddEditTaskModal from '../modals/AddEditTaskModal';


const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleLogout = () => {
      UserService.logout(dispatch);
  };

  return (
    <div className=" px-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className=" flex justify-between dark:text-white items-center  ">

        <nav className="flex items-center justify-between w-[100%] py-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={Logo} alt="Logo" className="h-6 w-6" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
          {token && (
            <div className="flex">
              <button   className=" button hidden md:block "
              onClick={() => {
                setIsTaskModalOpen((prevState) => !prevState);
              } }
            >
              + Add New Task
            </button><button
              className="flex items-center space-x-2  duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 ml-7  hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
              onClick={handleLogout}

            >
                <p className="text-lg font-bold">Logout</p>
              </button></div>
          )}
        </nav>
      </header>
        {isTaskModalOpen && (
          <AddEditTaskModal
            setIsAddTaskModalOpen={setIsTaskModalOpen}
            type="add"
            device="mobile" setIsTaskModalOpen={function (): void {
              throw new Error('Function not implemented.')
            } } />
        )}
       </div>
  ) 
};

export default Header;
