// @ts-types="preact"
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface EpicFormItemProps {
    children: ComponentChildren;
}

export default function EpicFormItem({ children }: EpicFormItemProps) {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const item = itemRef.current;
        if (item === null) return;

        const moveUpClass = "move-up";
        const label = item.querySelector("label") as HTMLLabelElement;
        const input = item.querySelector("input") as HTMLInputElement;

        function addMoveUp() {
            label.classList.add(moveUpClass);
        }

        function removeMoveUp() {
            if (input.value.trim().length == 0) {
                label.classList.remove(moveUpClass);
            }
        }

        input.addEventListener("focus", addMoveUp);
        input.addEventListener("focusout", removeMoveUp);

        // tear down event listeners
        return () => {
            input.removeEventListener("focus", addMoveUp);
            input.removeEventListener("focusout", removeMoveUp);
        };
    }, [itemRef.current /*, children*/]);

    // TODO: let this control the children?
    return (
        <div ref={itemRef} class="form-item">
            {children}
        </div>
    );
}
