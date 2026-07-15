import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>Home page</title>
            </Head>

            <div id="hero">
                <h1>Welcome to Cappachat</h1>
                <h2>The customisable, user first chat app</h2>
            </div>

            <main id="index-page">
                <h1>Main page</h1>
                <div class="index-grid-container">
                    <div class="index-grid-item one">
                        <h2>We make cool website</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque quis felis quis magna cursus
                            iaculis. Nullam eget felis quis ex ultrices eleifend
                            eget ut arcu. Quisque ex eros, tincidunt non sodales
                            ac, fermentum nec velit. Integer pellentesque
                            vestibulum risus, quis tempor odio dapibus nec. Duis
                            ac ipsum blandit, laoreet diam quis, vulputate
                            ligula. Morbi dapibus commodo ipsum at faucibus.
                            Aenean eu cursus nisi, placerat efficitur elit. Duis
                            vitae ipsum sit amet mauris interdum accumsan id ut
                            enim. Nulla rutrum enim sed urna semper tincidunt.
                            Maecenas egestas purus mauris, non finibus lectus
                            condimentum quis Mauris eget pharetra mi. Nunc
                            ultrices auctor elit, eget tristique urna euismod
                            eget. Proin vitae tincidunt mauris. Sed vitae luctus
                            augue, at placerat mi. Quisque posuere condimentum
                            nisl, vel facilisis dolor mattis eu.
                        </p>
                    </div>
                    <div class="index-grid-item two">
                        <h2>We make cooler website</h2>
                        <p>
                            Orci varius natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Nulla
                            facilisi. Cras consectetur nunc vel dui eleifend
                            luctus. Curabitur cursus dapibus nulla, nec
                            facilisis nisl fringilla quis. Nulla lacinia lorem
                            lorem, a porta est molestie vitae. Phasellus varius
                            nisl nunc, sit amet elementum sem posuere ut.
                            Phasellus in nisl nisl. Sed et finibus nisi. Nunc
                            luctus orci eu ullamcorper imperdiet. Vivamus et
                            nisi at tellus scelerisque venenatis. Phasellus
                            viverra dolor non sem rhoncus, eget consectetur
                            magna ullamcorper.
                        </p>
                    </div>
                    <div class="index-grid-item-big">
                        <h2>We make coolest website</h2>
                        <p>
                            Maecenas libero velit, vulputate at pulvinar a,
                            convallis sed dui. Nunc non ullamcorper nisi. Donec
                            ut aliquet nulla, at porta nunc. Nullam sit amet
                            tristique justo. Phasellus ipsum lectus, tempor id
                            blandit ac, luctus quis est. Vestibulum egestas
                            malesuada est, vel consequat felis efficitur sit
                            amet. Nunc nisl neque, consequat at ipsum at,
                            vulputate sollicitudin tellus. Nam dignissim aliquet
                            sem, vel tincidunt turpis. Duis elementum diam at
                            mauris convallis, a semper turpis vestibulum. Proin
                            aliquam ex vitae quam dapibus, sodales tincidunt
                            lacus dapibus. Nam vel augue iaculis, tincidunt
                            lectus quis, egestas neque. Proin velit turpis,
                            auctor nec nisl sit amet, fermentum semper augue.
                            Phasellus sollicitudin arcu enim, a tristique quam
                            aliquam ac. Aenean consequat pellentesque arcu,
                            eleifend imperdiet elit tincidunt et. Nam vestibulum
                            dui ac urna dapibus, a molestie augue sollicitudin.
                            Integer mi velit, viverra eget fermentum at, posuere
                            id diam.
                        </p>
                        <p>
                            Maecenas sed feugiat eros. Nulla nunc metus,
                            venenatis sed lorem eu, posuere faucibus nisl.
                            Maecenas venenatis justo vitae arcu condimentum
                            molestie. Mauris aliquam varius risus, eget pretium
                            est vestibulum at. In dui felis, bibendum eu est eu,
                            maximus finibus lorem. Praesent quis lectus tempus,
                            pretium massa fermentum, lobortis nulla. Mauris et
                            eleifend ex.
                        </p>
                        <img src="fuelweaver.jfif" />
                    </div>
                </div>

                <section>
                    <p>Insert FAQ here</p>
                </section>
            </main>
        </>
    );
});
