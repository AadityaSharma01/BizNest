import cohereCall, {cohereCallChat} from "../services/aiComponent.js";

export const postAires = async (req, res) => {
    const { body } = req
    const result = await cohereCall(JSON.stringify(body))
    res.json({ result })
};

export const postAiresChat = async (req, res) =>{
    const {body} = req
    //console.log(body)
    const resultChat = await cohereCallChat(JSON.stringify(body))
    res.json({ resultChat })
}