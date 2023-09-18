const db = require('./db');

class Controller {
    async createClient (req, res) {
        const {name, surname} = req.body;
        const client = await db.query('insert into client (name, surname) values ($1, $2)', [name, surname]);
        res.json(client.rows[0]);
    }
    async getClients (req, res) {
        const clients = await db.query('select * from client');
        res.json(clients.rows);
    }
    async updateClient (req, res) {
        const {id, name, surname} = req.body
        const client = await db.query('update client set name = $2, surname = $3 where id = $1', [id, name, surname]);
        res.json(client.rows[0]);
    }
    async deleteClient (req, res) {
        const id = req.params.id;
        const client = await db.query('delete from client where id = $1', [id])
        res.json(client.rows[0]);
    }

    async createZayavka (req, res) {
        const {zagolovok, opisanie, client_id} = req.body;
        const zayavka = await db.query('insert into zayavka (zagolovok, opisanie, client_id) values ($1, $2, $3)', [zagolovok, opisanie, client_id]);
        res.json(zayavka.rows[0]);
    }
    async getZayavka (req, res) {
        const zayavka = await db.query('select * from zayavka');
        res.json(zayavka.rows);
    }
    async updateZayavka (req, res) {
        const {id, zagolovok, opisanie, client_id} = req.body;
        const zayavka = await db.query('update zayavka set zagolovok = $2, opisanie = $3, client_id = $4 where id = $1', [id, zagolovok, opisanie, client_id]);
        res.json(zayavka.rows[0]);
    }
    async deleteZayavka (req, res) {
        const id = req.params.id;
        const zayavka = await db.query('delete from zayavka where id = $1', [id])
        res.json(zayavka.rows[0]);
    }

    async createUsluga (req, res) {
        const {zagolovok, opisanie, zayavka_id} = req.body;
        const usluga = await db.query('insert into usluga (zagolovok, opisanie, zayavka_id) values ($1, $2, $3) returning *', [zagolovok, opisanie, zayavka_id]);
        res.json(usluga.rows[0]);
    }
    async getUsluga (req, res) {
        const usluga = await db.query('select * from usluga returning *');
        res.json(usluga.rows);
    }
    async updateUsluga (req, res) {
        const {id, zagolovok, opisanie, zayavka_id} = req.body;
        const usluga = await db.query('update usluga set zagolovok = $2, opisanie = $3, zayavka_id = $4 where id = $1 returning *', [id, zagolovok, opisanie, zayavka_id]);
        res.json(usluga.rows[0]);
    }
    async deleteUsluga (req, res) {
        const id = req.params.id;
        const usluga = await db.query('delete from usluga where id = $1 returning *', [id])
        res.json(usluga.rows[0]);
    }
}

module.exports = new Controller();