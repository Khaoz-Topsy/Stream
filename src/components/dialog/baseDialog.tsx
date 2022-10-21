import React, { ReactNode } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        minWidth: '35vw',
        minHeight: '35vh',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#streamAppDialogContainer');

interface IProps {
    icon?: ReactNode;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    children?: ReactNode;
}

export const BasicDialog: React.FC<IProps> = (props: IProps) => {
    const [modalIsOpen, setIsOpen] = React.useState(props.isOpen ?? false);

    const openModal = () => {
        if (props?.onOpen != null) {
            props.onOpen();
            return;
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        if (props?.onClose != null) {
            props.onClose();
            return;
        }
        setIsOpen(false);
    }

    const isModalActuallyOpen = props.isOpen === true || modalIsOpen === true;
    return (
        <>
            {
                props.icon ?? <button onClick={openModal}>Open Modal</button>
            }
            <Modal
                isOpen={isModalActuallyOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                preventScroll={true}
                parentSelector={() => document.getElementById("streamAppDialogContainer") as HTMLElement}
            >
                {props.children ?? <div></div>}
            </Modal>
        </>
    );
}