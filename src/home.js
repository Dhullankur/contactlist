import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { deleteContact } from "./store/actions";
import { useDispatch } from "react-redux";
import AddContact from "./addContact";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


const Home = (props) => {
    const contacts = useSelector(state => state.contactsReducer.contacts);
    const dispatch = useDispatch();

    const handleEdit = (index) => {
        props.history.push(`/edit-contact/${index}`);
    };

    const handleDelete = (index) => {
        dispatch(deleteContact(index));
    };

    const handleAddBtn = () => {
        props.history.push("/add-contact");
    };
    return (
        <>
            <div style={{ textAlign: "center", }}> <h1>Home Page</h1></div>
            <div
                style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                <Button
                    variant="contained"
                    type="button"
                    onClick={handleAddBtn}
                >Add Contact
                </Button>
            </div>
            {!contacts.length == 0 ? <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} ms={{ width: 150 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Box sx={{ fontWeight: 'bold' }}>Photo</Box></TableCell>
                            <TableCell align="center"><Box sx={{ fontWeight: 'bold' }}>Name</Box></TableCell>
                            <TableCell align="center"><Box sx={{ fontWeight: 'bold' }}>Phone No.</Box></TableCell>
                            <TableCell align="center"><Box sx={{ fontWeight: 'bold' }}>Phone Type</Box></TableCell>
                            <TableCell align="center"><Box sx={{ fontWeight: 'bold' }}>Using Whatsapp</Box></TableCell>
                            <TableCell align="center"><Box sx={{ fontWeight: 'bold' }}>Action</Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{contact.photo && <Avatar alt="Contact photo" src={contact.photo} />}</TableCell>
                                <TableCell align="center"> {contact.name}</TableCell>
                                <TableCell align="center"> {contact.phone} </TableCell>
                                <TableCell align="center"> {contact.phoneType} </TableCell>
                                <TableCell align="center"> {contact.isOnWhatsapp === true ? "yes" : "No"} </TableCell>

                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        type="button"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => handleEdit(index)}
                                    >Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                        color="warning"

                                    >Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : "No Contact Saved"}
        </>
    )
};

export default Home;