import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>About page</title>
            </Head>
            <div id="hero">
                <h1>About us</h1>
            </div>
            <main>
                <h2>Our History</h2>
                <h3>We are termites in human bodies</h3>
                <h2>The <s>freaks</s> normal people</h2>
                <p>Cappa</p>
                <p>Hamuel</p>
                <p>Michael</p>
                <p>Noah Dixon</p>
            </main>
        </>
    );
});
