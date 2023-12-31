require("dotenv").config();

const { predictImage } = require("../../UI/api/predictAPI");
const { getAllFruit, getById } = require("../CRUD/fruit");

async function index(request, response) {
    try {
        const txt_search = request.query.txt_search

        const queryResult = await getAllFruit(txt_search);

        queryResult.count = queryResult.count/4

        return response.status(200).json(queryResult);
    } catch (error) {
        return response.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
}

async function getFruitById(request, response) {
    try {
        const id = Number.parseInt(request.params.id);

        const queryResult = await getById(id);

        return response.status(200).json(queryResult);
    } catch (error) {
        return response.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
}

async function predictFruit(request, response) {
    
    console.log(1)

    if (!request.file) {
        return response.status(400).send("No file uploaded.");
    }
    
    const imageBuffer = request.file.buffer;

    const idPredict = await predictImage(imageBuffer)

    const queryResult = await getById(idPredict);

    return response.status(200).send({
        message: "upload Image success full",
        result : queryResult,
    })
    
}

module.exports = {
    getFruits: index,
    getFruitById: getFruitById,
    predictFruit: predictFruit,
};
