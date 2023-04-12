import { FC } from 'react';
import EditSidebar from './EditSidebar';

interface NewSidebarProps {}

const NewSidebar: FC<NewSidebarProps> = ({}) => {
  return (
    <div>
      <EditSidebar />
    </div>
  );
};

export default NewSidebar;
