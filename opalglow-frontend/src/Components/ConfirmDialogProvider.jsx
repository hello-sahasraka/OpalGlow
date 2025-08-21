import { createContext, useContext, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Ban, Trash2, X } from 'lucide-react';

const ConfirmDialogContext = createContext();

export function ConfirmDialogProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState(() => () => { });

    const confirmDialog = (msg, onConfirmCallback) => {
        setMessage(msg);
        setOnConfirm(() => onConfirmCallback);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        onConfirm();
        setIsOpen(false);
    };

    return (
        <ConfirmDialogContext.Provider value={confirmDialog}>
            {children}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    {/* Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50" />
                    </Transition.Child>

                    {/* Modal content */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                <Dialog.Title className="text-lg font-semibold text-gray-900">
                                    Confirm Action
                                </Dialog.Title>
                                <Dialog.Description className="mt-2 text-sm text-gray-500">
                                    {message}
                                </Dialog.Description>

                                <div className="mt-4 flex justify-end gap-8">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer hover:bg-gray-300 transition"
                                    >
                                        <X size={18} />   Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2 cursor-pointer hover:bg-red-600 transition"
                                    >
                                        <Trash2 size={18} /> Confirm
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </ConfirmDialogContext.Provider>
    );
}

export function useConfirmDialog() {
    return useContext(ConfirmDialogContext);
}
