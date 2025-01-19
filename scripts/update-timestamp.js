const fs = require('fs');
const path = require('path');

function updateTimestamp() {
    const timestamp = Date.now();
    const timestampPath = path.join(__dirname, '../data/timestamp.json');
    
    fs.writeFileSync(timestampPath, JSON.stringify({
        lastUpdate: timestamp,
        updateTime: new Date(timestamp).toISOString()
    }, null, 2));
}

try {
    updateTimestamp();
    console.log('Timestamp updated successfully');
} catch (error) {
    console.error('Failed to update timestamp:', error);
    process.exit(1);
} 
