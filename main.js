// Global variables and data generation
let currentScene = 1;

// Parse the CSV data manually
function parseCSV(csvContent, options = {}) {
    const {
        header = true,
        dynamicTyping = true,
        skipEmptyLines = true,
        delimiter = ','
    } = options;

    if (!csvContent || csvContent.trim() === '') {
        return { data: [], errors: [], meta: {} };
    }

    const lines = csvContent.trim().split('\n');
    const result = [];
    let headers = [];

    if (header && lines.length > 0) {
        headers = lines[0].split(delimiter).map(h => h.trim().replace(/"/g, ''));
        lines.shift();
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (skipEmptyLines && line === '') continue;

        const values = line.split(delimiter).map(v => v.trim().replace(/"/g, ''));

        if (header) {
            const row = {};
            headers.forEach((header, index) => {
                let value = values[index] || '';

                // Dynamic type conversion
                if (dynamicTyping) {
                    if (value === '') {
                        value = null;
                    } else if (!isNaN(value) && !isNaN(parseFloat(value))) {
                        value = parseFloat(value);
                    } else if (value.toLowerCase() === 'true') {
                        value = true;
                    } else if (value.toLowerCase() === 'false') {
                        value = false;
                    }
                }

                row[header] = value;
            });
            result.push(row);
        } else {
            result.push(values);
        }
    }

    return {
        data: result,
        errors: [],
        meta: {
            fields: headers,
            delimiter: delimiter
        }
    };
}

function generateGlobalData() {
    if (window.useRandomData) {
        return generateEnhancedRandomData();
    }

    try {
        // Read the CSV file
        const csvContent = csvData
        // Parse the CSV content
        const parsed = parseCSV(csvContent, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            delimiter: ',',
        });

        // Select valid data between 1993 and 2018
        const validData = parsed.data.filter(
            (row) =>
                row.Year >= 1993 &&
                row.Year <= 2018 &&
                row.Country &&
                typeof row.gdp_per_capita === "number" &&
                typeof row["Renewables Share Energy"] === "number" &&
                row.gdp_per_capita > 0 &&
                row["Renewables Share Energy"] >= 0,
        );

        // Define the mapping from countries to continents
        const countryToContinent = {
            "United States": "North America",
            Canada: "North America",
            Mexico: "North America",

            China: "Asia",
            Japan: "Asia",
            India: "Asia",
            "South Korea": "Asia",
            Indonesia: "Asia",
            Bangladesh: "Asia",
            Thailand: "Asia",
            Malaysia: "Asia",
            Philippines: "Asia",
            Vietnam: "Asia",
            Singapore: "Asia",
            Azerbaijan: "Asia",

            Germany: "Europe",
            France: "Europe",
            "United Kingdom": "Europe",
            Italy: "Europe",
            Spain: "Europe",
            Austria: "Europe",
            Belgium: "Europe",
            Netherlands: "Europe",
            Switzerland: "Europe",
            Sweden: "Europe",
            Norway: "Europe",
            Denmark: "Europe",
            Finland: "Europe",
            Poland: "Europe",
            "Czech Republic": "Europe",
            Hungary: "Europe",
            Romania: "Europe",
            Bulgaria: "Europe",
            Croatia: "Europe",
            Slovenia: "Europe",
            Slovakia: "Europe",
            Lithuania: "Europe",
            Latvia: "Europe",
            Estonia: "Europe",
            Belarus: "Europe",
            Ukraine: "Europe",
            Russia: "Europe",

            Brazil: "South America",
            Argentina: "South America",
            Chile: "South America",
            Colombia: "South America",
            Peru: "South America",
            Venezuela: "South America",
            Ecuador: "South America",
            Uruguay: "South America",

            Australia: "Oceania",
            "New Zealand": "Oceania",

            "South Africa": "Africa",
            Nigeria: "Africa",
            Egypt: "Africa",
            Algeria: "Africa",
            Morocco: "Africa",
            Tunisia: "Africa",
        };

        // Define developed and developing countries
        const developedCountries = [
            "United States",
            "Canada",
            "Japan",
            "Germany",
            "France",
            "United Kingdom",
            "Italy",
            "Spain",
            "Australia",
            "Austria",
            "Belgium",
            "Netherlands",
            "Switzerland",
            "Sweden",
            "Norway",
            "Denmark",
            "Finland",
            "New Zealand",
            "South Korea",
            "Czech Republic",
            "Slovenia",
            "Slovakia",
        ];

        // Alter the data format
        const formattedData = validData.map((row) => {
            const continent = countryToContinent[row.Country] || "Other";
            const type = developedCountries.includes(row.Country)
                ? "developed"
                : "developing";

            return {
                country: row.Country,
                year: row.Year,
                gdp_per_capita: row.gdp_per_capita,
                renewable_share: row["Renewables Share Energy"],
                continent: continent,
                type: type,
                population_group: row.Population_Group || "Unknown",
                total_energy_consumption: row["Primary Energy Consumption"] || 0,
                electricity_generation: row["Electricity Generation"] || 0,
                fossil_share: row["Fossil Share Energy"] || 0,
                hydro_share: row["Hydro Share Energy"] || 0,
                solar_share: row["Solar Share Energy"] || 0,
                wind_share: row["Wind Share Energy"] || 0,
                nuclear_share: row["Nuclear Share Energy"] || 0,
            };
        });

        return formattedData;
    } catch (error) {
        console.error("Cannot load csv file:", error);
        return generateEnhancedRandomData();
    }
}

function generateEnhancedRandomData() {
    const countries = [
        {
            name: "United States",
            continent: "North America",
            type: "developed",
            baseGDP: 45000,
            baseRenewable: 12,
            volatility: 0.4, 
        },
        {
            name: "China",
            continent: "Asia",
            type: "developing",
            baseGDP: 8000,
            baseRenewable: 15,
            volatility: 0.6,
        },
        {
            name: "Germany",
            continent: "Europe",
            type: "developed",
            baseGDP: 42000,
            baseRenewable: 15,
            volatility: 0.5,
        },
        {
            name: "Japan",
            continent: "Asia",
            type: "developed",
            baseGDP: 38000,
            baseRenewable: 8,
            volatility: 0.3,
        },
        {
            name: "India",
            continent: "Asia",
            type: "developing",
            baseGDP: 1800,
            baseRenewable: 5,
            volatility: 0.8,
        },
        {
            name: "Canada",
            continent: "North America",
            type: "developed",
            baseGDP: 41000,
            baseRenewable: 65,
            volatility: 0.2,
        },
        {
            name: "Brazil",
            continent: "South America",
            type: "developing",
            baseGDP: 9000,
            baseRenewable: 45,
            volatility: 0.7,
        },
        {
            name: "Australia",
            continent: "Oceania",
            type: "developed",
            baseGDP: 48000,
            baseRenewable: 18,
            volatility: 0.4,
        },
        {
            name: "France",
            continent: "Europe",
            type: "developed",
            baseGDP: 38000,
            baseRenewable: 22,
            volatility: 0.3,
        },
        {
            name: "Austria",
            continent: "Europe",
            type: "developed",
            baseGDP: 41000,
            baseRenewable: 35,
            volatility: 0.4,
        },
        {
            name: "Bangladesh",
            continent: "Asia",
            type: "developing",
            baseGDP: 1200,
            baseRenewable: 3,
            volatility: 0.9,
        },
        {
            name: "South Africa",
            continent: "Africa",
            type: "developing",
            baseGDP: 6000,
            baseRenewable: 8,
            volatility: 0.8,
        },
        {
            name: "Indonesia",
            continent: "Asia",
            type: "developing",
            baseGDP: 3500,
            baseRenewable: 25,
            volatility: 0.6,
        },
        {
            name: "Norway",
            continent: "Europe",
            type: "developed",
            baseGDP: 65000,
            baseRenewable: 98,
            volatility: 0.1,
        },
    ];

    const data = [];


    return data;
}

const globalData = generateGlobalData();
const tooltip = d3.select(".tooltip");

function showScene(sceneNumber) {
    // Update navigation button states
    document
        .querySelectorAll(".nav-btn")
        .forEach((btn) => btn.classList.remove("active"));
    document
        .querySelectorAll(".nav-btn")
    [sceneNumber - 1].classList.add("active");

    // Hide all scenes
    document
        .querySelectorAll(".scene-container")
        .forEach((scene) => scene.classList.add("hidden"));

    // Show current scene
    document
        .getElementById(`scene${sceneNumber}`)
        .classList.remove("hidden");

    // Reset country button selection states
    document
        .querySelectorAll(".country-btn")
        .forEach((btn) => btn.classList.remove("active"));

    currentScene = sceneNumber;

    // Initialize corresponding scene
    switch (sceneNumber) {
        case 1:
            initScene1();
            break;
        case 2:
            initScene2();
            break;
        case 3:
            initScene3();
            break;
    }
}

// Scene1
function initScene1() {
    d3.select("#chart1").selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 80, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
        .select("#chart1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(globalData, (d) => d.gdp_per_capita))
        .range([0, width])
        .nice();

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(globalData, (d) => d.renewable_share))
        .range([height, 0])
        .nice();

    const colorScale = d3
        .scaleOrdinal()
        .domain([
            "Asia",
            "Europe",
            "North America",
            "South America",
            "Africa",
            "Oceania",
        ])
        .range([
            "#e74c3c",
            "#3498db",
            "#2ecc71",
            "#f39c12",
            "#9b59b6",
            "#1abc9c",
        ]);

    const radiusScale = 5;
/*  const radiusScale = d3
        .scaleSqrt()
        .domain(d3.extent(globalData, (d) => d.population))
        .range([4, 4]);*/

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat((d) => `${d / 1000}k`));

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).tickFormat((d) => `${d}%`));

    g.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .style("text-anchor", "middle")
        .text("GDP Per Capita (USD)");

    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -50)
        .style("text-anchor", "middle")
        .text("Renewable Energy Share (%)");

    const yearSlider = document.getElementById("yearSlider1");
    const yearDisplay = document.getElementById("yearDisplay1");

    function updateScene1(year) {
        const data = globalData.filter((d) => d.year === year);

        const circles = g.selectAll(".circle").data(data, (d) => d.country);

        circles
            .enter()
            .append("circle")
            .attr("class", "circle")
            .attr("r", 0)
            .merge(circles)
            .transition()
            .duration(500)
            .attr("cx", (d) => xScale(d.gdp_per_capita))
            .attr("cy", (d) => yScale(d.renewable_share))
            .attr("r", radiusScale)
            .attr("fill", (d) => colorScale(d.continent))
            .attr("opacity", 0.7);

        circles.exit().transition().duration(500).attr("r", 0).remove();
    }

    svg.on("mousemove", function (event) {
        const [mx, my] = d3.pointer(event, g.node());
        let minDist = Infinity;
        let closest = null;
        let closestData = null;

        g.selectAll(".circle").each(function (d) {
            const cx = xScale(d.gdp_per_capita);
            const cy = yScale(d.renewable_share);
            const dist = Math.hypot(mx - cx, my - cy);
            if (dist < minDist) {
                minDist = dist;
                closest = this;
                closestData = d;
            }
        });

        g.selectAll(".circle").attr("opacity", 0.7);
        if (closest) {
            d3.select(closest).attr("opacity", 1);
            tooltip
                .style("opacity", 1)
                .html(
                    `
                    <strong>${closestData.country}</strong><br>
                    Continent: ${closestData.continent}<br>
                    Population Group: ${closestData.population_group}<br>
                    GDP Per Capita(USD): ${closestData.gdp_per_capita.toLocaleString()}<br>
                    Renewables Energy Share(%): ${closestData.renewable_share.toFixed(1)}%<br>
                `,
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 10 + "px");
        }
    });

    svg.on("mouseleave", function () {
        g.selectAll(".circle").attr("opacity", 0.7);
        tooltip.style("opacity", 0);
    });

    yearSlider.addEventListener("input", function () {
        const year = parseInt(this.value);
        yearDisplay.textContent = year;
        updateScene1(year);
    });

    const legend = d3.select("#legend1");
    legend.selectAll("*").remove();

    const continents = colorScale.domain();
    continents.forEach((continent) => {
        const item = legend.append("div").attr("class", "legend-item");
        item
            .append("div")
            .attr("class", "legend-color")
            .style("background-color", colorScale(continent));
        item.append("span").text(continent);
    });

    updateScene1(2000);
}

