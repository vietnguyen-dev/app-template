import express from 'express'
import { Request, Response } from 'express';

import db from '../utils/pg';

const stuffRouter = express.Router()

stuffRouter.get('/', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM vw_stuff WHERE date_deleted IS NULL ORDER BY id ASC;'
        const { rows } = await db.query(query)
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, '@ get stuff route')
        res.status(500).send(`Error: cannot GET stuff`)
    }
})

interface iReqStuff {
    stuff: string
}

stuffRouter.post('/', async (req: Request<{}, {}, iReqStuff>, res: Response) => {
    console.log(req.body)
    // Validate the request body
    if (!req.body.stuff) {
        return res.status(400).send('Stuff is required');
    }

    try {
        // Insert the data into the database
        const { rows } = await db.query('INSERT INTO stuff (stuff) VALUES ($1) RETURNING *;', [req.body.stuff]);
        return res.status(200).send(rows); // Return response explicitly
    } catch (err) {
        console.log(err, '@ post stuff route');
        return res.status(500).send(`Error: cannot POST stuff`);
    }
});    

// only thing we should be updating is the amount
stuffRouter.put('/', async (req: Request, res: Response) => {
    try {
        const updatingStuff = Object.values(req.body)
        const query = `UPDATE stuff SET stuff = $1 WHERE id = $2 RETURNING *;`
        const { rows } = await db.query(query, [updatingStuff[1], updatingStuff[0]])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

stuffRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('UPDATE stuff SET date_deleted = NOW() WHERE id = $1 RETURNING *;', [req.query.id])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

export default stuffRouter