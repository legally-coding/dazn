var liveGames = [];
var loaded = 0;


document.querySelector("#view").onclick = function () {
    if (loaded) return;
    this.style.display = 'none';
    this.style.cursor = 'default';
    loaded = 1;
    loadEvents();
}


async function loadEvents() {
    let dates = formatDateToday();
    let response = await fetch(`https://epg-lite.discovery.indazn.com/ca/v5/epgWithDatesRange?country=us&languageCode=en&openBrowse=true&timeZoneOffset=-420&startDate=${dates[0]}&endDate=${dates[1]}`, { cache: "reload" });
    let games = await response.json();
    games = games.Tiles.filter((g) => {
        return g.Competition.Id === "dc4k1xh2984zbypbnunk7ncic" && g.Type === "Live" && g.IsFreemiumLite;
    });

    document.querySelector(".game-list").style.display = "block";
    if (!games.length) return document.querySelector("#view").style.display = 'block', document.querySelector("#view").innerText = 'no games on now sorry mate';

    console.log(games);

    games.forEach(g => initLiveGames(g));


}

function initLiveGames(game) {
    var el = document.createElement("div");
    el.innerText = game.Title;
    el.onclick = () => { createStreamLinks(game) };
    document.querySelector(".game-list").appendChild(el);
}

function createStreamLinks(game) {
    getStreamIds(game);
}

async function getStreamIds(game) {
    window.location.href = "https://studio.code.org/projects/applab/sCRKUqutkeYhVfg2lq23WStiQ9tnUFS0DJhlrVAFsY8?"+game.AssetId;
}

function formatDateToday() {
    let createDate = (d) => {
        let date = new Date();
        date.setDate(date.getDate() + d);
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    }
    return [createDate(-1), createDate(1)];
}
