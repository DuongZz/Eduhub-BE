import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import CryptoJS from "crypto-js"
import moment from "moment"

import config from "../../config/zalopay";

export const createPayment = async (req, res) => {
    const embed_data = {
        redirecturl: 'http://localhost:3000',
    };

    const items = [];
    const transID = Math.floor(Math.random() * 1000000);

    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: 'user123',
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        callback_url: 'https://a1c4-42-116-146-60.ngrok-free.app/v1/payment/zalopay/callback',
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: '',
        mac: ''
    };

    const data = config.app_id + '|' + order.app_trans_id + '|' + order.app_user + '|' + order.amount + '|' + order.app_time + '|' + order.embed_data + '|' + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });

        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error);
    }
}

export const handleCallback = async (req, res) => {
    try {
        console.log(req.body.data);

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}