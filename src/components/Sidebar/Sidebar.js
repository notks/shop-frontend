import React, { useState,useEffect,useRef } from 'react'
import './Sidebar.scss'
import CartItem from '../CartItem/CartItem'
export default function Sidebar({cart,setcart,}) {
    console.log(cart)
    const [price, setprice] = useState(0)
    const cartcount = useRef(0)
   useEffect(() => {
       let newPrice=0
       cartcount.current=0
    cart.forEach(item=>{
        
           newPrice+=item.price*item.q
        
        cartcount.current=cartcount.current+item.q
    
    })
       setprice(newPrice)  

   }, [cart])

   const handleQuantitychange=(event,item)=>{
    const newCart=[...cart]
      newCart.forEach(cartItem=>{
          if(item.id===cartItem.id){
              item.q=parseInt(event.target.value)
          }
      })
  setcart(newCart)
}
const removeCartItem=(itemId)=>{
    let newCart=[...cart]
    let found=false
    newCart.forEach(item=>{
        if(item.id===itemId){
            if(item.q>1){
                item.q--
                found=true
            }
        }
    })
    if(found===false){
newCart=cart.filter(item=>item.id!==itemId)
    }
   

setcart(newCart)
}
    return (
        <div className='sidebar'>
        <div className='cart'>
            <img src='/img/supermarketlight.svg' className='shopping-cart-sidebar' alt='shopping-cart'></img>
        </div>
      {cart.map(item=>{
        
          return ( <CartItem 
            key={item.id}
            removeItem={removeCartItem}
            qChange={handleQuantitychange}
            setcart={setcart}
        item={item}
        cart={cart}
          /> 
          )
      }

      )}
<div className='price'>
{price}$<br></br>
{cartcount.current}
</div>

        </div>
    )
}
