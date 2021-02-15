import initDB from '../../../utils/db'
import auth0 from '../../../utils/auth0';
import Week from '../../../models/Week';

initDB();

export default async (req, res) => {
    const { id } = req.query;
    let userData = await Week.findOne({ _id: id })
    if (userData) {
        res.json(userData.weeks)
    } else {
        res.json([])
    }
}
