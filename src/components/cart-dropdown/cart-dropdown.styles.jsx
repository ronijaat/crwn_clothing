import styled from 'styled-components';

import {GoogleSignInButton,BaseButton, InvterdButton} from "../button/button.styles";

export const CartDropDownContainer = styled.div`
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

  ${GoogleSignInButton},
  ${BaseButton}, 
  ${InvterdButton} {
    margin: auto;
  }

  `

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`
