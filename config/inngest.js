import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Quickcart-next" });


//Inngest Function to save a user data to a database

export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-creation"
    },
    { event: "clerk.user.created" },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const user = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
            cartItems: {}
        };
        await ConnectDB();
        await User.create(userData);
    }
)

// Imngest Function to update user data in database
export const syncUserUpdate = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url
        };
        await ConnectDB();
        await User.findByIdAndUpdate(id, userData, { new: true });
    }
)

//Inngest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data;
        await ConnectDB();
        await User.findByIdAndDelete(id);
    }
);