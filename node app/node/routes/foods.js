const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');
var bcrypt = require('bcryptjs');   

// Koristimo pool da bi automatski aquire-ovao i release-ovao konekcije
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'baza'
});

// Instanciramo ruter
const route = express.Router();

// Sema za validaciju
const sema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(12).required(),
    password: Joi.string().required(),
    first_name: Joi.string().trim().max(50).required(),
    last_name: Joi.string().trim().max(100).required(),
    email: Joi.string().trim().email().max(50).required(),
    is_active: Joi.boolean(),
    orders: Joi.number()
});

// Middleware da parsira json request-ove
route.use(express.json());

// Prikaz svih usera
route.get('/users', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from user', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    });
});

route.post('/users', (req, res) => {
    // Validiramo podatke koje smo dobili od korisnika
    let { error } = Joi.validate(req.body, sema);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        let query = "insert into user (username, password, first_name, last_name, email, is_active, orders) values (?, ?, ?, ?, ?, ?, ?)";
        let formated = mysql.format(query, [req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.is_active, req.body.orders]);
        //let query = "insert into auth_user (username, password, email, first_name, last_name) values (?, ?, ?, ?, ?)";
        //let formated = mysql.format(query, [req.body.username, req.body.password, req.body.email, req.body.first_name, req.body.last_name]);

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from user where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.get('/user/:id', (req, res) => {
    let query = 'select * from user where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
});

route.put('/user/:id', (req, res) => {
    //let { error } = Joi.validate(req.body, sema);

   // if (error)
     //   res.status(400).send(error.details[0].message);
    //else {
        let query = "update user set is_active=?, orders=? where id=?";
        //let formated = mysql.format(query, [req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.is_active, req.body.orders, req.params.id]);
        let formated = mysql.format(query, [req.body.is_active, req.body.orders, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from user where id=?';
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    //}

});

route.put('/food/:id', (req, res) => {
    //let { error } = Joi.validate(req.body, sema);

   // if (error)
  //      res.status(400).send(error.details[0].message);
   // else {
        let query = "update food set ocena=? where id=?";
        //let formated = mysql.format(query, [req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.is_active, req.body.orders, req.params.id]);
        let formated = mysql.format(query, [req.body.ocena, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from food where id=?';
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    

});


route.get('/foods', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from food', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    });
});

route.post('/foods', (req, res) => {
    // Validiramo podatke koje smo dobili od korisnika
    //let { error } = Joi.validate(req.body, sema);  // Object decomposition - dohvatamo samo gresku

    // Ako su podaci neispravni prijavimo gresku
   // if (error)
     //   res.status(400).send(error.details[0].message);  // Greska zahteva
   // else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string
        let query = "insert into food (naziv, slika, komentar, cena, ocena) values (?, ?, ?, ?, ?)";
        let formated = mysql.format(query, [req.body.naziv, req.body.slika, req.body.komentar, req.body.cena, req.body.ocena]);

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from food where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    //}
});


module.exports = route;