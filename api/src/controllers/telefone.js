const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const alunoExistente = await prisma.aluno.findUnique({
        where: { ra: alunoRa }
    });

    if (!alunoExistente) {
        return res.status(404).json({ error: "Aluno não encontrado." });
    }
    
    try {
        const telefone = await prisma.telefone.create({
            data: req.body
        });
        return res.status(201).json(telefone);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const telefones = await prisma.telefone.findMany();
    return res.json(telefones);
}

const readOne = async (req, res) => {
        const telefone = await prisma.telefone.findUnique({
            select: {
                id: true,
                alunoRa: true,
                numero: true,
                tipo: true
            },
            where: {
                id: req.params.id
            }
        });
        return res.json(telefone);
};

const update = async (req, res) => {
    try {
        const telefone = await prisma.telefone.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });
        return res.status(202).json(telefone);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.telefone.delete({
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