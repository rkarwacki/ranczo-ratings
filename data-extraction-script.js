// script for making the JSON with the data
// run on seasons page, e.g. https://www.filmweb.pl/serial/Ranczo-2006-262774/season/1
// but first, scroll down to the bottom of the page, because the episode data is fetched dynamically on filmweb

let episodesData = [];

// Selecting all elements with the specified class
let previewCards = document.querySelectorAll('.previewEpisode');

// Looping through each card
previewCards.forEach(card => {
    // Extracting data-episode-number
    let episodeNumber = card.getAttribute('data-episode-number');

    // Extracting data-season-number
    let seasonNumber = card.getAttribute('data-season-number');

    // Extracting ratingValue
    let ratingValue = card.querySelector('.communityRatings__rating--rate meta[itemprop="ratingValue"]').getAttribute('content');

    let episodeTitle = card.querySelector('.poster').getAttribute('title')

    // Creating an object with the extracted data
    let episodeData = {
        'episodeNumber': episodeNumber,
        'seasonNumber': seasonNumber,
        'ratingValue': ratingValue,
        'episodeTitle': episodeTitle
    };

    // Pushing the object to the array
    episodesData.push(episodeData);
});

// Logging the JSON array
console.log(JSON.stringify(episodesData, null, 2));