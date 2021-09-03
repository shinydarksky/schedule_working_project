import getOneWeek from './processing/getOneWeek.js'

export const homeController = async (req, res) => {
    let schedule = await getOneWeek()
    res.status(200).json({ results: schedule })
}