import { fileURLToPath } from "url";
import { getTask } from "../models/task.model.js";
import { dataEnv } from "../config/env.config.js";
import { response } from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

const task_list = async function (req, res) {
    getTask.Task.findAll()
        .then((response) => {
            res.send(response);
            console.log(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const task_create = (req, res) => {
    const JWT_SECRET_KEY = 'albertovzmr';

    getTask.Task.create(
        {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        },
        {
            fields: [
                "title",
                "description",
                "status",
            ],
        }
    )
        .then(() => {
            const taskId = 1;
            const token = jwt.sign({ taskId }, JWT_SECRET_KEY);
            res.json({ message: 'Tarea creada exitosamente\nToken creado: ', token });
            console.log("Tarea registrada con éxito");
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });



};

const task_list_details = async function (req, res) {
    console.log("Controlador de perfil de usuario ejecutado"); // Agregar este console.log

    let id = req.params.id; // Obtener el ID del parámetro de la solicitud

    getTask.Task.findOne({ where: { id: id } })
        .then((response) => {
            res.send(response);
            console.log("Entro: ", response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const task_status = (req, res) => {
    let status = req.body.status;
    let newDatas = { id, status };
    console.log(newDatas);
    getTask.Task.findOne({ where: { id: id } })

        .then((r) => {
            r.update(newDatas);
            res.send("Contraseña actualizada");
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

export const taskController = {
    task_list,
    task_list_details,
    task_create,
    task_status,
};
