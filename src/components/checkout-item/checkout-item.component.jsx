import React from "react";
import {connect} from 'react-redux';
import {addItem, clearItemFromCart, removeItem} from "../../redux/cart/cart.actions";
import {
    CheckoutItemContainer,
    ImageContainer,
    QuantityContainer,
    RemoveButtonContainer,
    TextContainer
} from "./checkout-item.styles";

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt="item"/>
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
