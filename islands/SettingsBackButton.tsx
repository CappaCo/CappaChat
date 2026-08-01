export default function SettingsBackButton() {
    return (
        <a
            class="back-button"
            type="button"
            href="/app"
            aria-label="return to CappaChat"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                width="48px"
                viewBox="0 -960 960 960"
                fill="#FFFFFF"
            >
                <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
            </svg>
        </a>
    );
}
