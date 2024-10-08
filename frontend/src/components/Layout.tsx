import React, { ReactNode } from 'react';
import Header from './Header';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
      <div className="flex-1">
        <Header />
        <main>
          {children}
        </main>
      </div>
  );
};

export default Layout;
