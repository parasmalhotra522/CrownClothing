import Styled from 'styled-components';


export const CartDropDownContainer =Styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
`;

export const EmptyMessage = Styled.span`
      font-size: 18px;
      margin: 50px auto;
`;

export const CartItems = Styled.div`
      height: 240px;
      display: flex;
      flex-direction: column;
      overflow: scroll;
`;




  
//     .cart-items {
//      
//     }
  
//     button {
//       margin-top: auto;
//     }
//   }
  