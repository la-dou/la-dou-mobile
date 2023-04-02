import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://10.0.2.2:8000';

export const postJob = async (pickup: string, dropoff: string, deliveryPrice: string, cashToCollect: string, deliveryNotes: string) => {
    const token = await EncryptedStorage.getItem('token');
    const config = {
        method: "post",
        url: `${API_URL}/post-job`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        data: {
            from: pickup,
            to: dropoff,
            delivery_price: deliveryPrice,
            cash_to_collect: cashToCollect,
            delivery_notes: deliveryNotes,
        },
    };
    const response = await axios(config);
    return response.data;
}