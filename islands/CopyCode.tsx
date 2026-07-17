import { useRef } from "preact/hooks";

export interface CopyCodeProps {
    text: string;
}

export default function CopyCode({ text }: CopyCodeProps) {
    const codeRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const initialText = "Copy code";
    const copiedText = "Copied!";

    return (
        <>
            <pre>
                <code
                    ref={codeRef}
                    style="overflow-x: auto; background: var(--foreground-color); display: block; margin: 8px; padding: 8px; border: 2px white solid; border-radius: 8px;"
                >
                    {text}
                </code>
            </pre>
            <button
                ref={buttonRef}
                type="button"
                onClick={function copyCode() {
                    if (!codeRef.current) return;

                    // deno-lint-ignore no-window
                    const selection = window.getSelection();
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
                }}
            >
                Copy code
            </button>
        </>
    );
}
