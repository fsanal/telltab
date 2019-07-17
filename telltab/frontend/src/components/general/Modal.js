import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from "styled-components";

 
const moveInTop = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-3rem); 
    }
    100% {
        opacity: 1;
        transform: translate(0); 
    }
`

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1050;
    display: flex;
    align-items: baseline;
`

export const ModalBox = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: ${props => props.width};
    height: ${props => props.height};
    overflow: hidden;
    padding:16px;
    margin: 8rem auto;
    box-sizing:border-box;
    z-index:1;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    background: white;
    border: 0.5px solid #E8E8E8;
    animation: ${moveInTop} 0.4s ease-out;
`

export const ModalBg = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 0;
    opacity: 1;
    background: rgba(9, 30, 66, 0.54);
    transition: opacity 220ms ease 0s;
`

const Modal = ({show, onDismiss, renderContent, width, height}) => {
    return ReactDOM.createPortal(
        <> 
            { show && (
                <ModalWrapper>
                        <ModalBox height = {height} width = {width} onClick = {(e) => e.stopPropagation()} >
                            {renderContent}
                        </ModalBox>
                    <ModalBg onClick = {onDismiss} />
                </ModalWrapper>
                )
            }
        </>,
        document.querySelector('#modal')
    );
};

export default Modal;
