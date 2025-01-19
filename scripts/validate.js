const fs = require('fs');
const path = require('path');

function validateVenues() {
    const venuesPath = path.join(__dirname, '../data/venues.json');
    const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    
    venues.venues.forEach(venue => {
        if (!venue.id || !venue.name || !venue.district) {
            throw new Error(`Invalid venue data: ${JSON.stringify(venue)}`);
        }
    });
}

function validateSportsData() {
    const regularPath = path.join(__dirname, '../data/sports_data/regular.json');
    const specialPath = path.join(__dirname, '../data/sports_data/special.json');
    
    const regularData = JSON.parse(fs.readFileSync(regularPath, 'utf8'));
    const specialData = JSON.parse(fs.readFileSync(specialPath, 'utf8'));
    
    // 验证数据格式
    regularData.regularData.forEach(data => {
        if (!data.id || !data.title || !data.content) {
            throw new Error(`Invalid regular data: ${JSON.stringify(data)}`);
        }
    });
    
    specialData.specialData.forEach(data => {
        if (!data.id || !data.title || !data.content) {
            throw new Error(`Invalid special data: ${JSON.stringify(data)}`);
        }
    });
}

function validateNews() {
    const newsPath = path.join(__dirname, '../data/news/latest.json');
    const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    
    news.news.forEach(item => {
        if (!item.id || !item.title || !item.content) {
            throw new Error(`Invalid news data: ${JSON.stringify(item)}`);
        }
    });
}

try {
    validateVenues();
    validateSportsData();
    validateNews();
    console.log('All data validated successfully');
} catch (error) {
    console.error('Validation failed:', error);
    process.exit(1);
} 
