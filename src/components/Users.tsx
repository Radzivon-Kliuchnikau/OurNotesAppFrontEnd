import {useEffect, useState} from "react";
import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import axios from "../api/axios.tsx";
import API_URL from "../utils/Constants.tsx";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axios.get(API_URL.USER_LIST, {
                    signal: controller.signal
                });
                console.log(response);
                isMounted && setUsers(response.data);
            } catch (error: any) {
                console.error(error);
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])

    return (
        <Box>
            <Typography component="h2">Users List</Typography>
            {users?.length
                ? (
                    <List>
                        {users.map((user: any, i) => <ListItem key={i}>
                            <ListItemText
                                primary={user}
                            />
                        </ListItem>)}
                    </List>
                ) : <Typography>No users to display</Typography>
            }
        </Box>
    );
};

export default Users;