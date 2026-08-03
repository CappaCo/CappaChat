interface PlusButtonProps {
    id: string;
    onClick?: () => void;
}

export function PlusButton(
    { id, onClick }: PlusButtonProps,
) {
    return (
        <svg class="plus-button" id={id} onClick={onClick}>
            
        </svg>
    );
}
