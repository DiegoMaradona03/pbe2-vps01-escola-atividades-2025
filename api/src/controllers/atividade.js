const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: req.body
        });
        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const atividades = await prisma.atividade.findMany();
    return res.json(atividades);
}

const readOne = async (req, res) => {
        const atividade = await prisma.atividade.findUnique({
            select: {
                id: true,
                nome: true,
                alunoRa: true,
                dataInicio: true,
                dataEntrega: true,
                nota: true,
                peso: true,
                parcial: true
            },
            where: {
                id: req.params.id
            }
        });
        return res.json(atividade);
};

const update = async (req, res) => {
    const { nota, peso } = req.body;

    if (nota && peso) {
        req.body.parcial = (nota * peso) / 10;
    }

    try {
        const atividade = await prisma.atividade.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });
        return res.status(202).json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.atividade.delete({
            where: {
                id: req.params.id
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { 
    create, 
    read, 
    readOne, 
    update, 
    remove 
}