interface SamSwitchProps {
    id: string;
    name?: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}

export function SamSwitch(
    { id, name, checked, onChange, disabled }: SamSwitchProps,
) {
    return (
        <div class="sam-switch">
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(event) => onChange?.(event.currentTarget.checked)}
            />
            <label for={id}>
                <div class="sam-switch-slider"></div>
            </label>
        </div>
    );
}
