const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

//konfigurasi koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helpdesk'
});

//connect ke database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

exports.submitTicket = (req, res) => {
    const ticket = req.body;
    let data = { author: ticket.author, subject: ticket.subject, issue: ticket.issue, chatUrl: ticket.chatUrl, archive: ticket.archive, status: ticket.status };
    let sql = "INSERT INTO tickets SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.getOpenTickets = (req, res) => {
    let sql = "select * from tickets where archive = false";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        return res.json(results);
    });
};

exports.getArchivedTickets = (req, res) => {
    let sql = "select * from tickets where archive = true";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        return res.json(results);
    });
};

exports.updateTicket = (req, res) => {
    const id = req.body.id;
    const archive = req.body.archive;
    let sql = "UPDATE tickets SET archive=" + archive + " WHERE id=" + id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        return res.json(results);
    });
};

exports.deleteTicket = (req, res) => {
    const id = req.body.id;
    let sql = "DELETE FROM tickets WHERE id=" + id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        return res.json(results);
    });
};