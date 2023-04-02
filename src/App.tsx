import React from 'react';
import { LargeHeading } from './styles/globalStyles';
import { toggleTheme } from './features/themeSlice';
import { useAppDispatch } from './app/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <LargeHeading>My App</LargeHeading>
      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
    </div>
  );
};

export default App;
