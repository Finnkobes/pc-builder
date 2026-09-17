from flask import Flask, render_template, request

app = Flask(__name__)

onderdelen = {
    "cpu": [
        {"naam": "AMD Ryzen 5 3600", "prijs": 70.00, "socket": "AM4"},
        {"naam": "AMD Ryzen 5 5600", "prijs": 120.00, "socket": "AM4"},
        {"naam": "AMD Ryzen 7 5700X", "prijs": 170.00, "socket": "AM4"},
        {"naam": "AMD Ryzen 7 5800X3D", "prijs": 300.00, "socket": "AM4"},
        {"naam": "AMD Ryzen 5 7600", "prijs": 210.00, "socket": "AM5"},
        {"naam": "AMD Ryzen 7 7700", "prijs": 290.00, "socket": "AM5"},
        {"naam": "AMD Ryzen 7 7800X3D", "prijs": 400.00, "socket": "AM5"},
        {"naam": "Intel Core i5-12400F", "prijs": 130.00, "socket": "LGA1700"},
        {"naam": "Intel Core i5-13400F", "prijs": 180.00, "socket": "LGA1700"},
        {"naam": "Intel Core i5-14600K", "prijs": 290.00, "socket": "LGA1700"}
    ],

    "gpu": [
        {"naam": "Sapphire Radeon RX 6600", "prijs": 190.00, "min_voeding": 450, "lengte": 193},
        {"naam": "ASUS GeForce RTX 4060", "prijs": 300.00, "min_voeding": 550, "lengte": 227},
        {"naam": "XFX Radeon RX 6650 XT", "prijs": 250.00, "min_voeding": 500, "lengte": 243},
        {"naam": "MSI GeForce RTX 4060 Ti", "prijs": 370.00, "min_voeding": 550, "lengte": 307},
        {"naam": "Sapphire Radeon RX 7600", "prijs": 280.00, "min_voeding": 550, "lengte": 240},
        {"naam": "ASRock Intel Arc A750", "prijs": 230.00, "min_voeding": 600, "lengte": 305},
        {"naam": "Gigabyte GeForce RTX 4070", "prijs": 500.00, "min_voeding": 650, "lengte": 300},
        {"naam": "PowerColor Radeon RX 7700 XT", "prijs": 450.00, "min_voeding": 700, "lengte": 320},
        {"naam": "ASUS GeForce RTX 4070 Super", "prijs": 600.00, "min_voeding": 650, "lengte": 310},
        {"naam": "Sapphire Radeon RX 7800 XT", "prijs": 500.00, "min_voeding": 700, "lengte": 320},
        {"naam": "Sparkle Intel Arc A770", "prijs": 300.00, "min_voeding": 600, "lengte": 305},
        {"naam": "MSI GeForce RTX 4080 Super", "prijs": 1000.00, "min_voeding": 750, "lengte": 322}
    ],

    "moederbord": [
        {"naam": "MSI B450 Gaming Plus", "prijs": 90.00, "socket": "AM4", "ram_type": "DDR4"},
        {"naam": "ASUS TUF Gaming B550-Plus", "prijs": 120.00, "socket": "AM4", "ram_type": "DDR4"},
        {"naam": "Gigabyte B550 AORUS Elite V2", "prijs": 130.00, "socket": "AM4", "ram_type": "DDR4"},
        {"naam": "MSI B650 Gaming Plus WIFI", "prijs": 160.00, "socket": "AM5", "ram_type": "DDR5"},
        {"naam": "ASUS TUF Gaming B650-Plus", "prijs": 190.00, "socket": "AM5", "ram_type": "DDR5"},
        {"naam": "Gigabyte B650 Eagle AX", "prijs": 160.00, "socket": "AM5", "ram_type": "DDR5"},
        {"naam": "ASRock B650M Pro RS", "prijs": 140.00, "socket": "AM5", "ram_type": "DDR5"},
        {"naam": "MSI PRO B760-P WIFI", "prijs": 180.00, "socket": "LGA1700", "ram_type": "DDR5"},
        {"naam": "ASUS TUF Gaming B760-Plus WIFI", "prijs": 200.00, "socket": "LGA1700", "ram_type": "DDR5"},
        {"naam": "Gigabyte B760 Gaming X DDR4", "prijs": 160.00, "socket": "LGA1700", "ram_type": "DDR4"}
    ],

    "ram": [
        {"naam": "Kingston Fury 16GB DDR4 3200MHz", "prijs": 45.00, "ram_type": "DDR4"},
        {"naam": "Corsair Vengeance 16GB DDR4 3200MHz", "prijs": 50.00, "ram_type": "DDR4"},
        {"naam": "Crucial 32GB DDR4 3200MHz", "prijs": 70.00, "ram_type": "DDR4"},
        {"naam": "G.Skill Ripjaws 32GB DDR4 3600MHz", "prijs": 80.00, "ram_type": "DDR4"},
        {"naam": "Kingston Fury 16GB DDR5 5600MHz", "prijs": 60.00, "ram_type": "DDR5"},
        {"naam": "Corsair Vengeance 32GB DDR5 5600MHz", "prijs": 100.00, "ram_type": "DDR5"},
        {"naam": "G.Skill Flare X5 32GB DDR5 6000MHz", "prijs": 110.00, "ram_type": "DDR5"},
        {"naam": "Crucial Pro 64GB DDR5 6000MHz", "prijs": 200.00, "ram_type": "DDR5"}
    ],

    "ssd": [
        {"naam": "Kingston 500GB SATA SSD", "prijs": 35.00},
        {"naam": "Crucial 1TB SATA SSD", "prijs": 55.00},
        {"naam": "Samsung 1TB 990 EVO NVMe", "prijs": 80.00},
        {"naam": "WD Blue 1TB NVMe SSD", "prijs": 70.00},
        {"naam": "Kingston 2TB NVMe SSD", "prijs": 110.00},
        {"naam": "Samsung 2TB 990 EVO NVMe", "prijs": 140.00},
        {"naam": "Crucial 4TB NVMe SSD", "prijs": 250.00}
    ],

    "voeding": [
        {"naam": "be quiet! System Power 10 450W", "prijs": 50.00, "wattage": 450},
        {"naam": "Corsair CX550 550W", "prijs": 60.00, "wattage": 550},
        {"naam": "Cooler Master MWE 650 Bronze", "prijs": 70.00, "wattage": 650},
        {"naam": "be quiet! Pure Power 12 M 650W", "prijs": 90.00, "wattage": 650},
        {"naam": "Corsair RM750e 750W", "prijs": 100.00, "wattage": 750},
        {"naam": "Seasonic Focus GX 850W", "prijs": 120.00, "wattage": 850},
        {"naam": "Corsair RM1000e 1000W", "prijs": 160.00, "wattage": 1000}
    ],

    "behuizing": [
        {"naam": "Cooler Master MasterBox Q300L", "prijs": 50.00, "max_gpu_lengte": 360},
        {"naam": "DeepCool CC560", "prijs": 60.00, "max_gpu_lengte": 370},
        {"naam": "NZXT H5 Flow", "prijs": 90.00, "max_gpu_lengte": 365},
        {"naam": "Corsair 4000D Airflow", "prijs": 95.00, "max_gpu_lengte": 360},
        {"naam": "Fractal Design Pop Air", "prijs": 90.00, "max_gpu_lengte": 405},
        {"naam": "Lian Li Lancool 216", "prijs": 110.00, "max_gpu_lengte": 392},
        {"naam": "NZXT H7 Flow", "prijs": 130.00, "max_gpu_lengte": 400},
        {"naam": "Corsair 5000D Airflow", "prijs": 150.00, "max_gpu_lengte": 420},
        {"naam": "Fractal Design North", "prijs": 140.00, "max_gpu_lengte": 355}
    ]
}


