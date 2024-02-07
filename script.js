function getRatingClass(ratingValue) {
    const numericRating = parseFloat(ratingValue);

    if (numericRating >= 6.5 && numericRating < 7) {
        return 'rating-1';
    } else if (numericRating >= 7 && numericRating < 7.5) {
        return 'rating-2';
    } else if (numericRating >= 7.5 && numericRating < 8) {
        return 'rating-3';
    } else if (numericRating >= 8 && numericRating < 8.5) {
        return 'rating-4';
    } else if (numericRating >= 8.5 && numericRating < 9) {
        return 'rating-5';
    } else if (numericRating >= 9 && numericRating < 9.5) {
        return 'rating-6';
    }
}

function createTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    const seasonData = new Map();

    data.forEach(entry => {
        const seasonNumber = entry['seasonNumber'];
        const episodeNumber = entry['episodeNumber'];
        const episodeTitle = entry['episodeTitle'];
        const ratingValue = parseFloat(entry['ratingValue']).toFixed(1);

        if (!seasonData.has(seasonNumber)) {
            seasonData.set(seasonNumber, []);
        }

        seasonData.get(seasonNumber).push({ episodeNumber, ratingValue, episodeTitle });
    });

    const episodeNumbersDiv = document.createElement('div');
    episodeNumbersDiv.className = 'season';
    episodeNumbersDiv.innerHTML = '<div class="season-label">Odcinek</div>';

    for (let i = 1; i <= 13; i++) {
        const episodeNumberDiv = document.createElement('div');
        episodeNumberDiv.className = 'episode-number';
        episodeNumberDiv.textContent = i;
        episodeNumbersDiv.appendChild(episodeNumberDiv);
    }

    tableContainer.appendChild(episodeNumbersDiv);

    seasonData.forEach((episodes, seasonNumber) => {
        const seasonDiv = document.createElement('div');
        seasonDiv.className = 'season';

        const seasonLabel = document.createElement('div');
        seasonLabel.className = 'season-label';
        seasonLabel.textContent = `Sezon ${seasonNumber}`;
        seasonDiv.appendChild(seasonLabel);

        episodes.forEach(episode => {
            const { episodeNumber, ratingValue, episodeTitle } = episode;

            const episodeDiv = document.createElement('div');
            episodeDiv.className = `episode ${getRatingClass(ratingValue)}`;

            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = episodeTitle;
            episodeDiv.appendChild(tooltip);

            const episodeContent = document.createElement('div');
            episodeContent.textContent = ratingValue;
            episodeDiv.appendChild(episodeContent);

            episodeDiv.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });

            episodeDiv.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });

            seasonDiv.appendChild(episodeDiv);
        });
        tableContainer.appendChild(seasonDiv);
    });
}

createTable(jsonData);