// Scene2
function initScene2() {
    d3.select("#chart2").selectAll("*").remove();

    const margin = { top: 40, right: 150, bottom: 80, left: 80 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
        .select("#chart2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const developedCountries = [
        "United States",
        "Japan",
        "Germany",
        "Austria",
        "Canada",
    ];
    const activeCountries = new Set();

    const xScale = d3.scaleLinear().domain([1993, 2018]).range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain(
            d3.extent(
                globalData.filter((d) => developedCountries.includes(d.country)),
                (d) => d.renewable_share,
            ),
        )
        .range([height, 0])
        .nice();

    const colorScale = d3
        .scaleOrdinal()
        .domain(developedCountries)
        .range(["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]);

    const line = d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.renewable_share))
        .curve(d3.curveMonotoneX);

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    g.append("g").call(d3.axisLeft(yScale).tickFormat((d) => `${d}%`));

    g.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .style("text-anchor", "middle")
        .text("Year");

    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -50)
        .style("text-anchor", "middle")
        .text("Renewable Energy Share (%)");

    const annotations = [];
    if (window.scene2Annotations) {
        window.scene2Annotations.forEach(annotation => {
            annotations.push({
                note: {
                    label: annotation.noteLabel,
                    title: annotation.noteTitle
                },
                x: xScale(annotation.year),
                y: yScale(annotation.renewableShare),
                dy: annotation.dy,
                dx: annotation.dx,
            });
        });
    }

    const makeAnnotations = d3.annotation().annotations(annotations);
    g.append("g").attr("class", "annotation-group").call(makeAnnotations);

    function updateScene2() {
        g.selectAll(".country-line").remove();
        g.selectAll(".country-dots").remove();
        g.selectAll(".vertical-line").remove();
        g.selectAll(".vertical-line-text").remove();

        activeCountries.forEach((country) => {
            const countryData = globalData.filter((d) => d.country === country);

            g.append("path")
                .datum(countryData)
                .attr("class", "country-line")
                .attr("d", line)
                .style("stroke", colorScale(country))
                .style("fill", "none")
                .style("stroke-width", 3)
                .style("opacity", 0)
                .transition()
                .duration(500)
                .style("opacity", 1);

            g.selectAll(`.dots-${country.replace(/\s+/g, "")}`)
                .data(countryData)
                .enter()
                .append("circle")
                .attr("class", `country-dots dots-${country.replace(/\s+/g, "")}`)
                .attr("cx", (d) => xScale(d.year))
                .attr("cy", (d) => yScale(d.renewable_share))
                .attr("r", 0)
                .style("fill", colorScale(country))
                .style("stroke", "#fff")
                .style("stroke-width", 2)
                .transition()
                .duration(500)
                .attr("r", 4);
        });

        if (activeCountries.size > 0) {
            const verticalLineYears = window.scene2VerticalLineYears || [2000, 2008, 2012];
            const verticalLineTexts = window.scene2VerticalLineTexts || ["insert here", "insert here", "insert here"];

            verticalLineYears.forEach((year, index) => {
                const x = xScale(year);

                g.append("line")
                    .attr("class", "vertical-line")
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", 0)
                    .attr("y2", height)
                    .style("stroke", "#666666")
                    .style("stroke-width", 1)
                    .style("stroke-dasharray", "5,5")
                    .style("opacity", 0.7);

                const textY = 20 + index * 30; 
                const textX = x + 10;

                g.append("path")
                    .attr("class", "vertical-line-text")
                    .attr("d", `M ${x} ${textY} L ${textX} ${textY}`)
                    .style("stroke", "#666666")
                    .style("stroke-width", 1)
                    .style("fill", "none");

                g.append("text")
                    .attr("class", "vertical-line-text")
                    .attr("x", textX + 5)
                    .attr("y", textY)
                    .attr("dy", "0.35em")
                    .style("font-size", "12px")
                    .style("fill", "#666666")
                    .text(verticalLineTexts[index]);
            });
        }
    }

    svg.on("mousemove", function (event) {
        const [mx, my] = d3.pointer(event, g.node());
        let minDist = Infinity;
        let closest = null;
        let closestData = null;

        g.selectAll(".country-dots").each(function (d) {
            const cx = xScale(d.year);
            const cy = yScale(d.renewable_share);
            const dist = Math.hypot(mx - cx, my - cy);
            if (dist < minDist) {
                minDist = dist;
                closest = this;
                closestData = d;
            }
        });

        g.selectAll(".country-dots").attr("r", 4);
        if (closest) {
            d3.select(closest).attr("r", 6);
            tooltip
                .style("opacity", 1)
                .html(
                    `<strong>${closestData.country}</strong><br>Year: ${closestData.year}<br>Renewable Energy Share: ${closestData.renewable_share.toFixed(1)}%`,
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 10 + "px");
        }
    });

    svg.on("mouseleave", function () {
        g.selectAll(".country-dots").attr("r", 4);
        tooltip.style("opacity", 0);
    });

    document
        .querySelectorAll('.country-btn[data-scene="2"]')
        .forEach((btn) => {
            btn.addEventListener("click", function () {
                const country = this.dataset.country;

                if (activeCountries.has(country)) {
                    activeCountries.delete(country);
                    this.classList.remove("active");
                } else {
                    activeCountries.add(country);
                    this.classList.add("active");
                }

                updateScene2();
            });
        });

    const legend = svg
        .append("g")
        .attr(
            "transform",
            `translate(${width + margin.left + 20}, ${margin.top})`,
        );

    developedCountries.forEach((country, i) => {
        const item = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 25})`);

        item
            .append("line")
            .attr("x1", 0)
            .attr("x2", 20)
            .attr("y1", 0)
            .attr("y2", 0)
            .style("stroke", colorScale(country))
            .style("stroke-width", 3);

        item
            .append("text")
            .attr("x", 25)
            .attr("y", 0)
            .attr("dy", "0.35em")
            .style("font-size", "12px")
            .text(country);
    });

    updateScene2();
}

// Scene3
function initScene3() {
    d3.select("#chart3").selectAll("*").remove();

    const margin = { top: 40, right: 150, bottom: 80, left: 80 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
        .select("#chart3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const developingCountries = [
        "India",
        "Bangladesh",
        "South Africa",
        "Indonesia",
    ];
    const activeCountries = new Set();

    const xScale = d3.scaleLinear().domain([1993, 2018]).range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain(
            d3.extent(
                globalData.filter((d) => developingCountries.includes(d.country)),
                (d) => d.renewable_share,
            ),
        )
        .range([height, 0])
        .nice();

    const colorScale = d3
        .scaleOrdinal()
        .domain(developingCountries)
        .range(["#e74c3c", "#f39c12", "#8e44ad", "#16a085"]);

    const line = d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.renewable_share))
        .curve(d3.curveMonotoneX);

    // Coordinate system
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    g.append("g").call(d3.axisLeft(yScale).tickFormat((d) => `${d}%`));

    // Tag on coordinates
    g.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .style("text-anchor", "middle")
        .text("Year");

    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -50)
        .style("text-anchor", "middle")
        .text("Renewable Energy Share (%)");

    // Comments
    const annotations = [];
    if (window.scene3Annotations) {
        window.scene3Annotations.forEach(annotation => {
            annotations.push({
                note: {
                    label: annotation.noteLabel,
                    title: annotation.noteTitle
                },
                x: xScale(annotation.year),
                y: yScale(annotation.renewableShare),
                dy: annotation.dy,
                dx: annotation.dx,
            });
        });
    }

    const makeAnnotations = d3.annotation().annotations(annotations);
    g.append("g").attr("class", "annotation-group").call(makeAnnotations);

    function updateScene3() {
        g.selectAll(".country-line").remove();
        g.selectAll(".country-dots").remove();
        g.selectAll(".vertical-line").remove();
        g.selectAll(".vertical-line-text").remove();

        activeCountries.forEach((country) => {
            const countryData = globalData.filter((d) => d.country === country);

            g.append("path")
                .datum(countryData)
                .attr("class", "country-line")
                .attr("d", line)
                .style("stroke", colorScale(country))
                .style("fill", "none")
                .style("stroke-width", 3)
                .style("opacity", 0)
                .transition()
                .duration(500)
                .style("opacity", 1);

            g.selectAll(`.dots-${country.replace(/\s+/g, "")}`)
                .data(countryData)
                .enter()
                .append("circle")
                .attr("class", `country-dots dots-${country.replace(/\s+/g, "")}`)
                .attr("cx", (d) => xScale(d.year))
                .attr("cy", (d) => yScale(d.renewable_share))
                .attr("r", 0)
                .style("fill", colorScale(country))
                .style("stroke", "#fff")
                .style("stroke-width", 2)
                .transition()
                .duration(500)
                .attr("r", 4);
        });

        if (activeCountries.size > 0) {
            const verticalLineYears = window.scene3VerticalLineYears || [1998, 2005, 2016];
            const verticalLineTexts = window.scene3VerticalLineTexts || ["insert here", "insert here", ""];

            verticalLineYears.forEach((year, index) => {
                const x = xScale(year);

                g.append("line")
                    .attr("class", "vertical-line")
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", 0)
                    .attr("y2", height)
                    .style("stroke", "#666666")
                    .style("stroke-width", 1)
                    .style("stroke-dasharray", "5,5")
                    .style("opacity", 0.7);

                const textY = 20 + index * 30; 
                const textX = x + 10;

                g.append("path")
                    .attr("class", "vertical-line-text")
                    .attr("d", `M ${x} ${textY} L ${textX} ${textY}`)
                    .style("stroke", "#666666")
                    .style("stroke-width", 1)
                    .style("fill", "none");

                g.append("text")
                    .attr("class", "vertical-line-text")
                    .attr("x", textX + 5)
                    .attr("y", textY)
                    .attr("dy", "0.35em")
                    .style("font-size", "12px")
                    .style("fill", "#666666")
                    .text(verticalLineTexts[index]);
            });
        }
    }

    document
        .querySelectorAll('.country-btn[data-scene="3"]')
        .forEach((btn) => {
            btn.addEventListener("click", function () {
                const country = this.dataset.country;

                if (activeCountries.has(country)) {
                    activeCountries.delete(country);
                    this.classList.remove("active");
                } else {
                    activeCountries.add(country);
                    this.classList.add("active");
                }

                updateScene3();
            });
        });

    svg.on("mousemove", function (event) {
        const [mx, my] = d3.pointer(event, g.node());
        let minDist = Infinity;
        let closest = null;
        let closestData = null;

        g.selectAll(".country-dots").each(function (d) {
            const cx = xScale(d.year);
            const cy = yScale(d.renewable_share);
            const dist = Math.hypot(mx - cx, my - cy);
            if (dist < minDist) {
                minDist = dist;
                closest = this;
                closestData = d;
            }
        });

        g.selectAll(".country-dots").attr("r", 4);
        if (closest) {
            d3.select(closest).attr("r", 6);
            tooltip
                .style("opacity", 1)
                .html(
                    `<strong>${closestData.country}</strong><br>Year: ${closestData.year}<br>Renewable Energy Share: ${closestData.renewable_share.toFixed(1)}%`,
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 10 + "px");
        }
    });

    svg.on("mouseleave", function () {
        g.selectAll(".country-dots").attr("r", 4);
        tooltip.style("opacity", 0);
    });

    const legend = svg
        .append("g")
        .attr(
            "transform",
            `translate(${width + margin.left + 20}, ${margin.top})`,
        );

    developingCountries.forEach((country, i) => {
        const item = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 25})`);

        item
            .append("line")
            .attr("x1", 0)
            .attr("x2", 20)
            .attr("y1", 0)
            .attr("y2", 0)
            .style("stroke", colorScale(country))
            .style("stroke-width", 3);

        item
            .append("text")
            .attr("x", 25)
            .attr("y", 0)
            .attr("dy", "0.35em")
            .style("font-size", "12px")
            .text(country);
    });

    updateScene3();
}

initScene1()