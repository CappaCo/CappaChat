import { useSignal } from "@preact/signals";

export default function AdminAuth() {
    const resultText = useSignal("loading js...");

    resultText.value = "waiting for input...";

    function handleSubmit(event: Event) {
        event.preventDefault();

        resultText.value = "sending auth request to server...";

        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        fetch("/api/adminAuth", {
            method: "POST",
            body: formData,
        }).then(async (response) => {
            resultText.value = "got response...";

            const json = await response.json();
            resultText.value = `response: ${json.message}`;

            if (response.ok) location.reload();
        }).catch((reason) => {
            console.log("reason:", reason);
            resultText.value = `failed with reason: ${reason}`;
        });
    }

    return (
        <>
            <h1>Admin login</h1>

            <form onSubmit={handleSubmit} action="/api/adminAuth" method="POST">
                <input
                    type="text"
                    name="key"
                    placeholder="enter the key"
                />
                <input type="submit" value="turn the key" />
            </form>

            <span>{resultText}</span>
        </>
    );
}
