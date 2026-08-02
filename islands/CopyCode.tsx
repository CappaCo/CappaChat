import { useRef } from "preact/hooks";

export default function CopyCode({ text }: { text: string }) {
    const codeRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const initialText = "Copy code";
    const copiedText = "Copied!";

    function copyCode() {
        if (!codeRef.current) return;

        const selection = globalThis.getSelection();
        const range = document.createRange();

        range.selectNodeContents(codeRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);

        navigator.clipboard.writeText(codeRef.current.innerText)
            .then(function showCopiedText() {
                if (!buttonRef.current) return;

                buttonRef.current.innerText = copiedText;
                setTimeout(function resetButtonText() {
                    if (!buttonRef.current) return;

                    buttonRef.current.innerText = initialText;
                }, 1000);
            });
    }

    return (
        <>
            <pre>
                <code ref={codeRef}>
                    {text}
                </code>
            </pre>
            <button
                ref={buttonRef}
                type="button"
                onClick={copyCode}
            >
                Copy code
            </button>
        </>
    );
}
