import axios from "axios";

const oneSignalRestApiKey = process.env.REACT_APP_ONESIGNAL_APIKEY
// const oneSignalRestApiKey = "BILLING-TIME"

export const sendPushNotification = (_data) => {
    let data = {
        app_id: process.env.REACT_APP_ONESIGNAL_APPID,
        contents: {
            en: _data.body
        },
        headings: {
            en: _data.title
        },
        large_icon: "https://lh3.googleusercontent.com/9mnpqsUwcKYqK3nhF1RszuJYbGdCqv18fGKcV7HTtxpUCAsco8WHyaw1r0DgvHAScEg=w800-h800-p",
    };

    if (_data.to) {
        data.include_player_ids = [_data.to];
    } else {
        data.included_segments = ["Total Subscriptions"];
    }

    const config = {
        headers: {
            'Authorization': `Basic ${oneSignalRestApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    axios.post('https://onesignal.com/api/v1/notifications', data, config)
        .then(response => {
            console.log('Notification sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending notification:', error);
        });

}