        // Function to create the HTML table
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
        } else {
            // You can adjust this default case based on your requirements
            return 'rating-default';
        }
    }

    // Function to create the HTML table
    function createTable(data) {
        const tableContainer = document.getElementById('tableContainer');

        // Create a map to store data for each season
        const seasonData = new Map();

        // Iterate through the data and organize it by season
        data.forEach(entry => {
            const seasonNumber = entry['seasonNumber'];
            const episodeNumber = entry['episodeNumber'];
            const episodeTitle = entry['episodeTitle'];
            const ratingValue = parseFloat(entry['ratingValue']).toFixed(2);

            if (!seasonData.has(seasonNumber)) {
                seasonData.set(seasonNumber, []);
            }

            seasonData.get(seasonNumber).push({ episodeNumber, ratingValue, episodeTitle });
        });

        // Create HTML elements for episode numbers
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

        // Create HTML elements for each season
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

                // Create tooltip element with episode title
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = episodeTitle;
                episodeDiv.appendChild(tooltip);

                // Create episode number content
                const episodeContent = document.createElement('div');
                episodeContent.textContent = ratingValue;
                episodeDiv.appendChild(episodeContent);

                // Add event listener to show/hide tooltip on hover
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