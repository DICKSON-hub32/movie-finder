// scheduler.js
const cron = require('node-cron');
const generateTrendingBlogs = require('./jobs/generateBlogs'); // adjust path if needed

// Schedule task to run every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('🕘 [CRON] Starting auto blog generation...');
  try {
    await generateTrendingBlogs();
    console.log('✅ [CRON] Blog generation completed!');
  } catch (error) {
    console.error('❌ [CRON] Error during blog generation:', error.message);
  }
});

