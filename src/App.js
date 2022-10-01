import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CollectionDetail from './components/collectionDetail/CollectionDetail';
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnalysisBoard from './components/collectionDetail/AnalysisBoard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  return (
    <div className="App">
         <ToastContainer />
      <BrowserRouter>
        <PrimarySearchAppBar />
        <Routes>
          <Route exact path="/" element={<CollectionDetail/>} />
          <Route exact path="/AnalysisBoard/:collectionName" element={<AnalysisBoard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
