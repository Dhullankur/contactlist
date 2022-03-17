import { useState } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "./store/actions";
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './style.scss'
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const Input = styled('input')({
    display: 'none',
});


const EditContact = (props) => {
    const contacts = useSelector(state => state.contactsReducer.contacts);
    const id = props.match.params.id;

    const [name, setName] = useState(contacts[id].name);
    const [phone, setPhone] = useState(contacts[id].phone);
    const [isOnWhatsapp, setIsOnWhatsapp] = useState(contacts[id].isOnWhatsapp);
    const [photo, setPhoto] = useState(contacts[id].photo);
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [phoneType, setPhoneType] = useState(contacts[id].phoneType);

    const dispatch = useDispatch();
    const phoneTypes = ["Personal", "Office"];


    const handleChange = () => {
        setIsOnWhatsapp(!isOnWhatsapp);
    };


    const handleDelete = () => {
        setPhoto(null);
    };

    const handleChangeDropdown = (e) => {
        setPhoneType(e.target.value);
    };

    const handleName = (e) => {
        let userName = e.target.value;
        setNameError("");
        if (!userName) {
            setNameError("Name is required");
        } else if (userName.length < 3) {
            setNameError("Name must be 3 character long");
        }
        setName(e.target.value);
    };

    const handlePhone = (e) => {
        let userPhone = e.target.value;
        setPhoneError("");
        if (!userPhone) {
            setPhoneError("Phone number is required");
        } else if (userPhone.length !== 10) {
            setPhoneError("Phone number must be 10 digit long");
        }
        setPhone(e.target.value);
    }

    const handleEditBtn = () => {
        if (name.length < 4) {
            setNameError("name is required");
            return;
        };
        if (phone.length !== 10) {
            setPhoneError("phone number is required");
            return;
        };
        dispatch(editContact({ name, phone, isOnWhatsapp, phoneType, photo, index: id }))
        props.history.push('/');
    }
    return (
        <>
            <Container maxWidth="sm" className='style'>

                <Paper elevation={2} className='p-20'>
                    <Typography variant='h6' className='title'>
                        Edit Contact Details
                    </Typography>
                    <Grid container spacing={2} direction={"column"} >

                        <Grid item xs={12}>

                            {photo ? <div className="userAvatar"> <Avatar alt="Contact photo" src={photo} />
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                                :
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => { setPhoto(URL.createObjectURL(e.target.files[0])) }} />
                                    <Button variant="contained" component="span" >
                                        Upload your photo
                                    </Button>


                                </label>
                            }
                        </Grid>

                        <Grid item md={2} xs={12}>
                            <TextField
                                required
                                id="outlined-basic"
                                label="update contact name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={name}
                                error={!!nameError}
                                helperText={nameError}
                                onChange={handleName}
                            />
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <TextField
                                required
                                id="outlined-basic"
                                label="update phone"
                                fullWidth
                                variant="outlined"
                                name="phone"
                                value={phone}
                                error={!!phoneError}
                                helperText={phoneError}
                                onChange={handlePhone}
                            />
                        </Grid>

                        <Grid item md={2} xs={12}>
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                label="Phone type"
                                value={phoneType}

                                onChange={handleChangeDropdown}
                            >
                                {phoneTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}


                            </TextField>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isOnWhatsapp}
                                    onChange={handleChange}
                                />
                                Available on whatsapp
                            </label>
                        </Grid>

                        <Grid item md={1} xs={12}>
                            <Button
                                variant="contained"
                                type="button"
                                size="large"
                                onClick={handleEditBtn}
                            >Update
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

        </>
    )
};

export default EditContact;