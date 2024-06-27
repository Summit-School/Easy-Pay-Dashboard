import OneSignal from 'react-onesignal';

export default async function initializeOneSignal() {
    await OneSignal.init({ appId: "2ee4e4c1-b091-4132-b149-bd387d74b327" });
    OneSignal.Slidedown.promptPush();
}

