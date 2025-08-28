import cohereCall from "../services/aiComponent.js";

export const postAires = async (req, res) => {
    const { body } = req
    const result = await cohereCall(JSON.stringify(body))
    res.json({ result })
};
