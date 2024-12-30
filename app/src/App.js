import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Open from './components/Pages/Open/Open.js';
import Verify from './components/Pages/Verify/Verify.js';
import Marketplace from './components/Pages/Buy/MarketPlace.jsx';
import Adopt from './components/Pages/Adopt/Adopt.js';
import Seller from './components/Pages/Seller/Seller.js';
import Sellitem from './components/Pages/Seller/Sellitem.jsx';
import Viewdetails from './components/Pages/Description/ViewDetails.js';
import Verifier from './components/Pages/Verify/Verifier';
import Register from './components/Pages/Register/Register';
import Login from "./components/Pages/Login/Login"
import SellerDescription from './components/Pages/Description/SellerDescription';
import AdoptionPage from './components/Pages/Adopt/AdoptApplication';
import ShopCart from './components/Pages/Cart/ShopCart';
import AddImage from './components/Pages/Seller/AddImage';
import Profile from "./components/Pages/Login/Profile.jsx"
import UpdateDetails from './components/Pages/Description/UpdateDetails';
import Marketplacee from './components/Pages/Buy/CollectionPage';
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path='/' element={<Open/>}/>
          <Route path='/verification' element={<Verify/>}/>
          <Route path='/marketplace' element={<Marketplace/>}/>
          <Route path='/adoption' element={<Adopt/>}/>
          <Route path='/seller' element={<Seller/>}/>
          <Route path='/sellitem' element={<Sellitem/>}/>
          <Route path='/description/:_id' element={<Viewdetails/>}/>
          <Route path='/verify' element={<Verifier/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sellerdescription/:_id' element={<SellerDescription/>}/>
          <Route path='/adoptionapplication' element={<AdoptionPage/>}/>
          <Route path='/cart' element={<ShopCart/>}/>
          <Route path='/addimage/:_id' element={<AddImage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/updatePet/:id' element={<UpdateDetails/>}/>
          <Route path='/petBreed/:breed' element={<Marketplacee/>}/>



        </Routes>
                  
                     
                      </Router>
    </div>
  );
}

export default App;