@app.route("/")
def home():

    geselecteerd = {
        "cpu": request.args.get("cpu", ""),
        "gpu": request.args.get("gpu", ""),
        "moederbord": request.args.get("moederbord", ""),
        "ram": request.args.get("ram", ""),
        "ssd": request.args.get("ssd", ""),
        "voeding": request.args.get("voeding", ""),
        "behuizing": request.args.get("behuizing", "")
    }

    budget = request.args.get("budget", "")

    return render_template(
        "index.html",
        onderdelen=onderdelen,
        geselecteerd=geselecteerd,
        budget=budget
    )


@app.route("/build", methods=["POST"])
def build():

    keuzes = {
        "cpu": request.form.get("cpu"),
        "gpu": request.form.get("gpu"),
        "moederbord": request.form.get("moederbord"),
        "ram": request.form.get("ram"),
        "ssd": request.form.get("ssd"),
        "voeding": request.form.get("voeding"),
        "behuizing": request.form.get("behuizing")
    }

    namen = {
        "cpu": "Processor",
        "gpu": "Videokaart",
        "moederbord": "Moederbord",
        "ram": "RAM",
        "ssd": "Opslag",
        "voeding": "Voeding",
        "behuizing": "Behuizing"
    }

    ontbrekende_onderdelen = []

    for categorie, gekozen_naam in keuzes.items():

        if not gekozen_naam:
            ontbrekende_onderdelen.append(namen[categorie])

    if ontbrekende_onderdelen:

        return render_template(
            "build.html",
            foutmelding=True,
            fouttitel="Je build is nog niet compleet",
            fouttekst="Je moet eerst alle onderdelen kiezen voordat je de PC kunt samenstellen.",
            ontbrekende_onderdelen=ontbrekende_onderdelen
        )

    budget_input = request.form.get("budget")

    budget = None

    if budget_input and budget_input.strip():

        try:

            budget = float(budget_input)

            if budget <= 0:

                return render_template(
                    "build.html",
                    foutmelding=True,
                    fouttitel="Ongeldig budget",
                    fouttekst="Je budget moet een bedrag boven €0 zijn."
                )

        except ValueError:

            return render_template(
                "build.html",
                foutmelding=True,
                fouttitel="Ongeldig budget",
                fouttekst="Vul een geldig bedrag in, bijvoorbeeld 1000."
            )

    prijzen = {}

    for categorie, gekozen_naam in keuzes.items():

        for onderdeel in onderdelen[categorie]:

            if onderdeel["naam"] == gekozen_naam:

                prijzen[categorie] = onderdeel["prijs"]
                break

    totaalprijs = sum(prijzen.values())

    if budget is not None:

        binnen_budget = totaalprijs <= budget
        verschil_budget = budget - totaalprijs

    else:

        binnen_budget = None
        verschil_budget = None

    gekozen_cpu = None
    gekozen_gpu = None
    gekozen_moederbord = None
    gekozen_ram = None
    gekozen_voeding = None
    gekozen_behuizing = None

    for cpu in onderdelen["cpu"]:

        if cpu["naam"] == keuzes["cpu"]:
            gekozen_cpu = cpu
            break

    for gpu in onderdelen["gpu"]:

        if gpu["naam"] == keuzes["gpu"]:
            gekozen_gpu = gpu
            break

    for moederbord in onderdelen["moederbord"]:

        if moederbord["naam"] == keuzes["moederbord"]:
            gekozen_moederbord = moederbord
            break

    for ram in onderdelen["ram"]:

        if ram["naam"] == keuzes["ram"]:
            gekozen_ram = ram
            break

    for voeding in onderdelen["voeding"]:

        if voeding["naam"] == keuzes["voeding"]:
            gekozen_voeding = voeding
            break

    for behuizing in onderdelen["behuizing"]:

        if behuizing["naam"] == keuzes["behuizing"]:
            gekozen_behuizing = behuizing
            break

    cpu_compatibel = True

    if gekozen_cpu and gekozen_moederbord:

        if gekozen_cpu["socket"] != gekozen_moederbord["socket"]:
            cpu_compatibel = False

    ram_compatibel = True

    if gekozen_ram and gekozen_moederbord:

        if gekozen_ram["ram_type"] != gekozen_moederbord["ram_type"]:
            ram_compatibel = False

    voeding_compatibel = True

    if gekozen_gpu and gekozen_voeding:

        if gekozen_voeding["wattage"] < gekozen_gpu["min_voeding"]:
            voeding_compatibel = False

    gpu_compatibel = True

    if gekozen_gpu and gekozen_behuizing:

        if gekozen_gpu["lengte"] > gekozen_behuizing["max_gpu_lengte"]:
            gpu_compatibel = False

    alles_compatibel = (
        cpu_compatibel
        and ram_compatibel
        and voeding_compatibel
        and gpu_compatibel
    )

    return render_template(
        "build.html",
        foutmelding=False,
        keuzes=keuzes,
        prijzen=prijzen,
        totaalprijs=totaalprijs,
        budget=budget,
        binnen_budget=binnen_budget,
        verschil_budget=verschil_budget,
        cpu_compatibel=cpu_compatibel,
        ram_compatibel=ram_compatibel,
        voeding_compatibel=voeding_compatibel,
        gpu_compatibel=gpu_compatibel,
        alles_compatibel=alles_compatibel
    )


if __name__ == "__main__":
    app.run(debug=True)