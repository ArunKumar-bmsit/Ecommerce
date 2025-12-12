import {React,useState,useEffect} from 'react'
import {HiOutlineShoppingCart,HiShoppingCart} from "react-icons/all"
import { Image } from "@chakra-ui/react"
import {Link } from 'react-router-dom'
import Rating from './Rating'
import { addToCart } from "../actions/cartActions";
import { CART_ADD_ITEM } from "../constants/cartConstants";
import { useDispatch, useSelector } from 'react-redux'
const CardProduct = ({product}) => {
    const  [showbtn,setShowbtn] = useState(false) 
    const  [Incart,setIncart] = useState(false) 
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.cart)
    const {cartItems} = Cart
    useEffect(() => {
       const isincart = cartItems.find(x => x.product === product._id);
       if(isincart){
           setIncart(true);

       }
       return () => {
           
       }
   }, )
   const addcart = () => {
       setIncart(true);
       // If the ID is not a 24-char Mongo ObjectId we assume it's a local sample product
       if (product._id.length !== 24) {
         const newItem = {
           product: product._id,
           name: product.name,
           images: product.images,
           price: product.price,
           countInStock: product.countInStock,
           qty: 1,
         };
         dispatch({ type: CART_ADD_ITEM, payload: newItem });
         // persist locally so cart survives refresh during demo
         const stored = JSON.parse(localStorage.getItem('cartItems') || '[]');
         localStorage.setItem('cartItems', JSON.stringify([...stored, newItem]));
       } else {
         dispatch(addToCart(product._id, 1)); // normal backend flow
       }
   }
    
     return (
        <>  
            <div className='cardProduct' onMouseOver={ ()=> {setShowbtn (true)}} 
                                          onMouseLeave= { ()=> {setShowbtn (false)}}>           
                 <div className='imgDiv'>
                         <Image className='imgProduct' boxSize='350px' objectFit='cover' src={product.images[0]} />  
                 </div>
               <div className='bottomcard'>
                       <Link to={`/product/${product._id}`} exact  >     
                            <span>{product.name}</span>     
                       </Link>
                              {Incart ?  <HiShoppingCart className="iconFav" size ='26'/> : <HiOutlineShoppingCart  className="iconFav" color='#999' size='26'  onClick = {addcart}/>  }

                       <div className = 'productpricecard'> {`${product.price} $`}</div>
                       <div className = 'Rating'>
                       <Rating value={product.rating} text={`${product.numReviews} reviews`}/>

                       </div>

                             
               </div>
              
                      <Link to={`/product/${product._id}`} exact >
                             <button className= { showbtn ? 'QuickView QuickViewActive' : 'QuickView' }> View Details</button>
                      </Link>   
             </div>      
         </>
 
    )
}

export default CardProduct
