import Sidebar from './components/content/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const App = () =>{
  return (
    <>
        <Sidebar/>
        <Outlet/>
    </>
  );
}

export default App;
