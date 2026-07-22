import { useEffect, useRef } from "preact/hooks";
// @ts-types="preact"
import { ComponentChildren } from "preact";

interface ModalProps {
    id: string;
    title: string;
    children: ComponentChildren;
}

export default function Modal({ id, title, children }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const modal = modalRef.current;
        if (modal === null) return;

        function handleClick(event: MouseEvent) {
            if (modal === null) return;

            const rect = modal.getBoundingClientRect();
            const isInDialog = rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                modal.close();
            }
        }

        modal.addEventListener("click", handleClick);

        // cleanup function
        return () => {
            modal.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <dialog ref={modalRef} id={id} class="modal">
            <div class="modal-header">
                <span>{title}</span>
                <button
                    type="button"
                    class="close"
                    command="close"
                    commandfor={id}
                >
                    &times;
                </button>
            </div>
            {children}
        </dialog>
    );
}
