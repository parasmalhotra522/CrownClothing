
// // import styled from 'styled-components';

// // export const PaymentFormContainer = styled.form`
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     width: 100%;
// //     max-width: 400px;
// //     margin: 20px auto;
// //     padding: 20px;
// //     background-color: #f9f9f9;
// //     border-radius: 10px;
// //     box-shadow: 0 4px 8px rgba(0,0,0,0.1);
// // `;

// // export const FormContainer = styled.div`
// //     width: 100%;
// // `;

// // export const CardSection = styled.div`
// //     margin: 20px 0;
// //     padding: 10px;
// //     border: 1px solid #ccc;
// //     border-radius: 5px;
// //     background-color: #fff;
// //     transition: border 0.3s;

// //     &:focus-within {
// //         border-color: #0070f3;
// //     }
// // `;


import styled from 'styled-components';

const CardContainer = styled.div`
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  border-radius: 10px;
  box-shadow:  20px 20px 60px #d1d1d1,
               -20px -20px 60px #ffffff;
  width: 25rem;
  height: 12rem;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardNumber = styled.div`
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-top: 20px;
`;

const CardHolder = styled.div`
  font-size: 0.9rem;
  margin-top: auto;
`;

const ExpiryDate = styled.div`
  font-size: 0.9rem;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Chip = styled.div`
  background: #f1c40f;
  width: 35px;
  height: 25px;
  border-radius: 3px;
  position: absolute;
  top: 20px;
  left: 20px;
  box-shadow: inset 2px 2px 5px #d1d1d1,
              inset -2px -2px 5px #ffffff;
`;

const Card = ({ cardNumber, cardHolder, expiryDate }) => {
  return (
    <CardContainer>
      <Chip />
      <CardNumber>{cardNumber}</CardNumber>
      <CardHolder>{cardHolder}</CardHolder>
      <ExpiryDate>{expiryDate}</ExpiryDate>
    </CardContainer>
  );
};

export default Card;



 
