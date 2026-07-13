import type { ComponentChildren } from "preact";

export interface ExampleButtonProps {
    id?: string;
    onClick?: () => void;
    children?: ComponentChildren;
    disabled?: boolean;
}

export default function ExampleButton(props: ExampleButtonProps) {
    return (
        <button
            {...props}
            class="px-2 py-1 border-gray-500 border-2 rounded-sm bg-white hover:bg-gray-200 transition-colors"
        />
    );
}
