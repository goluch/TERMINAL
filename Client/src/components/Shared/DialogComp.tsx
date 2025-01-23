import {Fragment} from 'react';
import {Button, Dialog, Transition} from "@headlessui/react";

interface DialogProps{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    children: string | JSX.Element;
}

const DialogComp = (props: DialogProps) => {
    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10 flex justify-center"
                onClose={() => props.setIsOpen(false)}
            >

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25"/>
                </Transition.Child>

                <div className="modal-box">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel>

                            {/* TITLE */}
                            <Dialog.Title className="font-bold text-lg">
                                {props.title}
                            </Dialog.Title>

                            {/* CONTENT */}
                            {props.children}

                            {/* HIDE DIALOG */}
                            <div className="modal-action">
                                <Button
                                    className="btn"
                                    onClick={() => props.setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition>
    );
};

export default DialogComp;