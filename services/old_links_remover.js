const cron = require('node-cron');
const Link = require('../api/model');

const findAndRemoveOldLinks = async () => {
    let date = new Date();
    date.setDate(date.getDate());
    console.log(date)
    const data = await Link.find({ createdAt: { $lt: date } }).select({ _id: 1 }).exec();
    if (data.length) {
        let idsToDelete = data.map(link => link._id);
        const deleted = await Link.deleteMany({ _id: { $in: idsToDelete } }).exec();
        console.log(data);
        console.log(...deleted);
    }
}
exports.run_cron = () => {
    // cron.schedule('12 16 * * *', () => {
    // console.log('Running Cron Job');
    // findAndRemoveOldLinks();
    // })
};