import { Plugins } from "@capacitor/core";
const  { Contacts } = Plugins;

Contacts.getContacts().then(result => {
    console.log(result);
    for (const contact of result.contacts) {
        console.log(contact);
    }
});