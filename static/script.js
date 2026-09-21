document.addEventListener("DOMContentLoaded", function () {

    const cpuSelect = document.getElementById("cpu");
    const moederbordSelect = document.getElementById("moederbord");
    const ramSelect = document.getElementById("ram");

    const gpuSelect = document.getElementById("gpu");
    const voedingSelect = document.getElementById("voeding");
    const behuizingSelect = document.getElementById("behuizing");


    // ==========================================
    // CPU -> MOEDERBORD
    // ==========================================

    function filterMoederborden() {

        const gekozenCpu =
            cpuSelect.options[cpuSelect.selectedIndex];

        if (!gekozenCpu || gekozenCpu.value === "") {
            return;
        }

        const cpuSocket =
            gekozenCpu.dataset.socket;

        for (let i = 0; i < moederbordSelect.options.length; i++) {

            const optie =
                moederbordSelect.options[i];

            if (optie.value === "") {
                optie.hidden = false;
                optie.disabled = false;
                continue;
            }

            const moederbordSocket =
                optie.dataset.socket;

            if (moederbordSocket === cpuSocket) {
                optie.hidden = false;
                optie.disabled = false;
            } else {
                optie.hidden = true;
                optie.disabled = true;
            }
        }

        moederbordSelect.value = "";

        filterRam();
    }


    // ==========================================
    // MOEDERBORD -> RAM
    // ==========================================

    function filterRam() {

        const gekozenMoederbord =
            moederbordSelect.options[
                moederbordSelect.selectedIndex
            ];

        if (
            !gekozenMoederbord ||
            gekozenMoederbord.value === ""
        ) {

            for (
                let i = 0;
                i < ramSelect.options.length;
                i++
            ) {

                const optie =
                    ramSelect.options[i];

                optie.hidden = false;
                optie.disabled = false;
            }

            ramSelect.value = "";

            return;
        }

        const ramType =
            gekozenMoederbord.dataset.ramType;

        for (
            let i = 0;
            i < ramSelect.options.length;
            i++
        ) {

            const optie =
                ramSelect.options[i];

            if (optie.value === "") {
                optie.hidden = false;
                optie.disabled = false;
                continue;
            }

            const optieRamType =
                optie.dataset.ramType;

            if (optieRamType === ramType) {
                optie.hidden = false;
                optie.disabled = false;
            } else {
                optie.hidden = true;
                optie.disabled = true;
            }
        }

        ramSelect.value = "";
    }


    // ==========================================
    // GPU -> VOEDING
    // ==========================================

    function filterVoeding() {

        const gekozenGpu =
            gpuSelect.options[gpuSelect.selectedIndex];

        if (!gekozenGpu || gekozenGpu.value === "") {
            return;
        }

        const minimaleVoeding =
            Number(gekozenGpu.dataset.minVoeding);

        for (
            let i = 0;
            i < voedingSelect.options.length;
            i++
        ) {

            const optie =
                voedingSelect.options[i];

            if (optie.value === "") {
                optie.hidden = false;
                optie.disabled = false;
                continue;
            }

            const wattage =
                Number(optie.dataset.wattage);

            if (wattage >= minimaleVoeding) {
                optie.hidden = false;
                optie.disabled = false;
            } else {
                optie.hidden = true;
                optie.disabled = true;
            }
        }

        voedingSelect.value = "";
    }


    // ==========================================
    // GPU -> BEHUIZING
    // ==========================================

    function filterBehuizing() {

        const gekozenGpu =
            gpuSelect.options[gpuSelect.selectedIndex];

        if (!gekozenGpu || gekozenGpu.value === "") {
            return;
        }

        const gpuLengte =
            Number(gekozenGpu.dataset.lengte);

        for (
            let i = 0;
            i < behuizingSelect.options.length;
            i++
        ) {

            const optie =
                behuizingSelect.options[i];

            if (optie.value === "") {
                optie.hidden = false;
                optie.disabled = false;
                continue;
            }

            const maximaleLengte =
                Number(optie.dataset.maxGpuLengte);

            if (maximaleLengte >= gpuLengte) {
                optie.hidden = false;
                optie.disabled = false;
            } else {
                optie.hidden = true;
                optie.disabled = true;
            }
        }

        behuizingSelect.value = "";
    }


    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    if (cpuSelect) {
        cpuSelect.addEventListener("change", function () {
            filterMoederborden();
        });
    }

    if (moederbordSelect) {
        moederbordSelect.addEventListener("change", function () {
            filterRam();
        });
    }

    if (gpuSelect) {
        gpuSelect.addEventListener("change", function () {
            filterVoeding();
            filterBehuizing();
        });
    }


    // ==========================================
    // BUILD OPSLAAN
    // ==========================================

    const saveBuildButton =
        document.getElementById("saveBuildButton");

    const saveMessage =
        document.getElementById("saveMessage");


    function getCurrentBuild() {

        return {

            cpu: cpuSelect ? cpuSelect.value : "",

            gpu: gpuSelect ? gpuSelect.value : "",

            moederbord:
                moederbordSelect
                    ? moederbordSelect.value
                    : "",

            ram:
                ramSelect
                    ? ramSelect.value
                    : "",

            ssd:
                document.querySelector(
                    'select[name="ssd"]'
                )?.value || "",

            voeding:
                voedingSelect
                    ? voedingSelect.value
                    : "",

            behuizing:
                behuizingSelect
                    ? behuizingSelect.value
                    : "",

            budget:
                document.querySelector(
                    'input[name="budget"]'
                )?.value || "",

            datum:
                new Date().toLocaleString("nl-NL")
        };
    }


    function getSavedBuilds() {

        const builds =
            localStorage.getItem("pcBuilderBuilds");

        if (!builds) {
            return [];
        }

        try {
            return JSON.parse(builds);
        } catch (error) {

            console.error(
                "Opgeslagen builds konden niet worden gelezen:",
                error
            );

            return [];
        }
    }


    function saveBuild() {

        const build =
            getCurrentBuild();

        const builds =
            getSavedBuilds();

        builds.push(build);

        localStorage.setItem(
            "pcBuilderBuilds",
            JSON.stringify(builds)
        );

        if (saveMessage) {

            saveMessage.textContent =
                "✅ Je build is opgeslagen!";

            saveMessage.className =
                "save-message success";
        }

        showSavedBuilds();
    }


    if (saveBuildButton) {

        saveBuildButton.addEventListener(
            "click",
            saveBuild
        );
    }


    // ==========================================
    // OPGESLAGEN BUILDS TONEN
    // ==========================================

    const savedBuildsContainer =
        document.getElementById("savedBuilds");


    function showSavedBuilds() {

        if (!savedBuildsContainer) {
            return;
        }

        const builds =
            getSavedBuilds();

        savedBuildsContainer.innerHTML = "";

        if (builds.length === 0) {

            const emptyMessage =
                document.createElement("div");

            emptyMessage.className =
                "saved-build-empty";

            emptyMessage.textContent =
                "📂 Je hebt nog geen builds opgeslagen.";

            savedBuildsContainer.appendChild(
                emptyMessage
            );

            return;
        }


        builds.forEach(function (build, index) {

            const buildCard =
                document.createElement("div");

            buildCard.className =
                "saved-build-card";


            const title =
                document.createElement("strong");

            title.textContent =
                "🖥️ PC Build " + (index + 1);


            const date =
                document.createElement("small");

            date.textContent =
                "Opgeslagen op: " + build.datum;


            const parts =
                document.createElement("div");

            parts.className =
                "saved-build-parts";


            parts.innerHTML =
                "<span>🧠 " +
                escapeHtml(build.cpu) +
                "</span>" +

                "<span>🎮 " +
                escapeHtml(build.gpu) +
                "</span>" +

                "<span>🧩 " +
                escapeHtml(build.moederbord) +
                "</span>" +

                "<span>🧠 " +
                escapeHtml(build.ram) +
                "</span>" +

                "<span>💾 " +
                escapeHtml(build.ssd) +
                "</span>" +

                "<span>🔌 " +
                escapeHtml(build.voeding) +
                "</span>" +

                "<span>🖥️ " +
                escapeHtml(build.behuizing) +
                "</span>";


            if (build.budget) {

                const budget =
                    document.createElement("span");

                budget.textContent =
                    "💰 Budget: €" +
                    build.budget;

                parts.appendChild(budget);
            }


            const actions =
                document.createElement("div");

            actions.className =
                "saved-build-actions";


            const loadButton =
                document.createElement("button");

            loadButton.type =
                "button";

            loadButton.className =
                "load-build-button";

            loadButton.textContent =
                "🔄 Deze build gebruiken";


            loadButton.addEventListener(
                "click",
                function () {
                    loadBuild(build);
                }
            );


            const deleteButton =
                document.createElement("button");

            deleteButton.type =
                "button";

            deleteButton.className =
                "delete-build-button";

            deleteButton.textContent =
                "🗑️ Verwijderen";


            deleteButton.addEventListener(
                "click",
                function () {
                    deleteBuild(index);
                }
            );


            actions.appendChild(loadButton);
            actions.appendChild(deleteButton);

            buildCard.appendChild(title);
            buildCard.appendChild(date);
            buildCard.appendChild(parts);
            buildCard.appendChild(actions);

            savedBuildsContainer.appendChild(
                buildCard
            );
        });
    }


    // ==========================================
    // BUILD LADEN
    // ==========================================

    function loadBuild(build) {

        if (cpuSelect) {
            cpuSelect.value = build.cpu;
        }

        if (moederbordSelect) {

            filterMoederbordenWithoutReset();

            moederbordSelect.value =
                build.moederbord;
        }

        if (ramSelect) {

            filterRamWithoutReset();

            ramSelect.value =
                build.ram;
        }

        if (gpuSelect) {
            gpuSelect.value = build.gpu;
        }

        if (voedingSelect) {

            filterVoedingWithoutReset();

            voedingSelect.value =
                build.voeding;
        }

        if (behuizingSelect) {

            filterBehuizingWithoutReset();

            behuizingSelect.value =
                build.behuizing;
        }

        const ssdSelect =
            document.querySelector(
                'select[name="ssd"]'
            );

        if (ssdSelect) {
            ssdSelect.value = build.ssd;
        }

        const budgetInput =
            document.querySelector(
                'input[name="budget"]'
            );

        if (budgetInput) {
            budgetInput.value = build.budget;
        }

        if (saveMessage) {

            saveMessage.textContent =
                "✅ Build geladen!";

            saveMessage.className =
                "save-message success";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==========================================
    // FILTERS ZONDER SELECTIE TE WISSEN
    // ==========================================

    function filterMoederbordenWithoutReset() {

        if (!cpuSelect || !moederbordSelect) {
            return;
        }

        const gekozenCpu =
            cpuSelect.options[
                cpuSelect.selectedIndex
            ];

        if (!gekozenCpu || gekozenCpu.value === "") {
            return;
        }

        const cpuSocket =
            gekozenCpu.dataset.socket;

        for (
            let i = 0;
            i < moederbordSelect.options.length;
            i++
        ) {

            const optie =
                moederbordSelect.options[i];

            if (optie.value === "") {
                continue;
            }

            if (
                optie.dataset.socket ===
                cpuSocket
            ) {

                optie.hidden = false;
                optie.disabled = false;

            } else {

                optie.hidden = true;
                optie.disabled = true;
            }
        }
    }


    function filterRamWithoutReset() {

        if (!moederbordSelect || !ramSelect) {
            return;
        }

        const gekozenMoederbord =
            moederbordSelect.options[
                moederbordSelect.selectedIndex
            ];

        if (
            !gekozenMoederbord ||
            gekozenMoederbord.value === ""
        ) {
            return;
        }

        const ramType =
            gekozenMoederbord.dataset.ramType;

        for (
            let i = 0;
            i < ramSelect.options.length;
            i++
        ) {

            const optie =
                ramSelect.options[i];

            if (optie.value === "") {
                continue;
            }

            if (
                optie.dataset.ramType ===
                ramType
            ) {

                optie.hidden = false;
                optie.disabled = false;

            } else {

                optie.hidden = true;
                optie.disabled = true;
            }
        }
    }


    function filterVoedingWithoutReset() {

        if (!gpuSelect || !voedingSelect) {
            return;
        }

        const gekozenGpu =
            gpuSelect.options[
                gpuSelect.selectedIndex
            ];

        if (!gekozenGpu || gekozenGpu.value === "") {
            return;
        }

        const minimaleVoeding =
            Number(
                gekozenGpu.dataset.minVoeding
            );

        for (
            let i = 0;
            i < voedingSelect.options.length;
            i++
        ) {

            const optie =
                voedingSelect.options[i];

            if (optie.value === "") {
                continue;
            }

            const wattage =
                Number(optie.dataset.wattage);

            if (wattage >= minimaleVoeding) {

                optie.hidden = false;
                optie.disabled = false;

            } else {

                optie.hidden = true;
                optie.disabled = true;
            }
        }
    }


    function filterBehuizingWithoutReset() {

        if (!gpuSelect || !behuizingSelect) {
            return;
        }

        const gekozenGpu =
            gpuSelect.options[
                gpuSelect.selectedIndex
            ];

        if (!gekozenGpu || gekozenGpu.value === "") {
            return;
        }

        const gpuLengte =
            Number(
                gekozenGpu.dataset.lengte
            );

        for (
            let i = 0;
            i < behuizingSelect.options.length;
            i++
        ) {

            const optie =
                behuizingSelect.options[i];

            if (optie.value === "") {
                continue;
            }

            const maximaleLengte =
                Number(
                    optie.dataset.maxGpuLengte
                );

            if (maximaleLengte >= gpuLengte) {

                optie.hidden = false;
                optie.disabled = false;

            } else {

                optie.hidden = true;
                optie.disabled = true;
            }
        }
    }


    // ==========================================
    // BUILD VERWIJDEREN
    // ==========================================

    function deleteBuild(index) {

        const builds =
            getSavedBuilds();

        builds.splice(index, 1);

        localStorage.setItem(
            "pcBuilderBuilds",
            JSON.stringify(builds)
        );

        showSavedBuilds();

        if (saveMessage) {

            saveMessage.textContent =
                "🗑️ Build verwijderd.";

            saveMessage.className =
                "save-message success";
        }
    }


    // ==========================================
    // VEILIG TEKST IN HTML ZETTEN
    // ==========================================

    function escapeHtml(text) {

        if (!text) {
            return "";
        }

        return String(text)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    // ==========================================
    // PRESETS
    // ==========================================

    function selectOption(select, value) {

        if (!select) {
            return false;
        }

        for (
            let i = 0;
            i < select.options.length;
            i++
        ) {

            if (
                select.options[i].value ===
                value
            ) {

                select.selectedIndex = i;

                return true;
            }
        }

        return false;
    }


    function applyPreset(preset) {

        if (preset === "budget") {

            selectOption(
                cpuSelect,
                "AMD Ryzen 5 3600"
            );

            filterMoederbordenWithoutReset();

            selectOption(
                moederbordSelect,
                "MSI B450 Gaming Plus"
            );

            filterRamWithoutReset();

            selectOption(
                ramSelect,
                "Kingston Fury 16GB DDR4 3200MHz"
            );

            selectOption(
                gpuSelect,
                "Sapphire Radeon RX 6600"
            );

            filterVoedingWithoutReset();

            selectOption(
                voedingSelect,
                "be quiet! System Power 10 450W"
            );

            filterBehuizingWithoutReset();

            selectOption(
                behuizingSelect,
                "Cooler Master MasterBox Q300L"
            );

            selectOption(
                document.querySelector(
                    'select[name="ssd"]'
                ),
                "Kingston 500GB SATA SSD"
            );
        }


        if (preset === "gaming") {

            selectOption(
                cpuSelect,
                "AMD Ryzen 5 7600"
            );

            filterMoederbordenWithoutReset();

            selectOption(
                moederbordSelect,
                "Gigabyte B650 Eagle AX"
            );

            filterRamWithoutReset();

            selectOption(
                ramSelect,
                "G.Skill Flare X5 32GB DDR5 6000MHz"
            );

            selectOption(
                gpuSelect,
                "Gigabyte GeForce RTX 4070"
            );

            filterVoedingWithoutReset();

            selectOption(
                voedingSelect,
                "be quiet! Pure Power 12 M 650W"
            );

            filterBehuizingWithoutReset();

            selectOption(
                behuizingSelect,
                "NZXT H5 Flow"
            );

            selectOption(
                document.querySelector(
                    'select[name="ssd"]'
                ),
                "Samsung 1TB 990 EVO NVMe"
            );
        }


        if (preset === "high-end") {

            selectOption(
                cpuSelect,
                "AMD Ryzen 7 7800X3D"
            );

            filterMoederbordenWithoutReset();

            selectOption(
                moederbordSelect,
                "ASUS TUF Gaming B650-Plus"
            );

            filterRamWithoutReset();

            selectOption(
                ramSelect,
                "Crucial Pro 64GB DDR5 6000MHz"
            );

            selectOption(
                gpuSelect,
                "MSI GeForce RTX 4080 Super"
            );

            filterVoedingWithoutReset();

            selectOption(
                voedingSelect,
                "Corsair RM1000e 1000W"
            );

            filterBehuizingWithoutReset();

            selectOption(
                behuizingSelect,
                "Corsair 5000D Airflow"
            );

            selectOption(
                document.querySelector(
                    'select[name="ssd"]'
                ),
                "Samsung 2TB 990 EVO NVMe"
            );
        }


        // Huidige totaalprijzen van de presets
        const presetBudget =
            document.querySelector(
                'input[name="budget"]'
            );

        if (presetBudget) {

            if (preset === "budget") {
                presetBudget.value = "750";
            }

            if (preset === "gaming") {
                presetBudget.value = "1850";
            }

            if (preset === "high-end") {
                presetBudget.value = "3100";
            }
        }


        if (saveMessage) {

            saveMessage.textContent =
                "⭐ " +
                getPresetName(preset) +
                " preset geladen!";

            saveMessage.className =
                "save-message success";
        }
    }


    function getPresetName(preset) {

        if (preset === "budget") {
            return "Budget";
        }

        if (preset === "gaming") {
            return "Gaming";
        }

        if (preset === "high-end") {
            return "High-end";
        }

        return "PC";
    }


    // ==========================================
    // PRESET KNOPPEN
    // ==========================================

    const presetButtons =
        document.querySelectorAll(
            "[data-preset]"
        );

    presetButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                applyPreset(
                    button.dataset.preset
                );
            }
        );
    });


    // ==========================================
    // OPGESLAGEN BUILDS BIJ START LADEN
    // ==========================================

    showSavedBuilds();

});