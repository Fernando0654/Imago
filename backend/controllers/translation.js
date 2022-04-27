import { translate } from "googletrans"

export const getTranslation = (req, res) => {
    const { text } = req.body;
    async function translation() {
        try {
            const result = await translate(text);
            res.status(200).json(result.text);
        } catch (error) {
            res.status(404).json({message: "Error when translating..."});
        }
    }
    translation();
}

export const getTranslationEs = (req, res) => {
    const { text } = req.body;
    async function translation() {
        try {
            const resultToEn = await translate(text);
            const result = await translate(resultToEn.text, {
                from: "en",
                to: "es"
            });
            res.status(200).json(result.text);
        } catch (error) {
            res.status(404).json({message: "Error when translating..."});
        }
    }
    translation();
}
