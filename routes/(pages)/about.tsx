import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>About page</title>
            </Head>
            <div id="hero">
                <h1>About us</h1>
            </div>
            <main id="about-page">
                <div class="history-section">
                    <h1>Our History</h1>
                    <p>We are termites in human bodies</p>
                </div>
                <div class="dev-section">
                    <h1>
                        The <s>freaks</s> normal people
                    </h1>
                    <p>Cappa</p>
                    <p>Hamuel</p>
                    <p>Michael</p>
                    <p>Noah Dixon</p>
                </div>
            </main>
        </>
    );
});
