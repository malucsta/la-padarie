import { pool } from '../../connection';

export class SubscriptionRepository {

    public async findAll() {

        const queryString = `
            SELECT      subscription.id, subscription.name, subscription.FK_idCombo as idCombo, combo.price
            FROM        subscription
            INNER JOIN  combo
            ON          subscription.FK_idCombo = combo.id
        `;

        const result = await pool.promise().query(queryString);
        return result[0];
    }



    public async findOne(id: number) {

        const queryString = `
        SELECT      subscription.id, subscription.name, subscription.FK_idCombo as idCombo, combo.price
        FROM        subscription
        INNER JOIN  combo
        ON          subscription.FK_idCombo = combo.id
        WHERE       subscription.id = ?
        `;

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }


    public async getPrice(id: number) {

        const queryString = `
            SELECT      price 
            FROM        subscription
            INNER JOIN  combo
            ON          subscription.FK_idCombo = combo.id
            WHERE       combo.id = ?
        `;

        const result = await pool.promise().query(queryString, id);
        return result[0];

    }



    public async create(name: string, price: number) {

        const queryString = 'INSERT INTO subscription (name, FK_idCombo) VALUES (?, ?)';

        const result = await pool.promise().query(queryString, [name, price]);
        return result[0];

    }



    public async update(id: number, name: string, price: number) {
        const queryString = 'UPDATE subscription SET name = IFNULL(?, name),  FK_idCombo = IFNULL(?, FK_idCombo)  WHERE id = ?';

        const result = await pool.promise().query(queryString, [name, price, id]);
        return result[0];
    }



    public async delete(id: number) {
        const queryString = 'DELETE FROM subscription WHERE id = ?';

        const result = await pool.promise().query(queryString, id);
        return result[0];
    }

} 