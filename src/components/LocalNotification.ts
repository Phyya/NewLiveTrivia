import { LocalNotifications } from "@capacitor/local-notifications";

class Notifications {
  public async schedule() {
    try {
      // Request/ check permissions
      // if (!(await LocalNotifications.requestPermission()).granted) return;

      // Clear old notifications in prep for refresh (OPTIONAL)
      //   const pending = await LocalNotifications.getPending();
      //   if (pending.notifications.length > 0)
      //     await LocalNotifications.cancel(pending);

      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Live Trivia game",
            body: "Your game starts in 10 minutes",
            id: Math.floor(Math.random() * 10000),
            schedule: {
              at: new Date("September 04, 2021 20:45:00"),
              // at: new Date(Date.now()+1000),
              repeats: false, // swap this out for at or every as needed
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Notifications();
