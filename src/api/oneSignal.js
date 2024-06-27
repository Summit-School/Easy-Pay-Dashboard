import config from "../project.config"

export async function sendPushNotification(data) {
    const body = {
        app_id: config.oneSignalAppID,
        included_segments: ['Subscribed Users'],
        data: {
            foo: 'bar',
        },
        contents: {
            en: 'Sample Push Message',
        },
    };

    await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${config.oneSignalAPIKEY}`,
        },
        body: body ? JSON.stringify(body) : null
    });
}