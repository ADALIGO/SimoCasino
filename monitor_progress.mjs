import fs from 'fs';

console.log('\n🔍 CASINO PROCESSING MONITOR\n' + '='.repeat(70));

// Check progress file
let progress = null;
if (fs.existsSync('casino_cleanup_progress.json')) {
  try {
    progress = JSON.parse(fs.readFileSync('casino_cleanup_progress.json', 'utf8'));
    console.log(`⏳ STILL PROCESSING:`);
    console.log(`   Entry: ${progress.lastProcessedIndex}/4000 (${((progress.lastProcessedIndex/4000)*100).toFixed(1)}%)`);
    console.log(`   Valid found: ${progress.cleaned.length}`);
    console.log(`   Invalid found: ${progress.invalid.length}`);
    console.log(`   Last updated: ${new Date(progress.timestamp).toLocaleString()}`);
    process.exit(0);
  } catch (e) {
    console.log('Progress file exists but is being written, try again...');
    process.exit(0);
  }
}

// Check final clean data
if (fs.existsSync('casinos_data_clean.json')) {
  try {
    const cleanData = JSON.parse(fs.readFileSync('casinos_data_clean.json', 'utf8'));
    console.log(`✅ PROCESSING COMPLETE:`);
    console.log(`   Total valid casinos: ${cleanData.length}`);
    console.log(`   Ready for database import!`);
    process.exit(0);
  } catch (e) {
    console.log('Clean data file exists but parsing failed');
    process.exit(0);
  }
}

console.log('⏳ Processing just started, checking again in a moment...');
